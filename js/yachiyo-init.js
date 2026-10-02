(function () {
  // Keep the pet and its reaction images out of the initial mobile download.
  if (window.__yachiyoLauncher) return;
  window.__yachiyoLauncher = true;
  var desktop = window.matchMedia('(min-width: 769px) and (pointer: fine)');
  function load() {
    if (!desktop.matches || window.__yachiyoPet || document.getElementById('yachiyo-script')) return;
    var script = document.createElement('script');
    script.id = 'yachiyo-script';
    script.src = '/js/yachiyo-pet.js';
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
  if (desktop.addEventListener) desktop.addEventListener('change', schedule);
  else desktop.addListener(schedule);
})();
