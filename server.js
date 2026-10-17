// games.js — lightweight loader for two Unblocked-Games entries
// Place this file next to index.html and add <script src="games.js"></script> before </body>.

(function () {
  const AS_URL = '/games/Unblocked-Games/asrieldreemurfight/index.html';
  const UND_URL = '/games/Unblocked-Games/undertale/index.html';

  function $(sel) { return document.querySelector(sel); }
  function on(id, cb) { const el = document.getElementById(id); if (el) el.addEventListener('click', cb); }

  // Open a game into the iframe
  function loadInFrame(url) {
    const frame = $('#gframe');
    if (!frame) return alert('Iframe not found. Make sure the games pane is present.');
    frame.src = url;
    // ensure the games pane is visible
    if (typeof go === 'function') go('games');
  }

  // Open current iframe src in a new tab
  function openInTab() {
    const frame = $('#gframe');
    if (!frame) return alert('Iframe not found.');
    const src = frame.src || AS_URL;
    if (!src) return alert('No game loaded yet.');
    window.open(src, '_blank', 'noopener');
  }

  // Attach listeners
  on('g-as', function () { loadInFrame(AS_URL); });
  on('g-und', function () { loadInFrame(UND_URL); });
  on('g-open', openInTab);

  // If the page exposes the site's tab switching function `go`, ensure the menu button works (data-t="games").
  // If not, we still provide a small fallback that will show the pane by toggling classes.
  document.addEventListener('click', (e) => {
    // clicking any .menu button with data-t should be handled by existing site code already
    // nothing to do here — this listener is intentionally minimal
  });

  // Optional: if iframe remains blank on load, do nothing — user can click buttons to open games.
})();
<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>Dogz</title>
<style>
:root{--bg:#1a0505;--card:#2a0a0a;--tx:#fde8e8;--mut:#d19a9a;--ac:#c81e1e;--ac2:#ff6b4a;--bd:#4d1515;color-scheme:dark;box-sizing:border-box;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){--bg:#1a0505;--card:#2a0a0a;--tx:#fde8e8;--mut:#d19a9a;--bd:#4d1515}}
:root[data-theme="dark"]{--bg:#1a0505;--card:#2a0a0a;--tx:#fde8e8;--mut:#d19a9a;--bd:#4d1515}
*{box-sizing:border-box}html{scroll-padding-top:env(safe-area-inset-top,0px)}
body{margin:0;background:var(--bg);color:var(--tx);font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;max-width:520px;margin-inline:auto;padding:14px}
h1{font-size:22px;margin:4px 0 12px;background:linear-gradient(90deg,var(--ac),var(--ac2));-webkit-background-clip:text;background-clip:text;color:transparent}
.card{background:var(--card);border:1px solid var(--bd);border-radius:16px;padding:12px;margin-bottom:12px}
.row{display:flex;gap:8px;align-items:center;flex-wrap:wrap}
button,select,textarea,input[type=text],input[type=password]{font:inherit;color:var(--tx);background:var(--bg);border:1px solid var(--bd);border-radius:10px;padding:9px 12px}
button{cursor:pointer}button.p{background:var(--ac);color:#fff;border-color:var(--ac)}
input[type=range]{flex:1;min-width:80px;accent-color:var(--ac)}
.tabs{display:flex;gap:6px;margin-bottom:12px}.tabs button{flex:1}.tabs button.on{background:var(--ac);color:#fff;border-color:var(--ac)}
.pane{display:none}.pane.on{display:block}
.menu{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.menu button{padding:22px 10px;font-size:18px;font-weight:600;border-radius:18px;display:flex;flex-direction:column;align-items:center;gap:6px;background:var(--card)}
.menu button span{font-size:36px}
.bk{display:block;margin-bottom:12px}
.ql a{padding:8px 12px;border:1px solid var(--bd);border-radius:10px;color:var(--tx);text-decoration:none;background:var(--bg)}
.wel{text-align:center;padding:36px 12px}
.wel .big{font-size:110px;display:inline-block;animation:hop 3s ease-in-out infinite}
.wel h2{font-size:30px;margin:10px 0 6px}
.wel input{display:block;width:100%;max-width:280px;margin:8px auto}
.wel .go{margin-top:22px;font-size:20px;padding:14px 38px;border-radius:999px}
.pal{display:flex;gap:8px;flex-wrap:wrap}.pal button{width:46px;height:46px;padding:0;border:3px solid var(--bd);border-radius:10px}.pal button.sel{border-color:#fff}
#dv video,#dv img{width:100%;max-width:340px;max-height:240px;object-fit:cover;border-radius:16px;background:#000}
#tgd{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;max-width:340px;margin:auto;touch-action:none}
.tile{aspect-ratio:1;display:grid;place-items:center;border-radius:10px;font-weight:700;font-size:22px;color:#fff}
.scene{position:relative;height:300px;border-radius:16px;overflow:hidden;background:linear-gradient(#2a0612,#8f2a2a 55%,#f59e6b);margin-bottom:12px}
.scene>*{position:absolute}
.sun{left:50%;bottom:110px;width:90px;height:90px;margin-left:-45px;border-radius:50%;background:#ffd9a0;box-shadow:0 0 60px 20px #ffb36b88;animation:bob 8s ease-in-out infinite}
.cloud{font-size:40px;opacity:.8;animation:drift 28s linear infinite}
.c1{top:24px;left:-60px}.c2{top:70px;left:-60px;animation-duration:40s;animation-delay:-14s;font-size:28px}
.hill{border-radius:50%;bottom:-70px}
.h1{left:-20%;width:90%;height:170px;background:#4a0f14}.h2{right:-25%;width:90%;height:150px;background:#2e090d}
.dog{font-size:72px;left:46%;bottom:34px;transform-origin:bottom;animation:breathe 4s ease-in-out infinite}
.pup{font-size:34px;left:22%;bottom:42px;animation:hop 3s ease-in-out infinite}
.z{font-weight:700;color:#ffe3c4;opacity:0;left:56%;bottom:100px;animation:zz 5s ease-in infinite}
.z2{animation-delay:1.6s;font-size:20px}.z3{animation-delay:3.2s;font-size:14px}
.paw{bottom:8px;left:-30px;font-size:20px;opacity:.7;animation:walk 14s linear infinite}
.leaf{top:-20px;font-size:20px;animation:fall 11s linear infinite}
@keyframes bob{50%{transform:translateY(-10px)}}
@keyframes drift{to{transform:translateX(640px)}}
@keyframes breathe{50%{transform:scale(1.04,1.08)}}
@keyframes hop{0%,70%,100%{transform:translateY(0)}80%{transform:translateY(-14px)}90%{transform:translateY(0)}}
@keyframes zz{0%{opacity:0;transform:translate(0,0)}20%{opacity:.9}100%{opacity:0;transform:translate(28px,-70px)}}
@keyframes walk{to{transform:translateX(580px)}}
@keyframes fall{to{transform:translate(-40px,340px) rotate(300deg)}}
@media (prefers-reduced-motion:reduce){.scene *{animation:none!important}}
@media (min-width:900px){
body{max-width:1000px;padding:28px}
h1{font-size:36px;margin-bottom:18px}
.card{padding:22px}
.menu{grid-template-columns:repeat(3,1fr);gap:18px}
.menu button{padding:44px 10px;font-size:22px;transition:transform .15s,border-color .15s}
.menu button span{font-size:56px}
button:hover{border-color:var(--ac2)}
.menu button:hover{transform:translateY(-3px)}
.scene{height:460px}
.sun{width:140px;height:140px;margin-left:-70px;bottom:150px}
.cloud{font-size:60px}.c2{font-size:40px}
.dog{font-size:120px;bottom:50px}.pup{font-size:56px;bottom:60px}
.z{bottom:170px}.h1{height:240px}.h2{height:210px}
@keyframes drift{to{transform:translateX(1100px)}}
@keyframes walk{to{transform:translateX(1000px)}}
canvas{max-width:520px;margin-inline:auto}
#log{height:440px}
}
@media (min-width:900px) and (hover:hover){.pad{display:none}}
.mut{color:var(--mut);font-size:14px}
#ttt{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin:10px 0}
#ttt button{aspect-ratio:1;font-size:44px;font-weight:700;border-radius:14px}
canvas{width:100%;max-width:100%;border-radius:12px;background:var(--bg);border:1px solid var(--bd);touch-action:none;display:block}
.pad{display:grid;grid-template-columns:repeat(3,64px);gap:6px;justify-content:center;margin-top:10px}
.pad button{height:56px;font-size:22px}
#log{height:300px;overflow-y:auto;display:flex;flex-direction:column;gap:8px;margin-bottom:10px}
.m{padding:9px 12px;border-radius:14px;max-width:86%;white-space:pre-wrap;line-height:1.4}
.u{align-self:flex-end;background:var(--ac);color:#fff}.a{align-self:flex-start;background:var(--bg);border:1px solid var(--bd)}
</style></head><body>
<h1>🐶 Dogz</h1>

<div class="pane card" id="p-mus">
  <button class="bk">← Menu</button>
  <div class="row"><b>🎵 Music</b>
    <select id="trk" style="flex:1"></select>
    <button class="p" id="mp">▶ Play</button></div>
  <div class="row" style="margin-top:8px"><span class="mut">Vol</span><input type="range" id="vol" min="0" max="100" value="60"></div>
</div>

<div class="pane card on" id="p-wel">
  <div class="wel">
    <div id="dv"><div class="big">🐶</div></div>
    <h2>Welcome to Dogz</h2>
    <p class="mut">Games, an AI buddy, chill music and a proxy browser, all in one place.</p>
    <div id="auth" style="margin-top:18px">
      <input type="text" id="un" placeholder="Username" autocomplete="username" maxlength="20">
      <input type="password" id="pw" placeholder="Password" autocomplete="current-password">
      <div class="row" style="justify-content:center;margin-top:10px"><button class="p" id="li">Log in</button><button id="su">Sign up</button></div>
      <p class="mut" id="am"></p>
      <button id="gu">Continue as guest</button>
    </div>
  </div>
</div>

<div class="pane" id="p-home">
  <p class="mut" style="margin-top:0"><span id="hi">Pick something to do:</span> <button id="lo" style="padding:4px 10px;font-size:13px">Log out</button></p>
  <div class="menu">
    <button data-t="ttt"><span>❌⭕</span>Tic-Tac-Toe</button>
    <button data-t="snk"><span>🐍</span>Snake</button>
    <button data-t="bld"><span>🧱</span>Block Builder</button>
    <button data-t="obb"><span>🏃</span>Obby Runner</button>
    <button data-t="arn"><span>🌪️</span>Storm Arena</button>
    <button data-t="dsh"><span>🟨</span>Dash Cube</button>
    <button data-t="flp"><span>🐶</span>Flappy Pup</button>
    <button data-t="tzf"><span>🔢</span>Tile Merge</button>
    <button data-t="ai"><span>🤖</span>Ask AI</button>
    <button data-t="web"><span>🌐</span>Browse</button>
    <button data-t="vid"><span>🐕</span>Chill Dogs</button>
    <button data-t="spo"><span>🎧</span>Spotify</button>
    <button data-t="mus" style="grid-column:span 2"><span>🎵</span>Music</button>
  </div>
</div>

<div class="pane card" id="p-ttt"><button class="bk">← Menu</button>
  <div class="row"><b id="tst">Your turn (X)</b><span style="flex:1"></span>
    <label class="mut"><input type="checkbox" id="easy"> Easy AI</label></div>
  <div id="ttt"></div>
  <div class="row"><span class="mut" id="sc">You 0 · AI 0 · Draws 0</span><span style="flex:1"></span><button id="tr">New game</button></div>
</div>

<div class="pane card" id="p-snk"><button class="bk">← Menu</button>
  <div class="row" style="margin-bottom:8px"><b id="ss">Score: 0</b><span style="flex:1"></span><button class="p" id="sr">Start</button></div>
  <canvas id="cv" width="330" height="330"></canvas>
  <div class="pad"><span></span><button data-d="U">▲</button><span></span><button data-d="L">◀</button><button data-d="D">▼</button><button data-d="R">▶</button></div>
  <p class="mut">Swipe on the board, use the arrows, or use your keyboard.</p>
</div>

<div class="pane card" id="p-ai"><button class="bk">← Menu</button>
  <div class="row" style="margin-bottom:8px"><select id="csel" aria-label="Chats" style="flex:1;min-width:0"></select><button class="p" id="cnew">+ New</button><button id="cdel">Delete</button></div>
  <div id="log"></div>
  <div class="row"><textarea id="q" rows="1" placeholder="Type a message…" style="flex:1;min-width:0;resize:none"></textarea><button class="p" id="send">Send</button></div>
  <p class="mut" id="aino" style="display:none">The AI isn't available in this view. <a href="https://claude.ai/artifact/DghFKnu5n4598359xfbF3S" target="_blank" rel="noopener" data-direct="1" style="color:var(--ac2)">Open the AI in a new tab</a>.</p>
</div>

<div class="pane card" id="p-vid"><button class="bk">← Menu</button>
  <div class="scene">
    <div class="sun"></div><div class="cloud c1">☁️</div><div class="cloud c2">☁️</div>
    <div class="hill h1"></div><div class="hill h2"></div>
    <div class="pup">🐶</div><div class="dog">🐕</div>
    <div class="z">z</div><div class="z z2">Z</div><div class="z z3">z</div>
    <div class="paw">🐾</div><div class="paw" style="animation-delay:-5s">🐾</div><div class="paw" style="animation-delay:-10s">🐾</div>
    <div class="leaf" style="left:20%">🍂</div><div class="leaf" style="left:55%;animation-delay:-4s">🍁</div><div class="leaf" style="left:85%;animation-delay:-8s">🍂</div>
  </div>
  <div class="row"><button class="p" id="vm">🎵 Play chill music</button><span class="mut">Sit back and relax…</span></div>
</div>

<div class="pane card" id="p-bld"><button class="bk">← Menu</button>
  <div class="row" style="margin-bottom:8px"><b>🧱 Block Builder</b><span style="flex:1"></span><button id="bcl">Reset</button></div>
  <canvas id="bcv" width="336" height="280"></canvas>
  <div class="pal" id="bpal" style="margin-top:10px"></div>
  <p class="mut">Pick a block, then tap the grid to build. Tap the same block again to remove it.</p>
</div>

<div class="pane card" id="p-obb"><button class="bk">← Menu</button>
  <div class="row" style="margin-bottom:8px"><b id="os">Distance: 0</b><span style="flex:1"></span><button class="p" id="orr">Start</button></div>
  <canvas id="ocv" width="360" height="220"></canvas>
  <button class="p" id="oj" style="width:100%;margin-top:10px;padding:16px;font-size:20px">JUMP</button>
  <p class="mut">Jump over blocks and lava. Tap the board, the button, or press Space.</p>
</div>

<div class="pane card" id="p-arn"><button class="bk">← Menu</button>
  <div class="row" style="margin-bottom:8px"><b id="as">Kills: 0 · HP: 100</b><span style="flex:1"></span><button class="p" id="arr">Restart</button></div>
  <canvas id="acv" width="336" height="336"></canvas>
  <p class="mut">Drag to move. You auto-shoot nearby bots. Stay inside the shrinking storm circle!</p>
</div>

<div class="pane card" id="p-dsh"><button class="bk">← Menu</button>
  <div class="row" style="margin-bottom:8px"><b id="ds">Attempt 0 · 0%</b><span style="flex:1"></span><button class="p" id="drr">Start</button></div>
  <canvas id="dcv" width="360" height="220"></canvas>
  <button class="p" id="dj" style="width:100%;margin-top:10px;padding:16px;font-size:20px">JUMP</button>
  <p class="mut">Jump over the spikes to finish the level. Tap the board, tap the button, or press Space.</p>
</div>

<div class="pane card" id="p-flp"><button class="bk">← Menu</button>
  <div class="row" style="margin-bottom:8px"><b id="fs">Score: 0</b><span style="flex:1"></span><button class="p" id="frr">Start</button></div>
  <canvas id="fcv" width="300" height="360" style="max-width:300px;margin:auto"></canvas>
  <button class="p" id="fj" style="width:100%;margin-top:10px;padding:16px;font-size:20px">FLAP</button>
  <p class="mut">Fly the pup through the gaps. Tap the board, tap the button, or press Space.</p>
</div>

<div class="pane card" id="p-tzf"><button class="bk">← Menu</button>
  <div class="row" style="margin-bottom:8px"><b id="tsc">Score: 0</b><span style="flex:1"></span><button class="p" id="trr">New game</button></div>
  <div id="tgd"></div>
  <div class="pad"><span></span><button data-m="U">▲</button><span></span><button data-m="L">◀</button><button data-m="D">▼</button><button data-m="R">▶</button></div>
  <p class="mut">Swipe or use the arrows to merge matching numbers.</p>
</div>

<div class="pane card" id="p-spo"><button class="bk">← Menu</button>
  <b>🎧 Spotify</b>
  <iframe id="spf" title="Spotify player" width="100%" height="352" style="border:0;border-radius:12px;margin:10px 0" allow="encrypted-media; clipboard-write; fullscreen" loading="lazy"></iframe>
  <div class="row"><input type="text" id="spu" placeholder="Paste a Spotify link" style="flex:1;min-width:0"><button class="p" id="spg">Load</button></div>
  <p class="mut" id="spm"></p>
  <p class="mut">Log in to Spotify inside the player for full songs. <a id="spo" href="https://open.spotify.com" target="_blank" rel="noopener" data-direct="1" style="color:var(--ac2)">Open in Spotify</a>.</p>
</div>

<div class="pane card" id="p-web"><button class="bk">← Menu</button>
  <b>🌐 Proxy Browser</b>
  <p class="mut">Paste your proxy address once (the .onrender.com link from Render).</p>
  <div class="row"><input type="text" id="px" placeholder="https://your-app.onrender.com" style="flex:1;min-width:0"><button id="pxs">Save</button></div>
  <div class="row" style="margin-top:10px"><input type="text" id="pu" placeholder="example.com" style="flex:1;min-width:0"><button class="p" id="pg">Go</button></div>
  <p class="mut" id="pm"></p>
  <p class="mut" style="margin-bottom:6px">Quick links (open through your proxy):</p>
  <div class="row ql"><a href="https://en.wikipedia.org">Wikipedia</a><a href="https://duckduckgo.com/html">DuckDuckGo</a><a href="https://news.ycombinator.com">Hacker News</a><a href="https://arxiv.org">Arxiv</a></div>
</div>

<script>
const $=s=>document.querySelector(s);
/* ---------- tabs ---------- */
function go(t){document.querySelectorAll('.pane').forEach(p=>p.classList.toggle('on',p.id=='p-'+t));if(t!='snk')stopSnake();oStop();aStop();if(t=='bld')bDraw();if(t=='obb')oStart();if(t=='arn')aStart();}
document.querySelectorAll('[data-t]').forEach(b=>b.onclick=()=>go(b.dataset.t));
document.querySelectorAll('.bk').forEach(b=>b.onclick=()=>go('home'));

/* ---------- Tic-Tac-Toe vs AI (minimax) ---------- */
const L=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
let board,over,score={x:0,o:0,d:0};
const win=b=>{for(const[a,c,d]of L)if(b[a]&&b[a]==b[c]&&b[a]==b[d])return b[a];return b.every(Boolean)?'T':null};
function mm(b,p){const w=win(b);if(w)return w=='O'?1:w=='X'?-1:0;let best=p=='O'?-2:2;
  for(let i=0;i<9;i++)if(!b[i]){b[i]=p;const s=mm(b,p=='O'?'X':'O');b[i]=null;best=p=='O'?Math.max(best,s):b[i];best=p=='O'?Math.max(best,s):Math.min(best,s)}return best}
function aiMove(){const e=[...Array(9).keys()].filter(i=>!board[i]);
  if($('#easy').checked&&Math.random()<.5)return e[Math.random()*e.length|0];
  let bs=-2,bm;for(const i of e){board[i]='O';const s=mm(board,'X');board[i]=null;if(s>bs){bs=s;bm=i}}return bm}
function draw(){document.querySelectorAll('#ttt button').forEach((b,i)=>{b.textContent=board[i]||'';b.style.color=board[i]=='X'?'var(--ac)':'var(--ac2)'});
  $('#sc').textContent=`You ${score.x} · AI ${score.o} · Draws ${score.d}`}
function check(){const w=win(board);if(!w)return false;over=true;
  if(w=='X'){score.x++;$('#tst').textContent='You win! 🎉'}else if(w=='O'){score.o++;$('#tst').textContent='AI wins 🤖'}else{score.d++;$('#tst').textContent="It's a draw"}
  return true}
function tttReset(){board=Array(9).fill(null);over=false;$('#tst').textContent='Your turn (X)';draw()}
const g=$('#ttt');for(let i=0;i<9;i++){const b=document.createElement('button');b.onclick=()=>{
  if(over||board[i])return;board[i]='X';if(!check()){board[aiMove()]='O';check()}draw()};g.appendChild(b)}
$('#tr').onclick=tttReset;tttReset();

/* ---------- Snake ---------- */
const cv=$('#cv'),cx=cv.getContext('2d'),N=15,C=22;
let sn,dir,nd,food,sc,tm,run=false;
const col=n=>getComputedStyle(document.documentElement).getPropertyValue(n)||'#6366f1';
function place(){do{food={x:Math.random()*N|0,y:Math.random()*N|0}}while(sn.some(s=>s.x==food.x&&s.y==food.y))}
function sdraw(){cx.clearRect(0,0,330,330);cx.fillStyle='#fbbf24';cx.fillRect(food.x*C+2,food.y*C+2,C-4,C-4);
  sn.forEach((s,i)=>{cx.fillStyle=i?'#ef4444':'#fca5a5';cx.fillRect(s.x*C+1,s.y*C+1,C-2,C-2)})}
function step(){dir=nd;const h={x:sn[0].x+dir.x,y:sn[0].y+dir.y};
  if(h.x<0||h.y<0||h.x>=N||h.y>=N||sn.some(s=>s.x==h.x&&s.y==h.y)){stopSnake();$('#ss').textContent='Game over · Score: '+sc;$('#sr').textContent='Play again';return}
  sn.unshift(h);if(h.x==food.x&&h.y==food.y){sc++;$('#ss').textContent='Score: '+sc;place()}else sn.pop();sdraw()}
function stopSnake(){clearInterval(tm);run=false}
function startSnake(){stopSnake();sn=[{x:7,y:7},{x:6,y:7},{x:5,y:7}];dir=nd={x:1,y:0};sc=0;$('#ss').textContent='Score: 0';place();sdraw();run=true;tm=setInterval(step,130);$('#sr').textContent='Start'}
function turn(d){const m={U:{x:0,y:-1},D:{x:0,y:1},L:{x:-1,y:0},R:{x:1,y:0}}[d];if(m.x!=-dir.x||m.y!=-dir.y)nd=m}
$('#sr').onclick=startSnake;
document.querySelectorAll('.pad button').forEach(b=>b.onclick=()=>run&&turn(b.dataset.d));
addEventListener('keydown',e=>{const k={ArrowUp:'U',ArrowDown:'D',ArrowLeft:'L',ArrowRight:'R'}[e.key];if(k&&run){e.preventDefault();turn(k)}});
let t0;cv.addEventListener('touchstart',e=>{t0=e.touches[0]},{passive:true});
cv.addEventListener('touchend',e=>{if(!run||!t0)return;const t=e.changedTouches[0],dx=t.clientX-t0.clientX,dy=t.clientY-t0.clientY;
  if(Math.max(Math.abs(dx),Math.abs(dy))>20)turn(Math.abs(dx)>Math.abs(dy)?(dx>0?'R':'L'):(dy>0?'D':'U'))});
sn=[{x:7,y:7}];food={x:3,y:3};dir=nd={x:1,y:0};sdraw();

/* ---------- AI chat (unlimited saved chats) ---------- */
let sample=null,chats=[],cur=null,busy=false,delArm=0;
function cLoad(){try{chats=JSON.parse(localStorage.getItem('dogzChats')||'[]')}catch(e){chats=[]}}
function cSave(){try{localStorage.setItem('dogzChats',JSON.stringify(chats))}catch(e){}}
function bubble(t,c){const d=document.createElement('div');d.className='m '+c;d.textContent=t;$('#log').appendChild(d);$('#log').scrollTop=1e9;return d}
function cSel(){const s=$('#csel');s.innerHTML='';chats.forEach(c=>s.add(new Option(c.title,c.id)));s.value=cur.id}
function cRender(){cSel();$('#log').innerHTML='';if(!cur.msgs.length)bubble('Hi! Ask me anything. Start a new chat any time with + New.','a');cur.msgs.forEach(m=>bubble(m.content,m.role=='user'?'u':'a'))}
function cNew(){cur={id:Date.now(),title:'New chat',msgs:[]};chats.unshift(cur);cSave();cRender()}
async function send(){const ta=$('#q'),q=ta.value.trim();if(!q||!sample||busy)return;
  busy=true;$('#send').disabled=true;ta.value='';
  if(!cur.msgs.length){cur.title=q.slice(0,30);$('#log').innerHTML=''}
  cur.msgs.push({role:'user',content:q});bubble(q,'u');cSave();cSel();
  let ctx=cur.msgs.slice(-20);while(ctx.length&&ctx[0].role!='user')ctx.shift();
  ctx=ctx.map((m,i)=>i==0?{...m,content:'You are a friendly, helpful AI buddy inside a games website. Answer clearly and keep a natural tone.\n\n'+m.content}:m);
  const out=bubble('…','a');
  try{const r=await sample(ctx,{cache:false,onText:({text})=>{out.textContent=text;$('#log').scrollTop=1e9}});
    out.textContent=r.text;cur.msgs.push({role:'assistant',content:r.text});cSave()}
  catch(e){out.textContent=e.code=='not_granted'?'AI access was declined. Reload the page and tap allow.':e.code=='rate_limited'?'You hit a usage limit. Wait a bit and try again.':'Sorry, something went wrong.';console.error(e)}
  busy=false;$('#send').disabled=!sample}
$('#cnew').onclick=cNew;
$('#csel').onchange=e=>{cur=chats.find(c=>String(c.id)==e.target.value)||cur;cRender()};
$('#cdel').onclick=()=>{if(Date.now()-delArm>3000){delArm=Date.now();$('#cdel').textContent='Tap again';setTimeout(()=>{$('#cdel').textContent='Delete'},3000);return}
  chats=chats.filter(c=>c!==cur);if(!chats.length)cNew();else{cur=chats[0];cSave();cRender()}delArm=0;$('#cdel').textContent='Delete'};
$('#send').onclick=send;
$('#q').onkeydown=e=>{if(e.key=='Enter'&&!e.shiftKey){e.preventDefault();send()}};
cLoad();if(chats.length){cur=chats[0];cRender()}else cNew();
(async()=>{try{sample=window.claude&&claude.use?await claude.use('sample'):null}catch(e){}
  if(!sample){$('#send').disabled=true;$('#q').disabled=true;$('#aino').style.display='block'}})();

/* ---------- Music (generated live with Web Audio) ---------- */
const T=[{n:'Chill Lo-fi',bpm:76,root:57,sc:[0,3,5,7,10],w:'triangle',dr:1},
 {n:'Arcade Fun',bpm:128,root:60,sc:[0,2,4,7,9],w:'square',dr:2},
 {n:'Space Ambient',bpm:60,root:48,sc:[0,2,3,7,8],w:'sine',dr:0}];
T.forEach((t,i)=>$('#trk').add(new Option(t.n,i)));
const prog=[0,5,3,7],fr=m=>440*2**((m-69)/12);
let ac,mg,iv,st=0,nx=0,on=false;
function tone(t,f,d,ty,v){const o=ac.createOscillator(),g=ac.createGain();o.type=ty;o.frequency.setValueAtTime(f,t);
  g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v,t+.02);g.gain.exponentialRampToValueAtTime(.0001,t+d);
  o.connect(g);g.connect(mg);o.start(t);o.stop(t+d+.05);return o}
function hat(t,v){const n=ac.sampleRate*.05|0,b=ac.createBuffer(1,n,ac.sampleRate),a=b.getChannelData(0);
  for(let i=0;i<n;i++)a[i]=Math.random()*2-1;const s=ac.createBufferSource(),g=ac.createGain();
  s.buffer=b;g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.0001,t+.05);s.connect(g);g.connect(mg);s.start(t)}
function sched(){const k=T[$('#trk').value],sp=30/k.bpm;
  while(nx<ac.currentTime+.3){const s=st%16,p=prog[(st>>4)%4];
    if(s%8==0)tone(nx,fr(k.root-12+p),sp*7,k.w=='square'?'triangle':k.w,.22);
    if(s%2==0&&Math.random()<.6)tone(nx,fr(k.root+12+p+k.sc[Math.random()*5|0]),sp*(k.dr?1.5:4),k.w,k.w=='square'?.05:.09);
    if(k.dr){if(s%4==0){const o=tone(nx,120,.18,'sine',.5);o.frequency.exponentialRampToValueAtTime(40,nx+.15)}
      if(k.dr==2&&s%2==1||k.dr==1&&s%4==2)hat(nx,.08)}
    nx+=sp;st++}}
$('#mp').onclick=()=>{
  if(!ac){ac=new (window.AudioContext||window.webkitAudioContext)();mg=ac.createGain();mg.gain.value=$('#vol').value/100*.6;mg.connect(ac.destination)}
  if(on){clearInterval(iv);on=false;ac.suspend();$('#mp').textContent='▶ Play'}
  else{ac.resume();nx=ac.currentTime+.05;st=0;iv=setInterval(sched,100);on=true;$('#mp').textContent='⏸ Pause'}};
$('#vol').oninput=e=>{if(mg)mg.gain.value=e.target.value/100*.6};
$('#trk').onchange=()=>{st=0};

/* ---------- Proxy browser ---------- */
function pbase(){let b=$('#px').value.trim().replace(/\/+$/,'');if(b&&!/^https?:\/\//i.test(b))b='https://'+b;return b}
const own=/onrender\.com$/.test(location.hostname)?location.origin:'';
try{$('#px').value=localStorage.getItem('proxyBase')||own}catch(e){$('#px').value=own}
$('#pxs').onclick=()=>{const b=pbase();$('#px').value=b;try{localStorage.setItem('proxyBase',b)}catch(e){}$('#pm').textContent=b?'Saved.':'Cleared.'};
function pgo(){const b=pbase(),u=$('#pu').value.trim(),m=$('#pm');
  if(!b){m.textContent='Add your proxy address first.';return}
  if(!u){m.textContent='Type a site to visit.';return}
  const href=b+'/proxy?url='+encodeURIComponent(u);
  m.textContent='';const a=document.createElement('a');a.href=href;a.target='_blank';a.rel='noopener';a.textContent='Open '+u+' through the proxy ↗';a.style.color='var(--ac2)';m.appendChild(a);
  window.open(href,'_blank','noopener')}
$('#pg').onclick=pgo;$('#pu').onkeydown=e=>{if(e.key=='Enter')pgo()};
/* ---------- Block Builder (Minecraft-style) ---------- */
const BC=['#5aa83c','#8b5a2b','#7d7d7d','#c28a4a','#3b82f6','#f5d742'],BN=['Grass','Dirt','Stone','Wood','Water','Sand'];
let bg,bsel=0;const bcv=$('#bcv'),bx=bcv.getContext('2d');
function bDraw(){bx.fillStyle='#7ec8f5';bx.fillRect(0,0,336,280);
  for(let y=0;y<10;y++)for(let x=0;x<12;x++){const b=bg[y][x];if(b<0)continue;bx.fillStyle=BC[b];bx.fillRect(x*28,y*28,28,28);bx.strokeStyle='rgba(0,0,0,.3)';bx.strokeRect(x*28+.5,y*28+.5,27,27)}
function bReset(){bg=Array.from({length:10},(_,y)=>Array(12).fill(y==7?0:y==8?1:y==9?2:-1));bDraw()}
BC.forEach((c,i)=>{const b=document.createElement('button');b.title=BN[i];b.style.background=c;b.className=i?'':'sel';
  b.onclick=()=>{bsel=i;document.querySelectorAll('#bpal button').forEach((x,j)=>x.classList.toggle('sel',j==i))};$('#bpal').appendChild(b)});
bcv.onpointerdown=e=>{const r=bcv.getBoundingClientRect(),x=(e.clientX-r.left)/r.width*12|0,y=(e.clientY-r.top)/r.height*10|0;
  if(bg[y]&&bg[y][x]!==undefined){bg[y][x]=bg[y][x]==bsel?-1:bsel;bDraw()}};
$('#bcl').onclick=bReset;bReset();

/* ---------- Obby Runner (Roblox-style) ---------- */
const ocv=$('#ocv'),ox=ocv.getContext('2d');let ot=null,oy=150,ovy=0,oo=[],osp=3,odist=0,od=false;
function oStop(){clearInterval(ot);ot=null}
function oStart(){oStop();oy=150;ovy=0;oo=[];osp=3;odist=0;od=false;$('#orr').textContent='Restart';ot=setInterval(oStep,16)}
function oJump(){if(ot&&oy>=150)ovy=-9.5}
function oDraw(){ox.fillStyle='#8ecbff';ox.fillRect(0,0,360,220);ox.fillStyle='#4ade80';ox.fillRect(0,172,360,48);
  oo.forEach(o=>{if(o.g){ox.fillStyle='#ff4500';ox.fillRect(o.x,172,o.w,48)}else{ox.fillStyle='#f59e0b';ox.fillRect(o.x,172-o.h,o.w,o.h)}});
  ox.fillStyle='#2563eb';ox.fillRect(50,oy,22,22);ox.fillStyle='#fff';ox.fillRect(55,oy+6,4,4);ox.fillRect(63,oy+6,4,4)}
function oStep(){odist+=osp/10;osp=Math.min(7,osp+.0008);
  const last=oo[oo.length-1];
  if(!last||last.x<360-(150+Math.random()*170))oo.push(Math.random()<.5?{g:1,x:380,w:55+Math.random()*30}:{g:0,x:380,w:22+Math.random()*10,h:24+Math.random()*22});
  oo.forEach(o=>o.x-=osp);oo=oo.filter(o=>o.x+o.w>-10);
  ovy+=.5;oy+=ovy;
  const gap=oo.some(o=>o.g&&61>o.x&&61<o.x+o.w);
  if(!gap&&oy>=150){oy=150;ovy=0}
  const hit=oo.some(o=>!o.g&&50<o.x+o.w&&72>o.x&&oy+22>172-o.h);
  if(hit||oy>230){oStop();$('#os').textContent='Game over · Distance: '+(odist|0);$('#orr').textContent='Play again';oDraw();return}
  $('#os').textContent='Distance: '+(odist|0);oDraw()}
$('#oj').onclick=oJump;ocv.onpointerdown=oJump;$('#orr').onclick=oStart;
addEventListener('keydown',e=>{if(e.code=='Space'&&ot){e.preventDefault();oJump()}});

/* ---------- Storm Arena (Fortnite-style survival) ---------- */
const acv=$('#acv'),ac2=acv.getContext('2d');let at=null,ap={x:168,y:168,hp:100},ae=[],ab=[],ar=170,ak=0,aT=0,ag={x:168,y:168};
function aStop(){clearInterval(at);at=null}
function aStart(){aStop();ap={x:168,y:168,hp:100};ag={x:168,y:168};ae=[];ab=[];ar=170;ak=0;aT=0;$('#arr').textContent='Restart';at=setInterval(aStep,33)}
acv.onpointermove=acv.onpointerdown=e=>{const r=acv.getBoundingClientRect();ag={x:(e.clientX-r.left)/r.width*336,y:(e.clientY-r.top)/r.height*336}};
function aDraw(){ac2.fillStyle='#3f7d3a';ac2.fillRect(0,0,336,336);
  ac2.fillStyle='rgba(120,40,200,.55)';ac2.beginPath();ac2.rect(0,0,336,336);ac2.arc(168,168,ar,0,6.283,true);ac2.fill('evenodd');
  ac2.fillStyle='#ef4444';ae.forEach(q=>{ac2.beginPath();ac2.arc(q.x,q.y,7,0,6.283);ac2.fill()});
  ac2.fillStyle='#facc15';ab.forEach(b=>ac2.fillRect(b.x-2,b.y-2,4,4));
  ac2.fillStyle='#3b82f6';ac2.beginPath();ac2.arc(ap.x,ap.y,8,0,6.283);ac2.fill()}
function aStep(){aT++;
  const dx=ag.x-ap.x,dy=ag.y-ap.y,d=Math.hypot(dx,dy);if(d>3){ap.x+=dx/d*2.2;ap.y+=dy/d*2.2}
  ar=Math.max(45,170-aT*.03);
  if(Math.hypot(ap.x-168,ap.y-168)>ar)ap.hp-=.2;
  if(aT%Math.max(25,70-(aT/60|0))==0){const a=Math.random()*6.28;ae.push({x:168+Math.cos(a)*190,y:168+Math.sin(a)*190,hp:2})}
  ae.forEach(q=>{const ex=ap.x-q.x,ey=ap.y-q.y,ed=Math.hypot(ex,ey)||1;q.x+=ex/ed*.9;q.y+=ey/ed*.9;if(ed<14)ap.hp-=.3});
  if(aT%14==0){let n=null,nd=150;ae.forEach(q=>{const m=Math.hypot(q.x-ap.x,q.y-ap.y);if(m<nd){nd=m;n=q}});
    if(n){const m=Math.hypot(n.x-ap.x,n.y-ap.y)||1;ab.push({x:ap.x,y:ap.y,vx:(n.x-ap.x)/m*6,vy:(n.y-ap.y)/m*6,l:40})}}
  ab.forEach(b=>{b.x+=b.vx;b.y+=b.vy;b.l--;ae.forEach(q=>{if(q.hp>0&&Math.hypot(q.x-b.x,q.y-b.y)<11){q.hp--;b.l=0;if(q.hp<=0)ak++}})});
  ab=ab.filter(b=>b.l>0);ae=ae.filter(q=>q.hp>0);
  if(ap.hp<=0){aStop();$('#as').textContent='Eliminated · Kills: '+ak;$('#arr').textContent='Play again';aDraw();return}
  $('#as').textContent='Kills: '+ak+' · HP: '+Math.max(0,ap.hp|0);aDraw()}
$('#arr').onclick=aStart;

/* ---------- Dash Cube (Geometry Dash-style) ---------- */
const dcv=$('#dcv'),dcx=dcv.getContext('2d');let dT=null,dY=156,dV=0,dR=0,dH=[],dP=0,dA=0;
function dStop(){clearInterval(dT);dT=null}
function dStart(){dStop();dH=[];let x=420;while(x<4200){const n=1+(Math.random()*3|0);dH.push({x,n});x+=n*24+170+Math.random()*130}
  dY=156;dV=0;dR=0;dP=0;dA++;$('#drr').textContent='Restart';dT=setInterval(dStep,16)}
function dJump(){if(dT&&dY>=156)dV=-9.2}
function dDraw(){dcx.fillStyle='#1e1b4b';dcx.fillRect(0,0,360,220);dcx.fillStyle='#4c1d95';dcx.fillRect(0,180,360,40);
  dcx.fillStyle='#f8fafc';dH.forEach(h=>{for(let i=0;i<h.n;i++){const sx=h.x-dP+i*24;if(sx>-30&&sx<370){dcx.beginPath();dcx.moveTo(sx,180);dcx.lineTo(sx+12,152);dcx.lineTo(sx+24,180);dcx.fill()}}});
  dcx.save();dcx.translate(72,dY+12);dcx.rotate(dR);dcx.fillStyle='#facc15';dcx.fillRect(-12,-12,24,24);dcx.fillStyle='#000';dcx.fillRect(-6,-5,4,4);dcx.fillRect(2,-5,4,4);dcx.restore();
  dcx.fillStyle='#fff';dcx.fillRect(0,0,360*Math.min(1,dP/4300),4)}
function dStep(){dP+=4.6;dV+=.55;dY+=dV;
  if(dY>=156){dY=156;dV=0;dR=Math.round(dR/1.5708)*1.5708}else dR+=.12;
  const hit=dH.some(h=>{for(let i=0;i<h.n;i++){const sx=h.x-dP+i*24;if(sx+19>63&&sx+5<81&&dY>138)return true}return false});
  const pct=Math.min(100,dP/43|0);
  if(hit){dStop();$('#ds').textContent='Crashed at '+pct+'% · Attempt '+dA;$('#drr').textContent='Try again';dDraw();return}
  if(dP>=4300){dStop();$('#ds').textContent='Level complete! 🎉';$('#drr').textContent='Try again';dDraw();return}
  $('#ds').textContent='Attempt '+dA+' · '+pct+'%';dDraw()}
$('#dj').onclick=dJump;dcv.onpointerdown=dJump;$('#drr').onclick=dStart;

/* ---------- Flappy Pup (Flappy Bird-style) ---------- */
const fcv=$('#fcv'),fx=fcv.getContext('2d');let fT=null,fy=160,fv=0,fp=[],fs=0,ff=0;
function fStop(){clearInterval(fT);fT=null}
function fStart(){fStop();fy=160;fv=0;fp=[];fs=0;ff=0;$('#frr').textContent='Restart';fT=setInterval(fStep,16)}
function fFlap(){if(fT)fv=-6.2}
function fDraw(){fx.fillStyle='#7dd3fc';fx.fillRect(0,0,300,360);fx.fillStyle='#22c55e';
  fp.forEach(p=>{fx.fillRect(p.x,0,48,p.g);fx.fillRect(p.x,p.g+120,48,360-p.g-120)});
  fx.fillStyle='#a16207';fx.fillRect(0,340,300,20);fx.font='28px serif';fx.textBaseline='middle';fx.fillText('🐶',60,fy)}
function fStep(){ff++;fv+=.35;fy+=fv;if(ff%95==1)fp.push({x:300,g:50+Math.random()*170,s:0});
  fp.forEach(p=>{p.x-=2;if(!p.s&&p.x+48<60){p.s=1;fs++}});fp=fp.filter(p=>p.x>-50);
  const hit=fy>330||fy<10||fp.some(p=>p.x<86&&p.x+48>58&&(fy-12<p.g||fy+12>p.g+120));
  $('#fs').textContent='Score: '+fs;
  if(hit){fStop();$('#fs').textContent='Game over · Score: '+fs;$('#frr').textContent='Play again'}
  fDraw()}
$('#fj').onclick=fFlap;fcv.onpointerdown=fFlap;$('#frr').onclick=fStart;
addEventListener('keydown',e=>{if(e.code=='Space'&&(dT||fT)){e.preventDefault();dJump();fFlap()}});

/* ---------- Tile Merge (2048-style) ---------- */
let tg=[],tsc=0;
function tAdd(){const e=[];tg.forEach((r,y)=>r.forEach((v,x)=>{if(!v)e.push([x,y])}));if(!e.length)return;const[x,y]=e[Math.random()*e.length|0];tg[y][x]=Math.random()<.9?2:4}
function tSlide(row){const a=row.filter(Boolean);for(let i=0;i<a.length-1;i++)if(a[i]==a[i+1]){a[i]*=2;tsc+=a[i];a.splice(i+1,1)}while(a.length<4)a.push(0);return a}
function tOver(){for(let y=0;y<4;y++)for(let x=0;x<4;x++){if(!tg[y][x]||(x<3&&tg[y][x]==tg[y][x+1])||(y<3&&tg[y][x]==tg[y+1][x]))return false}return true}
function tDraw(){const g=$('#tgd');g.innerHTML='';
  tg.flat().forEach(v=>{const d=document.createElement('div');d.className='tile';d.textContent=v||'';d.style.background=v?`hsl(${(Math.log2(v)*38)%360} 70% ${v>4?45:55}%)`:'var(--bg)';g.appendChild(d)});
  $('#tsc').textContent='Score: '+tsc+(tOver()?' · Game over':'')}
function tNew(){tg=Array.from({length:4},()=>Array(4).fill(0));tsc=0;tAdd();tAdd();tDraw()}
function tMove(d){const old=JSON.stringify(tg);
  if(d=='L')tg=tg.map(r=>tSlide(r));
  if(d=='R')tg=tg.map(r=>tSlide(r.slice().reverse()).reverse());
  if(d=='U'||d=='D')for(let x=0;x<4;x++){let c=tg.map(r=>r[x]);if(d=='D')c.reverse();c=tSlide(c);if(d=='D')c.reverse();c.forEach((v,y)=>{tg[y][x]=v})}
  if(JSON.stringify(tg)!=old)tAdd();tDraw()}
$('#trr').onclick=tNew;
document.querySelectorAll('#p-tzf .pad button').forEach(b=>{b.onclick=()=>tMove(b.dataset.m)});
addEventListener('keydown',e=>{const k={ArrowUp:'U',ArrowDown:'D',ArrowLeft:'L',ArrowRight:'R'}[e.key];if(k&&$('#p-tzf').classList.contains('on')){e.preventDefault();tMove(k)}});
let tt0;$('#tgd').addEventListener('touchstart',e=>{tt0=e.touches[0]},{passive:true});
$('#tgd').addEventListener('touchend',e=>{if(!tt0)return;const t=e.changedTouches[0],ax=t.clientX-tt0.clientX,ay=t.clientY-tt0.clientY;
  if(Math.max(Math.abs(ax),Math.abs(ay))>20)tMove(Math.abs(ax)>Math.abs(ay)?(ax>0?'R':'L'):(ay>0?'D':'U'))});

/* ---------- Random dog video on the welcome/login page ---------- */
async function dogVid(){const dv=$('#dv');
  try{for(let i=0;i<4;i++){const r=await fetch('https://random.dog/woof.json?include=mp4,webm');const j=await r.json();
    if(/\.(mp4|webm)$/i.test(j.url||'')){const v=document.createElement('video');v.src=j.url;v.preload='auto';v.autoplay=v.loop=v.muted=v.playsInline=true;
      v.oncanplay=()=>{dv.replaceChildren(v);v.play().catch(()=>{})};return}}}catch(e){}
  try{const r=await fetch('https://dog.ceo/api/breeds/image/random');const j=await r.json();const im=new Image();im.alt='A dog';im.onload=()=>dv.replaceChildren(im);im.src=j.message}catch(e){}}
dogVid();

/* ---------- Spotify ---------- */
const SP_DEFAULT='https://open.spotify.com/playlist/37i9dQZF1DWWQRwui0ExPn';
function spParse(v){const m=v.match(/open\.spotify\.com\/(?:intl-[a-z-]+\/)?(playlist|album|track|artist|episode|show)\/([A-Za-z0-9]+)/);return m?{t:m[1],i:m[2]}:null}
function spSet(url){const p=spParse(url);if(!p)return false;
  $('#spf').src='https://open.spotify.com/embed/'+p.t+'/'+p.i+'?theme=0';
  $('#spo').href='https://open.spotify.com/'+p.t+'/'+p.i;return true}
function spLoad(){if(!$('#spf').getAttribute('src'))spSet(SP_DEFAULT)}
$('#spg').onclick=()=>{$('#spm').textContent=spSet($('#spu').value.trim())?'':'Paste a Spotify link (playlist, album or song).'};
$('#spu').onkeydown=e=>{if(e.key=='Enter')$('#spg').click()};

/* every outside link goes through the proxy */
document.addEventListener('click',e=>{const a=e.target.closest('a[href]');if(!a)return;let u;try{u=new URL(a.href)}catch(x){return}
  if(!/^https?:$/.test(u.protocol)||a.dataset.direct)return;const b=pbase();if(b&&a.href.startsWith(b+'/'))return;
  e.preventDefault();
  if(!b){go('web');$('#pm').textContent='Add your proxy address first, then tap the link again.';return}
  window.open(b+'/proxy?url='+encodeURIComponent(a.href),'_blank','noopener')});
/* ---------- local login (username + password, no email) ---------- */
const enc=new TextEncoder();
async function hash(u,p){const d=await crypto.subtle.digest('SHA-256',enc.encode('dogz:'+u.toLowerCase()+':'+p));return [...new Uint8Array(d)].map(x=>x.toString(16).padStart(2,'0')).join('')}
const ld=()=>{try{return JSON.parse(localStorage.getItem('dogzUsers')||'{}')}catch(e){return{}}};
function enter(n){try{sessionStorage.setItem('dogzUser',n)}catch(e){}$('#hi').textContent='Hi, '+n+'! Pick something to do:';go('home')}
async function auth(mode){const u=$('#un').value.trim(),p=$('#pw').value,m=$('#am');
  if(!/^[\w.-]{3,20}$/.test(u)){m.textContent='Username: 3-20 letters, numbers, . _ -';return}
  if(p.length<4){m.textContent='Password needs at least 4 characters.';return}
  if(!window.crypto||!crypto.subtle){m.textContent='Login is not supported in this browser.';return}
  const users=ld(),k=u.toLowerCase(),h=await hash(u,p);
  if(mode=='up'){if(users[k]){m.textContent='That username is already taken on this device.';return}
    users[k]={n:u,h};try{localStorage.setItem('dogzUsers',JSON.stringify(users))}catch(e){m.textContent="Couldn't save the account.";return}}
  else if(!users[k]||users[k].h!=h){m.textContent='Wrong username or password.';return}
  $('#pw').value='';m.textContent='';enter(users[k].n)}
$('#li').onclick=()=>auth('in');$('#su').onclick=()=>auth('up');
$('#pw').onkeydown=e=>{if(e.key=='Enter')auth('in')};
$('#gu').onclick=()=>enter('guest');
$('#lo').onclick=()=>{try{sessionStorage.removeItem('dogzUser')}catch(e){}$('#hi').textContent='Pick something to do:';go('wel')};
try{const s=sessionStorage.getItem('dogzUser');if(s)enter(s)}catch(e){}
$('#vm').onclick=()=>{if(!on)$('#trk').value=0;$('#mp').click();$('#vm').textContent=on?'⏸ Pause music':'🎵 Play chill music'};
</scri
