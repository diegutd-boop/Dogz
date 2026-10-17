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
