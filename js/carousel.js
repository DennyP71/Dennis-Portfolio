document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.projects__track');
  const cards = document.querySelectorAll('.projects__card');
  const dots = document.querySelectorAll('.projects__dot');
  const prevBtn = document.querySelector('.projects__prev');
  const nextBtn = document.querySelector('.projects__next');

  if (!track || !cards.length) return;

  let currentIndex = 0;

  function scrollToCard(index) {
    if (index < 0) index = 0;
    if (index >= cards.length) index = cards.length - 1;
    currentIndex = index;
    cards[index].scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
    updateDots();
  }

  function getClosestIndex() {
    const trackCenter = track.getBoundingClientRect().left + track.getBoundingClientRect().width / 2;
    let closestIndex = 0;
    let closestDist = Infinity;

    cards.forEach((card, i) => {
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;
      const dist = Math.abs(cardCenter - trackCenter);
      if (dist < closestDist) {
        closestDist = dist;
        closestIndex = i;
      }
    });

    return closestIndex;
  }

  function updateDots() {
    dots.forEach((dot, i) => {
      dot.classList.toggle('is-active', i === currentIndex);
    });
  }

  // Scroll updates dots
  let scrollTimeout;
  track.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      currentIndex = getClosestIndex();
      updateDots();
    }, 50);
  }, { passive: true });

  // Arrow buttons
  if (prevBtn) {
    prevBtn.addEventListener('click', () => scrollToCard(currentIndex - 1));
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => scrollToCard(currentIndex + 1));
  }

  // Dot clicks
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => scrollToCard(i));
  });

  // Keyboard navigation
  track.setAttribute('tabindex', '0');
  track.setAttribute('role', 'region');
  track.setAttribute('aria-label', 'Project carousel');

  track.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      scrollToCard(currentIndex + 1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      scrollToCard(currentIndex - 1);
    }
  });

  updateDots();
});
