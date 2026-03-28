document.addEventListener('DOMContentLoaded', () => {
  const burger = document.querySelector('.nav__burger');
  const overlay = document.querySelector('.nav__overlay');
  const links = document.querySelectorAll('.nav__link');

  if (!burger || !overlay) return;

  function toggle() {
    burger.classList.toggle('is-open');
    overlay.classList.toggle('is-open');
    document.body.style.overflow = overlay.classList.contains('is-open') ? 'hidden' : '';
  }

  burger.addEventListener('click', toggle);

  // Click a link → close menu and scroll
  links.forEach(link => {
    link.addEventListener('click', () => {
      toggle();
    });
  });
});
