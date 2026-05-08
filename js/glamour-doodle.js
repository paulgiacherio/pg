const setupGlamourDoodle = () => {
  const glamour = document.querySelector('.glamour');
  const canvas = glamour?.querySelector('.glamour__doodle-canvas');
  const clearButton = glamour?.querySelector('[data-doodle-action="clear"]');

  if (!glamour || !canvas || !canvas.getContext) return;

  const context = canvas.getContext('2d');
  const accentStart = getComputedStyle(document.documentElement)
    .getPropertyValue('--accent-gradient-start')
    .trim() || '#FF1CB7';
  const accentEnd = getComputedStyle(document.documentElement)
    .getPropertyValue('--accent-gradient-end')
    .trim() || '#FE262A';

  let isDrawing = false;
  let lastPoint = null;

  const getPoint = (event) => {
    const source = event.touches?.[0] || event.changedTouches?.[0] || event;
    const rect = canvas.getBoundingClientRect();

    return {
      x: source.clientX - rect.left,
      y: source.clientY - rect.top,
    };
  };

  const clearCanvas = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    glamour.classList.remove('is-doodled');
  };

  const resizeCanvas = () => {
    const rect = canvas.getBoundingClientRect();
    const pixelRatio = window.devicePixelRatio || 1;
    const oldCanvas = document.createElement('canvas');

    oldCanvas.width = canvas.width;
    oldCanvas.height = canvas.height;
    oldCanvas.getContext('2d').drawImage(canvas, 0, 0);

    canvas.width = Math.max(1, Math.round(rect.width * pixelRatio));
    canvas.height = Math.max(1, Math.round(rect.height * pixelRatio));
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    context.lineCap = 'round';
    context.lineJoin = 'round';

    if (oldCanvas.width && oldCanvas.height) {
      context.drawImage(oldCanvas, 0, 0, rect.width, rect.height);
    }
  };

  const drawSegment = (from, to) => {
    const gradient = context.createLinearGradient(0, 0, canvas.clientWidth, canvas.clientHeight);
    gradient.addColorStop(0, accentStart);
    gradient.addColorStop(1, accentEnd);

    context.strokeStyle = gradient;
    context.lineWidth = Math.max(5, Math.min(11, canvas.clientWidth * 0.0085));
    context.beginPath();
    context.moveTo(from.x, from.y);
    context.lineTo(to.x, to.y);
    context.stroke();
  };

  const drawDot = (point) => {
    const gradient = context.createLinearGradient(0, 0, canvas.clientWidth, canvas.clientHeight);
    gradient.addColorStop(0, accentStart);
    gradient.addColorStop(1, accentEnd);

    context.fillStyle = gradient;
    context.beginPath();
    context.arc(point.x, point.y, Math.max(2.5, Math.min(5.5, canvas.clientWidth * 0.00425)), 0, Math.PI * 2);
    context.fill();
    glamour.classList.add('is-doodled');
  };

  const startDrawing = (event) => {
    if (event.target.closest('.glamour__doodle-tools, .glamour__credit-wrap')) return;
    if (event.button !== undefined && event.button !== 0) return;

    isDrawing = true;
    lastPoint = getPoint(event);
    drawDot(lastPoint);
    if (event.pointerId !== undefined && canvas.setPointerCapture) {
      canvas.setPointerCapture(event.pointerId);
    }
    event.preventDefault();
  };

  const draw = (event) => {
    if (!isDrawing || !lastPoint) return;

    const point = getPoint(event);
    drawSegment(lastPoint, point);
    lastPoint = point;
    glamour.classList.add('is-doodled');
    event.preventDefault();
  };

  const stopDrawing = (event) => {
    if (!isDrawing) return;

    isDrawing = false;
    lastPoint = null;
    if (event.pointerId !== undefined) {
      canvas.releasePointerCapture?.(event.pointerId);
    }
  };

  const handleClear = (event) => {
    event.stopPropagation();
    event.preventDefault();
    clearCanvas();
  };

  resizeCanvas();

  glamour.addEventListener('pointerdown', startDrawing);
  glamour.addEventListener('pointermove', draw);
  glamour.addEventListener('pointerup', stopDrawing);
  glamour.addEventListener('pointercancel', stopDrawing);
  glamour.addEventListener('pointerleave', stopDrawing);
  glamour.addEventListener('mousedown', startDrawing);
  glamour.addEventListener('mousemove', draw);
  glamour.addEventListener('mouseup', stopDrawing);
  glamour.addEventListener('mouseleave', stopDrawing);
  glamour.addEventListener('touchstart', startDrawing, { passive: false });
  glamour.addEventListener('touchmove', draw, { passive: false });
  glamour.addEventListener('touchend', stopDrawing);
  glamour.addEventListener('touchcancel', stopDrawing);
  clearButton?.addEventListener('pointerdown', handleClear);
  clearButton?.addEventListener('mousedown', handleClear);
  clearButton?.addEventListener('touchstart', handleClear, { passive: false });
  clearButton?.addEventListener('click', handleClear);
  window.addEventListener('resize', resizeCanvas);
};

setupGlamourDoodle();
