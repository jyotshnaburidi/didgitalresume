// Typing Animation for Hero
const typedText = "Hi, I'm Jyotshna Buridi";
const typedTextElem = document.getElementById('typed-text');
const cursorElem = document.querySelector('.cursor');
let idx = 0;
function type() {
  if (typedTextElem && idx < typedText.length) {
    typedTextElem.textContent += typedText[idx];
    idx++;
    setTimeout(type, 80);
  }
}
type();

// Smooth Scroll for Nav Links
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href').slice(1);
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      e.preventDefault();
      window.scrollTo({
        top: targetSection.offsetTop - 55,
        behavior: 'smooth'
      });
    }
  });
});

// Sticky Navbar Active Link Highlight
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
  let scrollPos = window.scrollY + 70;
  sections.forEach(section => {
    if (
      scrollPos >= section.offsetTop &&
      scrollPos < section.offsetTop + section.offsetHeight
    ) {
      navLinks.forEach(link => link.classList.remove('active'));
      const activeLink = document.querySelector(`.nav-link[href="#${section.id}"]`);
      if (activeLink) activeLink.classList.add('active');
    }
  });
});

// Fade-in Animation on Scroll
const fadeEls = document.querySelectorAll('.section');
function fadeInOnScroll() {
  fadeEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      el.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', fadeInOnScroll);
window.addEventListener('load', fadeInOnScroll);

// Contact Form Validation
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = this.name.value.trim();
    const email = this.email.value.trim();
    const message = this.message.value.trim();
    if (!name || !email || !message) {
      alert('Please fill in all fields.');
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }
    alert('Thank you for your message!');
    this.reset();
  });
}

// Highlight internships when hovering skills and vice versa
const skillBoxes = document.querySelectorAll('.skill-box[data-internship]');
const internshipItems = document.querySelectorAll('.internships-list li[data-internship]');

skillBoxes.forEach(skill => {
  skill.addEventListener('mouseenter', () => {
    const key = skill.getAttribute('data-internship');
    internshipItems.forEach(item => {
      if (item.getAttribute('data-internship') === key) {
        item.classList.add('highlight');
        skill.classList.add('highlight');
      }
    });
  });
  skill.addEventListener('mouseleave', () => {
    internshipItems.forEach(item => item.classList.remove('highlight'));
    skill.classList.remove('highlight');
  });
});

internshipItems.forEach(item => {
  item.addEventListener('mouseenter', () => {
    const key = item.getAttribute('data-internship');
    skillBoxes.forEach(skill => {
      if (skill.getAttribute('data-internship') === key) {
        skill.classList.add('highlight');
        item.classList.add('highlight');
      }
    });
  });
  item.addEventListener('mouseleave', () => {
    skillBoxes.forEach(skill => skill.classList.remove('highlight'));
    item.classList.remove('highlight');
  });
});
function openCertificate(file) {
  const modal = document.getElementById("certificateModal");
  const iframe = document.getElementById("certificateFrame");
  const img = document.getElementById("certificateImage");
  const downloadBtn = document.getElementById("downloadCert");

  downloadBtn.href = file;

  if (file.endsWith(".pdf")) {
    iframe.src = file;
    iframe.style.display = "block";
    img.style.display = "none";
  } else {
    img.src = file;
    img.style.display = "block";
    iframe.style.display = "none";
  }

  modal.style.display = "flex";
}

function closeCertificate() {
  document.getElementById("certificateModal").style.display = "none";
  document.getElementById("certificateFrame").src = "";
  document.getElementById("certificateImage").src = "";
}


// Custom animated cursor (smooth movement)
const cursor = document.getElementById('custom-cursor');
let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});
function animateCursor() {
  cursorX += (mouseX - cursorX) * 0.22;
  cursorY += (mouseY - cursorY) * 0.22;
  cursor.style.left = cursorX + 'px';
  cursor.style.top = cursorY + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

const hoverables = document.querySelectorAll('.btn, .project-card, .nav-link, .skill-box, .contact-socials a');
hoverables.forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
});

// Click-to-highlight for project cards and skill boxes
hoverables.forEach(el => {
  if (el.classList.contains('project-card') || el.classList.contains('skill-box')) {
    el.addEventListener('click', function() {
      this.classList.toggle('highlighted');
    });
  }
});

// Magnetic hero name effect (100px range)
const heroName = document.getElementById('hero-name');
if (heroName) {
  let origin = { x: 0, y: 0 };
  function updateOrigin() {
    const rect = heroName.getBoundingClientRect();
    origin.x = rect.left + rect.width / 2;
    origin.y = rect.top + rect.height / 2;
  }
  updateOrigin();
  window.addEventListener('resize', updateOrigin);

  document.addEventListener('mousemove', e => {
    const dx = e.clientX - origin.x;
    const dy = e.clientY - origin.y;
    const dist = Math.sqrt(dx*dx + dy*dy);
    const maxDist = 100;
    if (dist < maxDist) {
      // Move name toward cursor, max 20px
      const moveX = (dx / maxDist) * 20;
      const moveY = (dy / maxDist) * 20;
      heroName.style.transform = `translate(${moveX}px, ${moveY}px)`;
    } else {
      heroName.style.transform = '';
    }
  });
}

// Scroll-triggered reveal animation for sections
function revealOnScroll() {
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    reveals.forEach(section => observer.observe(section));
  } else {
    // Fallback for older browsers
    function checkReveal() {
      reveals.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.85 && !section.classList.contains('active')) {
          section.classList.add('active');
        }
      });
    }
    window.addEventListener('scroll', checkReveal);
    window.addEventListener('load', checkReveal);
    checkReveal();
  }
}
revealOnScroll(); 