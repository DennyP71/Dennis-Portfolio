document.addEventListener('DOMContentLoaded', () => {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  const lightboxImg = lightbox.querySelector('.lightbox__img');
  const lightboxVideo = lightbox.querySelector('.lightbox__video');
  const closeBtn = lightbox.querySelector('.lightbox__close');

  function openImageLightbox(src, alt) {
    lightboxVideo.pause();
    lightboxVideo.style.display = 'none';
    lightboxImg.style.display = 'block';
    lightboxImg.src = src;
    lightboxImg.alt = alt;
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function openVideoLightbox(src) {
    lightboxImg.style.display = 'none';
    lightboxVideo.style.display = 'block';
    lightboxVideo.src = src;
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    lightboxVideo.play();
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
    lightboxVideo.pause();
  }

  document.querySelectorAll('.compare__frame img').forEach(img => {
    img.addEventListener('click', () => openImageLightbox(img.src, img.alt));
  });

  document.querySelectorAll('.compare__frame video').forEach(video => {
    video.addEventListener('click', () => openVideoLightbox(video.currentSrc || video.src));
  });

  closeBtn.addEventListener('click', closeLightbox);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
});
