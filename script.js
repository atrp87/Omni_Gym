'use strict';

//// * GENERAL ////
const header = document.querySelector('.header');
const section1 = document.querySelector('#section--1');
const allSections = document.querySelectorAll('.section');
const headerScrollBtn = document.querySelector('.hero_btn');
const footerScrollBtn = document.querySelector('.footer_btn');
//// * NAV ////
const navbar = document.querySelector('.navbar');
const navContainer = document.querySelector('.nav_container');
const mobileMenu = document.querySelector('#mobile_menu');
const navMenu = document.querySelector('.nav_menu');
const navLinks = document.querySelectorAll('.nav_links');
//// * MODAL ////
const modal = document.getElementById('email_modal');
const openModalBtn = document.querySelector('.nav_links_btn');
const closeModalBtn = document.querySelector('.close_btn');
//// * GALLERY ////
const modalGallery = document.querySelector('.gallery_overlay');
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

// ? Semantic ( gallery alt) ++
// ? Sections Color
// ? Form error link
// ? On page refresh opacity 1 ( SESSION STORAGE )
// ? Scroll animation mobile


//// * Mobile Menu Toggle ////
mobileMenu.addEventListener('click', () => {
  mobileMenu.classList.toggle('is-active');
  navMenu.classList.toggle('active');
})

//// * Nav & Mobile Menu Blur ////
const handleHoverNav = function (evt) {
  if (evt.target.classList.contains('nav_links')) {
    const link = evt.target;
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

// ! ADD NEW CLASS LIST POST LOAD

// if (sessionStorage.getItem("isNewSession")) {
//   console.log('welcome back');
// } else {
//   console.log('FIRST TIME');
//   sessionStorage.setItem('isNewSession', 'true');
// }

// if (sessionStorage.getItem("isNewSession")) {
//   allSections.forEach((section) => {
//     section.style.transition = "all 0s";
//     section.style.opacity = "1";
//   });
// } else {
//   allSections.forEach((section) => {
//     section.classList.add('section--hidden');
//     sessionStorage.setItem('isNewSession', 'true');
//   });
// }




//// * SCROLL VIEW ////
const scrollSectionHandler = (location) => location.scrollIntoView({ behavior: 'smooth' });

headerScrollBtn.addEventListener('click', () => scrollSectionHandler(section1))
footerScrollBtn.addEventListener('click', () => scrollSectionHandler(header))


//// * NAV SCROLL LINKS ////
navLinks.forEach((link) => {
  link.addEventListener('click', (evt) => {
    evt.preventDefault()
    // Close mobile nav after section clicked
    navMenu.classList.toggle('active');
    // return burger bars inactive
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
    entry.target.classList.remove('lazy_img');

  });
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTargets.forEach(img => imgObserver.observe(img));

//// * MODAL & SERVICE GALLERY ////
const openModal = function (modalType, evt) {
  evt.preventDefault()
  modalType.style.display = 'block';
  document.body.style.overflow = 'hidden';
};

openModalBtn.addEventListener('click', (evt) => openModal(modal, evt));
services.forEach((service) => service.addEventListener('click', (evt) => openModal(modalGallery, evt)));

const closeModal = function (close) {
  close.style.display = 'none';
  document.body.style.overflowY = 'scroll';
};

closeModalBtn.addEventListener('click', () => closeModal(modal));
closeGalleryBtn.addEventListener('click', () => closeModal(modalGallery));

const escapeClose = function (evt, modalType) {
  if (evt.key === 'Escape' && !modalType.style.display === 'none') {
    closeModal();
  }
};

document.addEventListener('keydown', () => closeModal(modal));
document.addEventListener('keydown', () => closeModal(modalGallery));

window.addEventListener('click', (e) => {
  if (e.target === modal || e.target === modalGallery) {
    modal.style.display = 'none'
    modalGallery.style.display = 'none'
    document.body.style.overflowY = 'scroll';
  } else {
    null
  }
});

//// * MEMBER TAB ////
tabsContainer.addEventListener('click', function (evt) {
  const clicked = evt.target.closest('.memberships_tab');

  // Guard clause
  if (!clicked) return;

  // Remove active classes
  tabs.forEach(tab => tab.classList.remove('memberships_tab--active'));
  tabsContent.forEach(cont => cont.classList.remove('memberships_content--active'));

  // Activate tab
  clicked.classList.add('memberships_tab--active');

  // Activate content area
  document.querySelector(`.memberships_content--${clicked.dataset.tab}`)
    .classList.add('memberships_content--active');
});

//// ! FORM ERROR ////
const showError = (input, msg) => {
  const formVal = input.parentElement;
  formVal.className = 'form_validation error';

  const errorMsg = formVal.querySelector('p');
  errorMsg.innerText = msg;
}

//// ! FORM REQUIRED FIELDS ////
function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value.trim() === '') showError(input, `* ${getFieldName(input)} is required`);
  })
}

//// ! FORM FIELD NAME ////
const getFieldName = input => {
  return input.name.charAt(0).toUpperCase() + input.name.slice(1).replaceAll('_', ' ');
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  checkRequired([name, surname, email, phone_number, address_1, town, post_code]);
})

//// ! FORMSPREE ////
async function handleSubmit(evt) {
  evt.preventDefault();
  let status = document.getElementById("my_form--status");
  console.log(status);
  const data = new FormData(evt.target);
  console.log(data);

  fetch(evt.target.action, {
    method: form.method,
    body: data,
    headers: {
      'Accept': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
      status.innerHTML = "Thanks for your submission!";
    } else {
      checkRequired()
    }
    form.reset()
  }).catch(error => {
    status.innerHTML = "Oops! Please fill out the required fields"

  });
}
form.addEventListener("submit", handleSubmit)