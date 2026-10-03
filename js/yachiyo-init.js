(function () {
  // Defer the pet on every screen so the article can load first.
  if (window.__yachiyoLauncher) return;
  window.__yachiyoLauncher = true;
  function load() {
    if (window.__yachiyoPet || document.getElementById('yachiyo-script')) return;
    var script = document.createElement('script');
    script.id = 'yachiyo-script';
    script.src = '/js/yachiyo-pet.js?v=20261003-mobile';
    script.onerror = function () {
      script.remove();
      console.warn('Yachiyo pet could not be loaded.');
    };
    document.head.appendChild(script);
  }
  function schedule() {
    if ('requestIdleCallback' in window) window.requestIdleCallback(load, { timeout: 3000 });
    else setTimeout(load, 1000);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', schedule, { once: true });
  else schedule();
})();
