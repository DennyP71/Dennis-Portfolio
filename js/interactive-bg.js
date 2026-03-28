document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.querySelector('.hero__canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let mouse = { x: -1000, y: -1000 };
  let cols, rows;
  let grid = [];
  let time = 0;

  const CELL_SIZE = 16;
  const MOUSE_RADIUS = 120;

  // Character bands — ordered so neighbors are visually similar
  const CHAR_BAND = 'cXUJLQ0Zmwqpdbkhao*#MW&88%BBBBB@@@@BB%88&WM#*oahkbdpqwmZ0Q'.split('');

  function resize() {
    const parent = canvas.parentElement;
    width = canvas.width = parent.offsetWidth;
    height = canvas.height = parent.offsetHeight;
    cols = Math.ceil(width / CELL_SIZE) + 1;
    rows = Math.ceil(height / CELL_SIZE) + 1;
    buildGrid();
  }

  function buildGrid() {
    grid = [];
    for (let r = 0; r < rows; r++) {
      grid[r] = [];
      for (let c = 0; c < cols; c++) {
        grid[r][c] = {
          x: c * CELL_SIZE,
          y: r * CELL_SIZE,
        };
      }
    }
  }

  function getChar(col, row, t) {
    // Create flowing diagonal wave patterns
    const wave1 = Math.sin((col * 0.15) + (row * 0.12) + t * 0.4) * 0.5 + 0.5;
    const wave2 = Math.sin((col * 0.08) - (row * 0.2) + t * 0.25) * 0.5 + 0.5;
    const wave3 = Math.cos((col * 0.2) + (row * 0.05) + t * 0.3) * 0.5 + 0.5;
    const combined = (wave1 + wave2 + wave3) / 3;
    const index = Math.floor(combined * (CHAR_BAND.length - 1));
    return CHAR_BAND[index];
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    time += 0.012;

    ctx.font = `11px 'Courier New', monospace`;
    ctx.textBaseline = 'top';

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const cell = grid[r][c];
        const char = getChar(c, r, time);

        // Ocean wave displacement — multiple waves of different sizes
        // Large slow swell
        const wave1 = Math.sin((r * 0.03) + time * 0.8) * 35;
        // Medium wave
        const wave2 = Math.sin((r * 0.07) + (c * 0.02) + time * 1.4) * 18;
        // Small choppy wave
        const wave3 = Math.sin((r * 0.15) + (c * 0.04) + time * 2.2) * 8;
        // Tiny ripple
        const wave4 = Math.sin((r * 0.3) + (c * 0.08) - time * 3.0) * 4;

        let waveOffset = wave1 + wave2 + wave3 + wave4;

        // Mouse interaction: lift + brighten
        const dx = cell.x - mouse.x;
        const dy = cell.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let opacity = 0.3;

        if (dist < MOUSE_RADIUS) {
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
          waveOffset -= force * force * 25;
          opacity = 0.3 + force * 0.5;
        }

        ctx.fillStyle = `rgba(0, 0, 0, ${opacity})`;
        ctx.fillText(char, cell.x, cell.y + waveOffset);
      }
    }

    requestAnimationFrame(draw);
  }

  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  canvas.addEventListener('mouseleave', () => {
    mouse.x = -1000;
    mouse.y = -1000;
  });

  canvas.addEventListener('touchmove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.touches[0].clientX - rect.left;
    mouse.y = e.touches[0].clientY - rect.top;
  }, { passive: true });

  canvas.addEventListener('touchend', () => {
    mouse.x = -1000;
    mouse.y = -1000;
  });

  window.addEventListener('resize', () => {
    resize();
  });

  resize();
  draw();

  // --- Text parallax on mouse move ---
  const heroContainer = document.querySelector('.hero__container');
  if (heroContainer) {
    document.addEventListener('mousemove', (e) => {
      const cx = (e.clientX / window.innerWidth - 0.5) * 2;
      const cy = (e.clientY / window.innerHeight - 0.5) * 2;
      heroContainer.style.transform = `translate(${cx * 8}px, ${cy * 5}px)`;
    });
  }

  // --- Scroll arrow fade ---
  const arrow = document.querySelector('.hero__arrow');
  if (arrow) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const fade = Math.max(0, 1 - scrollY / 200);
      arrow.style.opacity = fade;
    }, { passive: true });
  }
});
