(function () {
  function findLive2dContainer() {
    var canvas = document.querySelector('canvas');
    if (!canvas) return null;
    var el = canvas.parentElement;
    while (el && el !== document.body) {
      if (getComputedStyle(el).position === 'fixed') return el;
      el = el.parentElement;
    }
    return null;
  }

  function initDrag() {
    var container = findLive2dContainer();
    if (!container) {
      setTimeout(initDrag, 800);
      return;
    }

    var dragging = false, moved = false;
    var sx, sy, sl, st;

    container.style.cursor = 'grab';

    function onStart(x, y) {
      dragging = true;
      moved = false;
      sx = x;
      sy = y;
      var r = container.getBoundingClientRect();
      sl = r.left;
      st = r.top;
      container.style.right = 'auto';
      container.style.bottom = 'auto';
      container.style.left = sl + 'px';
      container.style.top = st + 'px';
      container.style.cursor = 'grabbing';
    }

    function onMove(x, y) {
      if (!dragging) return;
      var dx = x - sx, dy = y - sy;
      if (Math.abs(dx) > 2 || Math.abs(dy) > 2) moved = true;
      container.style.left = (sl + dx) + 'px';
      container.style.top = (st + dy) + 'px';
    }

    function onEnd() {
      if (!dragging) return;
      dragging = false;
      container.style.cursor = moved ? 'grab' : 'pointer';
    }

    container.addEventListener('mousedown', function (e) {
      if (e.target.tagName !== 'CANVAS') return;
      onStart(e.clientX, e.clientY);
      e.preventDefault();
    });

    document.addEventListener('mousemove', function (e) {
      onMove(e.clientX, e.clientY);
    });

    document.addEventListener('mouseup', onEnd);

    container.addEventListener('touchstart', function (e) {
      if (e.target.tagName !== 'CANVAS' || e.touches.length !== 1) return;
      onStart(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: false });

    document.addEventListener('touchmove', function (e) {
      if (!dragging) return;
      onMove(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: false });

    document.addEventListener('touchend', onEnd);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      setTimeout(initDrag, 1200);
    });
  } else {
    setTimeout(initDrag, 1200);
  }
})();
