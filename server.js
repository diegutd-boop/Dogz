// Minimal browse-through-URL web proxy. No dependencies. Node 16+.
// Run: node server.js   then open http://localhost:8080
const http = require('http');
const https = require('https');
const dns = require('dns');

const PORT = process.env.PORT || 8080;
const MAX_TEXT_BYTES = 10 * 1024 * 1024;
const TIMEOUT_MS = 15000;

// ---------- SSRF protection: refuse private/internal addresses ----------
function isPrivateIP(ip) {
  if (ip.startsWith('::ffff:')) ip = ip.slice(7);
  if (ip.includes(':')) {
    const l = ip.toLowerCase();
    return l === '::' || l === '::1' || l.startsWith('fc') || l.startsWith('fd') || l.startsWith('fe80');
  }
  const [a, b] = ip.split('.').map(Number);
  return (
    a === 0 || a === 10 || a === 127 ||
    (a === 169 && b === 254) ||
    (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && b === 168) ||
    (a === 100 && b >= 64 && b <= 127)
  );
}

// Validates the address actually connected to (defeats DNS rebinding).
function safeLookup(host, opts, cb) {
  dns.lookup(host, opts, (err, addr, fam) => {
    if (err) return cb(err);
    const list = Array.isArray(addr) ? addr : [{ address: addr, family: fam }];
    if (list.some((a) => isPrivateIP(a.address))) return cb(new Error('Blocked: private address'));
    cb(null, addr, fam);
  });
}

// ---------- URL helpers ----------
function normalize(input) {
  input = (input || '').trim();
  if (!input) return null;
  if (!/^[a-z][a-z0-9+.-]*:\/\//i.test(input)) input = 'https://' + input;
  try {
    const u = new URL(input);
    return /^https?:$/.test(u.protocol) ? u : null;
  } catch { return null; }
}

function proxify(ref, base) {
  if (!ref || /^(#|javascript:|data:|mailto:|tel:|blob:|about:)/i.test(ref.trim())) return ref;
  try {
    return '/proxy?url=' + encodeURIComponent(new URL(ref, base).href);
  } catch { return ref; }
}

function rewriteHTML(html, base) {
  html = html
    .replace(/<meta[^>]+http-equiv=["']?(content-security-policy|refresh)["']?[^>]*>/gi, '')
    .replace(/\s(integrity|crossorigin|nonce)=("[^"]*"|'[^']*')/gi, '')
    .replace(/(\s(?:href|src|action|poster|data-src)=)(["'])(.*?)\2/gi,
      (_, p, q, v) => `${p}${q}${proxify(v.replace(/&amp;/g, '&'), base).replace(/&/g, '&amp;')}${q}`)
    .replace(/(\ssrcset=)(["'])(.*?)\2/gi, (_, p, q, v) => {
      const out = v.split(',').map((part) => {
        const [u, ...rest] = part.trim().split(/\s+/);
        return [proxify(u, base), ...rest].join(' ');
      }).join(', ');
      return `${p}${q}${out}${q}`;
    });
  return html;
}

function rewriteCSS(css, base) {
  return css.replace(/url\(\s*(['"]?)(.*?)\1\s*\)/gi, (_, q, u) => `url(${q}${proxify(u, base)}${q})`);
}

// ---------- Pages ----------
const HOME = `<!doctype html><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Web Proxy</title>
<style>
  body{font-family:system-ui,sans-serif;display:grid;place-items:center;min-height:100vh;margin:0;background:#0f172a;color:#e2e8f0}
  form{width:min(92vw,560px);display:flex;gap:8px}
  input{flex:1;padding:12px 14px;border-radius:10px;border:1px solid #334155;background:#1e293b;color:inherit;font-size:16px}
  button{padding:12px 18px;border:0;border-radius:10px;background:#3b82f6;color:#fff;font-size:16px;cursor:pointer}
  h1{font-weight:600;text-align:center}
</style>
<div><h1>Web Proxy</h1>
<form action="/proxy" method="get">
  <input name="url" placeholder="example.com" autofocus autocomplete="off">
  <button>Go</button>
</form></div>`;

function fail(res, code, msg) {
  if (res.headersSent) return res.end();
  res.writeHead(code, { 'content-type': 'text/plain; charset=utf-8' });
  res.end(msg);
}

// ---------- Proxy handler ----------
function handleProxy(req, res, target) {
  const lib = target.protocol === 'https:' ? https : http;
  const headers = {
    'user-agent': req.headers['user-agent'] || 'Mozilla/5.0',
    accept: req.headers.accept || '*/*',
    'accept-language': req.headers['accept-language'] || 'en',
    'accept-encoding': 'identity', // keep bodies readable for rewriting
  };
  if (req.headers['content-type']) headers['content-type'] = req.headers['content-type'];
  if (req.headers['content-length']) headers['content-length'] = req.headers['content-length'];

  const up = lib.request(target, { method: req.method, headers, lookup: safeLookup, timeout: TIMEOUT_MS }, (r) => {
    const h = { ...r.headers };
    for (const k of ['content-security-policy', 'content-security-policy-report-only', 'x-frame-options',
      'set-cookie', 'strict-transport-security', 'content-encoding', 'transfer-encoding']) delete h[k];

    if (h.location) h.location = proxify(h.location, target.href);

    const type = (r.headers['content-type'] || '').toLowerCase();
    const isHTML = type.includes('text/html');
    const isCSS = type.includes('text/css');

    if (!isHTML && !isCSS) {
      res.writeHead(r.statusCode, h);
      return r.pipe(res);
    }

    const chunks = [];
    let size = 0;
    r.on('data', (c) => {
      size += c.length;
      if (size > MAX_TEXT_BYTES) { r.destroy(); fail(res, 502, 'Response too large'); }
      else chunks.push(c);
    });
    r.on('end', () => {
      if (res.headersSent) return;
      const text = Buffer.concat(chunks).toString('utf8');
      const body = isHTML ? rewriteHTML(text, target.href) : rewriteCSS(text, target.href);
      delete h['content-length'];
      h['content-type'] = type.includes('charset') ? type.replace(/charset=[^;]+/, 'charset=utf-8') : type + '; charset=utf-8';
      res.writeHead(r.statusCode, h);
      res.end(body);
    });
  });

  up.on('timeout', () => up.destroy(new Error('Upstream timed out')));
  up.on('error', (e) => fail(res, 502, 'Proxy error: ' + e.message));
  if (req.method === 'GET' || req.method === 'HEAD') up.end();
  else req.pipe(up);
}

http.createServer((req, res) => {
  const u = new URL(req.url, 'http://localhost');
  if (u.pathname === '/') {
    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
    return res.end(HOME);
  }
  if (u.pathname === '/proxy') {
    const target = normalize(u.searchParams.get('url'));
    if (!target) return fail(res, 400, 'Missing or invalid url');
    return handleProxy(req, res, target);
  }
  fail(res, 404, 'Not found');
}).listen(PORT, () => console.log(`Web proxy running at http://localhost:${PORT}`));
