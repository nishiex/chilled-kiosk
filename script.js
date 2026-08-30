const container = document.querySelector('.art-track');
const cards = document.querySelectorAll('.option-card');
const toast = document.querySelector('#toast');

let timeline;

function ensureSprites() {
  if (!container) return [];
  const sprites = Array.from(container.querySelectorAll('.art-sprite'));
  if (sprites.length === 0) return [];
  if (sprites.length === 1) {
    const clone = sprites[0].cloneNode(true);
    clone.classList.add('sprite-clone');
    container.appendChild(clone);
    sprites.push(clone);
  }
  return sprites;
}

function createArtworkLoop() {
  const sprites = ensureSprites();
  if (!container || sprites.length < 1) return;

  // Wait until sprites have layout
  const spriteRect = sprites[0].getBoundingClientRect();
  if (spriteRect.width === 0 || spriteRect.height === 0) {
    // images might not be ready yet
    requestAnimationFrame(createArtworkLoop);
    return;
  }

  if (timeline) {
    timeline.kill();
  }

  gsap.set(sprites, { clearProps: 'transform' });

  const containerRect = container.getBoundingClientRect();
  const startX = containerRect.width;
  const startY = containerRect.height;
  const endX = -spriteRect.width;
  const endY = -spriteRect.height;

  // compute duration based on distance so it's consistent across sizes
  const distance = Math.hypot(startX - endX, startY - endY);
  const speed = 140; // px per second
  const duration = Math.max(5, distance / speed);

  gsap.set(sprites, {
    x: startX,
    y: startY,
    willChange: 'transform',
  });

  timeline = gsap.timeline({
    repeat: -1,
    defaults: {
      ease: 'none',
    },
  });

  timeline.to(sprites[0], { x: endX, y: endY, duration }, 0);
  timeline.to(sprites[1], { x: endX, y: endY, duration }, duration / 2);
}

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');

  window.clearTimeout(showToast.timeout);
  showToast.timeout = window.setTimeout(() => {
    toast.classList.remove('show');
  }, 1800);
}

cards.forEach((card) => {
  card.addEventListener('click', () => {
    const action = card.dataset.action;

    const messages = {
      popular: 'Popular Recipes — coming next',
      create: 'Create Your Own — coming next',
      previous: 'Previous Creations — coming next',
      concentrate: 'Bottled Concentrate — coming next',
    };

    showToast(messages[action] || 'Coming next');
  });
});

window.addEventListener('resize', createArtworkLoop);

window.addEventListener('load', () => {
  createArtworkLoop();

  gsap.from('.brand', {
    y: -20,
    opacity: 0,
    duration: 0.7,
    ease: 'power2.out',
  });

  gsap.from('.hero > *', {
    y: 28,
    opacity: 0,
    duration: 0.8,
    stagger: 0.08,
    delay: 0.15,
    ease: 'power3.out',
  });

  gsap.from('.option-card', {
    y: 30,
    opacity: 0,
    duration: 0.7,
    stagger: 0.09,
    delay: 0.35,
    ease: 'power3.out',
  });
});
