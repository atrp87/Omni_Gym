'use strict';

//// * GENERAL ////
const header = document.querySelector('.header');
const section1 = document.querySelector('#section--1');
const allSections = document.querySelectorAll('.section');
//// * NAV ////
const navbar = document.querySelector('.navbar');
const navContainer = document.querySelector('.nav_container');
const mobileMenu = document.querySelector('#mobile_menu');
const navMenu = document.querySelector('.nav_menu');
const navLinks = document.querySelectorAll('.nav_links');
//// * SCROLL ////
const headerScrollBtn = document.querySelector('.hero_btn');
const footerScrollBtn = document.querySelector('.footer_btn');
//// * MODAL ////
const modal = document.getElementById('email_modal');
const openModalBtn = document.querySelector('.nav_links_btn');
const closeModalBtn = document.querySelector('.close_btn');
//// * GALLERY ////
const galleryOverlay = document.querySelector('.gallery_overlay');
const galleryModal = document.querySelector('.gallery_container');
const services = document.querySelectorAll('.service_content');
const closeGalleryBtn = document.querySelector('.close_btn_gallery');
//// * FORM ////
const form = document.getElementById('form');
const name = document.getElementById('name');
const email = document.getElementById('email');
const message = document.getElementById('message');
//// * TAB ////
const tabs = document.querySelectorAll('.memberships_tab');
const tabsContainer = document.querySelector('.memberships_tab_container');
const tabsContent = document.querySelectorAll('.memberships_content');


//// ! see session storage ////
//// * Page Load Remove Opacity ////
// window.onload = () => {
//   allSections.forEach((section) => {
//     section.classList.remove('section--hidden');
//     section.style = 'transition: none;'
//   });
// };


//// * Mobile Menu Toggle ////
mobileMenu.addEventListener('click', () => {
  mobileMenu.classList.toggle('is-active');
  navMenu.classList.toggle('active');
})

//// * Nav & Mobile Menu Blur ////
const handleHoverNav = function (e) {
  if (e.target.classList.contains('nav_links')) {
    const link = e.target;
    const siblings = link.closest('.navbar').querySelectorAll('.nav_links');
    const logo = link.closest('.navbar').querySelector('#navbar_logo');
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    })
    logo.style.opacity = this;
  };
}
navbar.addEventListener('mouseover', handleHoverNav.bind(0.5));
navbar.addEventListener('mouseout', handleHoverNav.bind(1));

//// * STICKY NAV ////
// https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
// ? REVIEW Intersection Observer API **
const stickyNav = (entries) => {
  const entry = entries[0];
  if (!entry.isIntersecting) {
    navContainer.classList.add('sticky');
  } else {
    navContainer.classList.remove('sticky');
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null, // Entire view port
  threshold: 0.1, // 10% of the header reveal nav
  // Inspect - intersectionRatio & isIntersecting
});
headerObserver.observe(header);

//// * SECTION REVEAL ////
const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (entry.isIntersecting) {
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
  }
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.1,
});

allSections.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});


//// * SCROLL VIEW ////
headerScrollBtn.addEventListener('click', () => {
  section1.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

footerScrollBtn.addEventListener('click', () => {
  header.scrollIntoView({ behavior: 'smooth' });
});


//// * NAV SCROLL LINKS ////
navLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault()

    // Close mobile nav after section clicked
    navMenu.classList.toggle('active');
    // return burger bars from cross
    mobileMenu.classList.toggle('is-active');

    const linkID = document.getElementById(link.getAttribute('data-link'));
    if (linkID === null) {
      return;
    } else {
      linkID.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  })
});

//// * LAZY IMAGES ////
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTargets.forEach(img => imgObserver.observe(img));

//// * MODAL ////
openModalBtn.addEventListener('click', (e) => {
  e.preventDefault()
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
});

closeModalBtn.addEventListener('click', () => {
  modal.style.display = 'none';
  document.body.style.overflow = 'scroll';
});

window.addEventListener('click', (e) => {
  e.target === modal ? modal.style.display = 'none' : null
});

//// * MEMBER TAB ////
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.memberships_tab');
  // Guard clause
  if (!clicked) return;
  // Remove active classes
  tabs.forEach(t => t.classList.remove('memberships_tab--active'));
  tabsContent.forEach(c => c.classList.remove('memberships_content--active'));
  // Activate tab
  clicked.classList.add('memberships_tab--active');
  // Activate content area
  document
    .querySelector(`.memberships_content--${clicked.dataset.tab}`)
    .classList.add('memberships_content--active');
});


//// * GALLERY ////
services.forEach((service) => {
  service.addEventListener('click', () => {
    galleryOverlay.style.display = 'block ';
  })
});

closeGalleryBtn.addEventListener('click', () => {
  galleryOverlay.style.display = 'none';
});

window.addEventListener('click', (e) => {
  e.target === galleryOverlay ? galleryOverlay.style.display = 'none' : null
});

//// * FORM ERROR ////
const showError = (input, msg) => {
  const formVal = input.parentElement;
  formVal.className = 'form_validation error';

  const errorMsg = formVal.querySelector('p');
  errorMsg.innerText = msg;
}

// //// * FORM VALID ////
// const showValid = input => {
//   const formVal = input.parentElement;
//   formVal.className = 'form_validation valid';
// }

//// * FORM REQUIRED FIELDS ////
function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value.trim() === '') {
      showError(input, `* ${getFieldName(input)} is required`);
    }
    // else {
    //   showValid(input)
    // }
  })
}

//// * FORM FIELD NAME ////
const getFieldName = input => {
  return input.name.charAt(0).toUpperCase() + input.name.slice(1).replaceAll('_', ' ');
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  checkRequired([name, surname, email, phone_number, address_1, town, post_code]);
})

//// * FORMSPREE ////
async function handleSubmit(event) {
  event.preventDefault();
  let status = document.getElementById("my_form--status");
  const data = new FormData(event.target);
  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
      'Accept': 'application/json'
    }
  }).then(response => {
    status.innerHTML = "Thanks for your submission!";
    form.reset()
  }).catch(error => {
    status.innerHTML = "Oops! Please fill out the required fields"
  });
}
form.addEventListener("submit", handleSubmit)