// Smooth scroll for navigation and hero buttons
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const targetId = anchor.getAttribute('href');
    const targetEl = document.querySelector(targetId);

    if (targetEl) {
      e.preventDefault();
      targetEl.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  });
});

// Highlight active nav item on scroll
const navLinks = document.querySelectorAll('.nav__link');
const sections = Array.from(document.querySelectorAll('section[id]'));

const setActiveNav = () => {
  const scrollY = window.pageYOffset;

  let currentId = sections[0]?.id;
  sections.forEach((section) => {
    const offsetTop = section.offsetTop - 120;
    if (scrollY >= offsetTop) {
      currentId = section.id;
    }
  });

  navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    link.classList.toggle('active', href === `#${currentId}`);
  });
};

window.addEventListener('scroll', setActiveNav);
setActiveNav();

// Mobile nav toggle
const navToggle = document.querySelector('.nav__toggle');
const navMenu = document.querySelector('.nav__menu');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navMenu.classList.toggle('open');
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('open');
      navMenu.classList.remove('open');
    });
  });
}

// Scroll reveal animations
const revealElements = document.querySelectorAll(
  '.reveal-up, .reveal-left, .reveal-right'
);

const observerOptions = {
  threshold: 0.15,
};

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('reveal-in-view');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

revealElements.forEach((el) => revealObserver.observe(el));

// Set footer year
const yearSpan = document.getElementById('year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Hero image slideshow (welding images)
const heroSlideshowImg = document.getElementById('hero-slideshow');

if (heroSlideshowImg) {
  const heroSlides = [
    "1.jpg",
    "2.jpg",
    "3.jpg",
    "4.jpg",
    "5.jpg"
  ];

  let heroSlideIndex = 0;

  // Ensure starting image matches the first slide (replace existing src)
  heroSlideshowImg.src = heroSlides[heroSlideIndex];

  heroSlideshowImg.addEventListener('transitionend', () => {
    if (heroSlideshowImg.classList.contains('hero-slide-fade-out')) {
      heroSlideIndex = (heroSlideIndex + 1) % heroSlides.length;
      heroSlideshowImg.src = heroSlides[heroSlideIndex];
      heroSlideshowImg.classList.remove('hero-slide-fade-out');
    }
  });

  setInterval(() => {
    heroSlideshowImg.classList.add('hero-slide-fade-out');
  }, 2800);
}
