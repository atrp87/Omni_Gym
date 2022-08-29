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
const handleHoverNav = function (e) {
  if (e.target.classList.contains('nav_links')) {

    const link = e.target;
    const siblings = link.closest('.navbar').querySelectorAll('.nav_links');
    const logo = link.closest('.navbar').querySelector('#navbar_logo');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
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
  threshold: 0.12,
});

//// * On refresh disable animations ////
if (sessionStorage.getItem('isNewSession')) {
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

//// * Section Scroll ////
const scrollSectionHandler = (location) => location.scrollIntoView({ behavior: 'smooth' });

headerScrollBtn.addEventListener('click', () => scrollSectionHandler(section1));

footerScrollBtn.addEventListener('click', () => scrollSectionHandler(header));

navLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault()
    // Close mobile nav after section clicked
    navMenu.classList.toggle('active');
    // return burger bars inactive
    mobileMenu.classList.toggle('is-active');

    const linkID = document.getElementById(link.getAttribute('data-link'));
    if (linkID === null) {
      return;
    } else {
      linkID.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
  });
});

//// * Lazy Image ////
// ? Load images on page refresh
const loadImg = (entries, observer) => {
  const [entry] = entries;

  // entry.isIntersecting - true / false
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
  threshold: 0.1,
  rootMargin: '200px',
});

imgTargets.forEach(img => imgObserver.observe(img));

//// * Modal & Service ////
const openModal = (modal) => {

  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
};

openNavModalBtn.addEventListener('click', (e) => openModal(modal, e));
openMemberModalBtn.addEventListener('click', (e) => openModal(modal, e));

allServices.forEach((service) => service.addEventListener('click', (e) => openModal(modalGallery, e)));

const closeModal = function (modal) {
  modal.style.display = 'none';
  document.body.style.overflowY = 'scroll';
};

closeModalBtn.addEventListener('click', () => closeModal(modal));
closeGalleryBtn.addEventListener('click', () => closeModal(modalGallery));

window.addEventListener('keydown', (e) => {
  if (e.key == 'Escape') {
    closeModal(modal);
    closeModal(modalGallery);
  };
});

window.addEventListener('click', (e) => {
  if (e.target === modal || e.target === modalGallery) {
    modal.style.display = 'none';
    modalGallery.style.display = 'none';
    document.body.style.overflowY = 'scroll';;
  }
});

//// * Membership Tab ////
tabsContainer.addEventListener('click', (e) => {
  const clicked = e.target.closest('.memberships_tab');
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
// ? REVISIT ( LOOP THOUGH INPUTS ) SINGLE FUNC input validation T / F & toLowerCase()

const validateEmail = () => {
  const reEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (form.email.length === 0 || !reEmail.test(form.email.value)) {
    form.email.nextElementSibling.classList.remove("hide");
  } else {
    form.email.nextElementSibling.classList.add("hide");
    return true
  };
};

const validatePhone = () => {
  const rePhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

  if (form.phone.length === 0 || !rePhone.test(form.phone.value)) {
    form.phone.nextElementSibling.classList.remove("hide");
  } else {
    form.phone.nextElementSibling.classList.add("hide");
    return true
  };
};

const validatePostCode = () => {
  const rePostCode = /[A-Z]{1,2}[0-9]{1,2} ?[0-9][A-Z]{2}/i;

  if (form.post_code.length === 0 || !rePostCode.test(form.post_code.value)) {
    form.post_code.nextElementSibling.classList.remove("hide");
  } else {
    form.post_code.nextElementSibling.classList.add("hide");
    return true
  };
};


// input.classList.add("invalid");
// input.nextElementSibling.classList.remove("hide");
// renderError('Please make sure all inputs are valid and filled in !')


const renderError = (errorMsg) => {
  formMessage.style.color = 'red';
  formMessage.style.fontSize = '1rem';
  formMessage.style.paddingBottom = '1rem';
  formMessage.style.fontWeight = '500';
  formMessage.style.textAlign = 'center';
  formMessage.innerText = `${errorMsg}`;
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const conditionsArr = [
    validateEmail() === true,
    validatePhone() === true,
    validatePostCode() === true,
  ];

  console.log(conditionsArr)

  if (conditionsArr.includes(false)) {
    renderError('Please make sure all inputs are valid and filled in !');
  } else {

    const data = new FormData(e.target);

    fetch(e.target.action, {
      method: form.method,
      body: data,
      headers: {
        'Accept': 'application/json'
      }
    }).then(response => {
      if (!response.ok) {
        renderError(`Something went wrong. ${error}. Try again!`);
      };
      formMessage.style.color = 'green';
      formMessage.style.fontSize = '1rem';
      formMessage.style.paddingBottom = '1rem';
      formMessage.style.fontWeight = '500';
      formMessage.style.textAlign = 'center';
      formMessage.innerHTML = "Thanks for your submission !";
      form.reset();
    }).catch(error => {
      renderError(`Something went wrong. ${error}. Try again!`)
    });
  };
});
