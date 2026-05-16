(function () {
  if (window.__live2dDragInited) return;
  window.__live2dDragInited = true;

  var container = null;
  var dragging = false, moved = false;
  var sx, sy, sl, st;

  function onMouseDown(e) {
    if (e.target.tagName !== 'CANVAS') return;
    dragging = true;
    moved = false;
    sx = e.clientX;
    sy = e.clientY;
    var r = container.getBoundingClientRect();
    sl = r.left;
    st = r.top;
    container.style.right = 'auto';
    container.style.bottom = 'auto';
    container.style.left = sl + 'px';
    container.style.top = st + 'px';
    container.style.cursor = 'grabbing';
    e.preventDefault();
  }

  function onMouseMove(e) {
    if (!dragging) return;
    var dx = e.clientX - sx, dy = e.clientY - sy;
    if (Math.abs(dx) > 2 || Math.abs(dy) > 2) moved = true;
    container.style.left = (sl + dx) + 'px';
    container.style.top = (st + dy) + 'px';
  }

  function onMouseUp() {
    if (!dragging) return;
    dragging = false;
    container.style.cursor = moved ? 'grab' : 'pointer';
  }

  function onTouchStart(e) {
    if (e.target.tagName !== 'CANVAS' || e.touches.length !== 1) return;
    dragging = true;
    moved = false;
    sx = e.touches[0].clientX;
    sy = e.touches[0].clientY;
    var r = container.getBoundingClientRect();
    sl = r.left;
    st = r.top;
    container.style.right = 'auto';
    container.style.bottom = 'auto';
    container.style.left = sl + 'px';
    container.style.top = st + 'px';
    container.style.cursor = 'grabbing';
  }

  function onTouchMove(e) {
    if (!dragging) return;
    var dx = e.touches[0].clientX - sx, dy = e.touches[0].clientY - sy;
    if (Math.abs(dx) > 2 || Math.abs(dy) > 2) moved = true;
    container.style.left = (sl + dx) + 'px';
    container.style.top = (st + dy) + 'px';
  }

  function onTouchEnd() {
    if (!dragging) return;
    dragging = false;
    container.style.cursor = moved ? 'grab' : 'pointer';
  }

  function findContainer() {
    var canvas = document.querySelector('canvas');
    if (!canvas) return null;
    var el = canvas.parentElement;
    while (el && el !== document.body) {
      if (getComputedStyle(el).position === 'fixed') return el;
      el = el.parentElement;
    }
    return null;
  }

  function tryInit() {
    var c = findContainer();
    if (!c) {
      setTimeout(tryInit, 800);
      return;
    }
    // New container (PJAX nav) - rebind
    if (c !== container) {
      if (container) {
        container.removeEventListener('mousedown', onMouseDown);
        container.removeEventListener('touchstart', onTouchStart);
      }
      container = c;
      container.style.cursor = 'grab';
      container.addEventListener('mousedown', onMouseDown);
      container.addEventListener('touchstart', onTouchStart, { passive: false });
    }
    // Re-check periodically (PJAX might change the container)
    setTimeout(tryInit, 2000);
  }

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
  document.addEventListener('touchmove', onTouchMove, { passive: false });
  document.addEventListener('touchend', onTouchEnd);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      setTimeout(tryInit, 1200);
    });
  } else {
    setTimeout(tryInit, 1200);
  }
})();
