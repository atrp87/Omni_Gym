'use strict';

const header = document.querySelector('.header');
const section1 = document.querySelector('#section--1');
const allSections = document.querySelectorAll('.section');
const headerScrollBtn = document.querySelector('.hero_btn');
const footerScrollBtn = document.querySelector('.footer_btn');
const navbar = document.querySelector('.navbar');
const navContainer = document.querySelector('.nav_container');
const mobileMenu = document.querySelector('#mobile_menu');
const navMenu = document.querySelector('.nav_menu');
const navLinks = document.querySelectorAll('.nav_links');
const imgTargets = document.querySelectorAll('img[data-src]');
const modal = document.getElementById('email_modal');
const openNavModalBtn = document.querySelector('.nav_links_btn');
const openMemberModalBtn = document.querySelector('.membership_sign_up');
const closeModalBtn = document.querySelector('.close_btn');
const modalGallery = document.querySelector('.gallery_overlay');
const allServices = document.querySelectorAll('.service_content');
const closeGalleryBtn = document.querySelector('.close_btn_gallery');
const form = document.querySelector("form[name='contact_form']");
const nameInput = document.querySelector("input[name='name']");
const emailInput = document.querySelector("input[name='email']");
const phoneInput = document.querySelector("input[name='phone']");
const addressInput = document.querySelector("input[name='address']");
const townInput = document.querySelector("input[name='town']");
const postCodeInput = document.querySelector("input[name='post_code']");
const tabs = document.querySelectorAll('.memberships_tab');
const tabsContainer = document.querySelector('.memberships_tab_container');
const tabsContent = document.querySelectorAll('.memberships_content');
let formMessage = document.getElementById("my_form--status");

//// * Mobile Menu Toggle ////
mobileMenu.addEventListener('click', () => {
  mobileMenu.classList.toggle('is-active');
  navMenu.classList.toggle('active');
});

//// * Nav Blur ////
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
};

navbar.addEventListener('mouseover', handleHoverNav.bind(0.5));
navbar.addEventListener('mouseout', handleHoverNav.bind(1));

//// * Sticky Nav ////
const stickyNav = (entries) => {

  const entry = entries[0];

  if (!entry.isIntersecting) {
    navContainer.classList.add('sticky');
  } else {
    navContainer.classList.remove('sticky');
  };
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0.1,
});

headerObserver.observe(header);

//// * Section Reveal ////
const revealSection = (entries, observer) => {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

if (sessionStorage.getItem("isNewSession")) {
  allSections.forEach((section) => {
    sectionObserver.observe(section);
    section.classList.add('section--onload');
  });
} else {
  allSections.forEach((section) => {
    sectionObserver.observe(section);
    section.classList.add('section--hidden');
  });

  sessionStorage.setItem('isNewSession', 'true');
};

//// * Scroll ////
const scrollSectionHandler = (location) => location.scrollIntoView({ behavior: 'smooth' });
headerScrollBtn.addEventListener('click', () => scrollSectionHandler(section1));
footerScrollBtn.addEventListener('click', () => scrollSectionHandler(header));

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
  });
});

//// * Lazy Image ////
const loadImg = (entries, observer) => {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  // Replace img src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', () => {
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

//// * Modal & Service ////
const openModal = function (modal, evt) {
  evt.preventDefault()
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
};

openNavModalBtn.addEventListener('click', (evt) => openModal(modal, evt));

openMemberModalBtn.addEventListener('click', (evt) => openModal(modal, evt));

allServices.forEach((service) => service.addEventListener('click', (evt) => openModal(modalGallery, evt)));

const closeModal = function (modal) {
  modal.style.display = 'none';
  document.body.style.overflowY = 'scroll';
};

closeModalBtn.addEventListener('click', () => closeModal(modal));

closeGalleryBtn.addEventListener('click', () => closeModal(modalGallery));

window.addEventListener('keydown', function (evt) {
  if (evt.key == 'Escape') {
    closeModal(modal);
    closeModal(modalGallery);
  }
});

window.addEventListener('click', (evt) => {
  if (evt.target === modal || evt.target === modalGallery) {
    modal.style.display = 'none'
    modalGallery.style.display = 'none'
    document.body.style.overflowY = 'scroll';
  } else {
    null
  }
});

//// * Membership Tab ////
tabsContainer.addEventListener('click', (evt) => {
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

//// * Form ////
nameInput.isValid = () => !!nameInput.value;
emailInput.isValid = () => isValidEmail(emailInput.value);
phoneInput.isValid = () => isValidPhone(phoneInput.value);
addressInput.isValid = () => !!addressInput.value;
townInput.isValid = () => !!townInput.value;
postCodeInput.isValid = () => isValidPostCode(postCodeInput.value);

const inputFields = [nameInput, emailInput, phoneInput, , addressInput, townInput, postCodeInput];

const isValidEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const isValidPhone = (phone) => {
  const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  return re.test(String(phone).toLowerCase());
};

const isValidPostCode = (code) => {
  const re = /[A-Z]{1,2}[0-9]{1,2} ?[0-9][A-Z]{2}/i;
  return re.test(String(code).toLowerCase());
};

let shouldValidate = false;
let isFormValid = false;

const validateInputs = () => {

  if (!shouldValidate) return;

  isFormValid = true;
  inputFields.forEach((input) => {
    input.classList.remove("invalid");
    input.nextElementSibling.classList.add("hide");

    if (!input.isValid()) {
      input.classList.add("invalid");
      isFormValid = false;
      input.nextElementSibling.classList.remove("hide");
    }
    renderError('Please make sure all inputs are valid and filled in !')
  });
};

const renderError = (errorMsg) => {
  formMessage.style.color = 'red'
  formMessage.style.fontSize = '1rem'
  formMessage.style.paddingBottom = '1rem'
  formMessage.style.fontWeight = '500'
  formMessage.style.textAlign = 'center'
  formMessage.innerText = `${errorMsg}`
}

form.addEventListener("submit", (evt) => {
  evt.preventDefault();
  shouldValidate = true;
  validateInputs();
  if (isFormValid) {

    const data = new FormData(evt.target);

    fetch(evt.target.action, {
      method: form.method,
      body: data,
      headers: {
        'Accept': 'application/json'
      }
    }).then(response => {
      formMessage.style.color = 'green'
      formMessage.style.fontSize = '1rem'
      formMessage.style.paddingBottom = '1rem'
      formMessage.style.fontWeight = '500'
      formMessage.style.textAlign = 'center'
      formMessage.innerHTML = "Thanks for your submission";
      form.reset();
    }).catch(error => {
      renderError(`Something went wrong. ${error}. Try again!`)
    });
  }
});

inputFields.forEach((input) => input.addEventListener("input", validateInputs));

