"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const navToggle = document.querySelector(".header__nav-toggle");
  const navClose = document.querySelector(".header__nav-close");
  const navMenu = document.querySelector(".header__nav");
  const overlay = document.querySelector(".overlay");

  // Function to open the menu
  function openMenu() {
    navMenu.classList.add("header__nav-visible");
    overlay.classList.add("overlay-visible");
  }

  // Function to close the menu
  function closeMenu() {
    navMenu.classList.remove("header__nav-visible");
    overlay.classList.remove("overlay-visible");
  }

  // Event listener for the nav toggle button
  navToggle.addEventListener("click", openMenu);

  // Event listener for the close button
  navClose.addEventListener("click", closeMenu);
});

// Product slider
document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll(".product-slider__image");
  let currentIndex = 0;

  // Function to go to the next image
  function goToNextImage() {
    images[currentIndex].style.display = "none";
    currentIndex = (currentIndex + 1) % images.length;
    images[currentIndex].style.display = "block";
  }

  //Function to go to the previous image
  function goToPreviousImage() {
    images[currentIndex].style.display = "none";
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    images[currentIndex].style.display = "block";
  }

  // Event listener for the next button
  document
    .querySelector(".product-slider__next")
    .addEventListener("click", goToNextImage);

  // Event listener for the previous button
  document
    .querySelector(".product-slider__prev")
    .addEventListener("click", goToPreviousImage);
});
