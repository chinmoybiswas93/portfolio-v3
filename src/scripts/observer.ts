const sections = document.querySelectorAll<HTMLElement>('section[id]');
const navLinks = document.querySelectorAll<HTMLAnchorElement>('[data-nav-link]');

function setActive(id: string) {
  navLinks.forEach(link => {
    link.classList.toggle('active', link.dataset.navLink === id);
  });
}

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setActive(entry.target.id);
      }
    });
  },
  { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
);

sections.forEach(section => sectionObserver.observe(section));

if (sections.length > 0) setActive(sections[0].id);

const animatedEls = document.querySelectorAll<HTMLElement>('[data-animate]');

const animObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        animObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

animatedEls.forEach(el => animObserver.observe(el));
