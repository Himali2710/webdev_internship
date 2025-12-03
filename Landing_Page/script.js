window.addEventListener('scroll', () => {
  document.querySelectorAll('.card, .about, .hero-text').forEach(el => {
    const position = el.getBoundingClientRect().top;
    const screen = window.innerHeight / 1.2;
    if (position < screen) {
      el.style.opacity = 1;
      el.style.transform = 'translateY(0)';
    }
  });
});
