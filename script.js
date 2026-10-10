// Replace this with the Sketchfab embed URL when the optimized model is ready.
const MODEL_EMBED_URL = "";

const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');

function updateHeader() {
  header.classList.toggle('scrolled', window.scrollY > 30);
}
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  header.classList.toggle('menu-visible', open);
  document.body.classList.toggle('menu-open', open);
});
nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
    header.classList.remove('menu-visible');
    document.body.classList.remove('menu-open');
  });
});

const lightbox = document.querySelector('#lightbox');
const lightboxImage = lightbox.querySelector('img');
const lightboxCaption = lightbox.querySelector('p');
document.querySelectorAll('[data-lightbox]').forEach((link) => {
  link.addEventListener('click', (event) => {
    if (!lightbox.showModal) return;
    event.preventDefault();
    lightboxImage.src = link.href;
    lightboxImage.alt = link.querySelector('img')?.alt || 'Enlarged project image';
    lightboxCaption.textContent = link.dataset.caption || '';
    lightbox.showModal();
  });
});
lightbox.querySelector('.lightbox-close').addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) lightbox.close();
});
lightbox.addEventListener('close', () => { lightboxImage.src = ''; });

if (MODEL_EMBED_URL) {
  const stage = document.querySelector('#model-stage');
  const iframe = document.createElement('iframe');
  iframe.src = MODEL_EMBED_URL;
  iframe.title = 'Interactive 3D model of the HEB to MVR proposal';
  iframe.loading = 'lazy';
  iframe.allow = 'autoplay; fullscreen; xr-spatial-tracking';
  iframe.allowFullscreen = true;
  stage.replaceChildren(iframe);
}
