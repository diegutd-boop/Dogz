// Games pane helper (open iframe from the submodule)
(function(){
  const sel = document.getElementById('gameList');
  const pathInput = document.getElementById('gamePath');
  const openBtn = document.getElementById('openGame');
  const frame = document.getElementById('gameFrame');

  function openSelected() {
    const v = sel && sel.value || '';
    const p = pathInput && pathInput.value.trim();
    const src = v || (p ? p : '');
    if (!src) return alert('Select a game or paste a path under /games/Unblocked-Games/');
    // Basic safety: only allow files under /games/
    if (!src.startsWith('/games/')) return alert('Only paths under /games/ are allowed.');
    frame.src = src;
    // Switch to the games pane (uses existing go() system)
    if (typeof go === 'function') go('games');
  }

  if (openBtn) openBtn.addEventListener('click', openSelected);
  if (sel) sel.addEventListener('change', () => {
    // autofill path input when selecting
    if (sel.value) pathInput.value = sel.value;
  });
})();
