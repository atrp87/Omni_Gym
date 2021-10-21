'use strict'
// If the object is not specified, functions in strict mode will
// return undefined and functions in normal mode will return the global object (window):

// * NAV
const navbar = document.querySelector('.navbar');
const navMenu = document.querySelector('#mobile-menu');
const navLinks = document.querySelector('.nav-menu');
// * SCROLL
const homeScrollBtn = document.querySelector('.main-btn');
const aboutSection = document.querySelector('#section--1');
const footerScrollBtn = document.querySelector('.footer_btn');
const mainPage = document.querySelector('.nav-container');

// !select all nav links for node list
const contactNav = document.querySelector('.footer');
// * MODAL
const modal = document.getElementById('email-modal');
const openModalBtn = document.querySelector('.nav-links-btn');
const closeModalBtn = document.querySelector('.close-btn');

const navAnchor = document.querySelectorAll('.nav-links');


// for (const anchor of navAnchor) {
//   anchor.addEventListener('click', function (event, i) {
//     const link = i.scrollIntoView({ behavior: 'smooth' });
//     if (event.target.innerText === 'About') {
//       console.log(link);
//     }
//   })
// }

// * Mobile Menu Toggle
navMenu.addEventListener('click', () => {
  navMenu.classList.toggle('is-active');
  navLinks.classList.toggle('active');
})

// * Nav & Mobile Menu Blur
const handleHover = function (e) {
  if (e.target.classList.contains('nav-links')) {
    const link = e.target;
    const siblings = link.closest('.navbar').querySelectorAll('.nav-links');
    const logo = link.closest('.navbar').querySelector('#navbar-logo');
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    })
    logo.style.opacity = this;
  };
}

navbar.addEventListener('mouseover', handleHover.bind(0.5));
navbar.addEventListener('mouseout', handleHover.bind(1));

// * Scroll
// ! CREATE FUNCTION ( DRY )
homeScrollBtn.addEventListener('click', () => {
  aboutSection.scrollIntoView({ behavior: 'smooth' });
});

footerScrollBtn.addEventListener('click', () => {
  mainPage.scrollIntoView({ behavior: 'smooth' });
});


// * MODAL
openModalBtn.addEventListener('click', () => {
  modal.style.display = 'block';
});

closeModalBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', function (e) {
  e.target === modal ? modal.style.display = 'none' : null
});

// * FORM 

const form = document.getElementById('form');
const name = document.getElementById('name');
const email = document.getElementById('email');
const message = document.getElementById('message');

const showError = (input, msg) => {
  const formVal = input.parentElement;
  formVal.className = 'form-validation error';

  const errorMsg = formVal.querySelector('p');
  errorMsg.innerText = msg;
}

function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value.trim() === '') {
      showError(input, 'error')
    }
  })
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  checkRequired([name, email, message]);
})




