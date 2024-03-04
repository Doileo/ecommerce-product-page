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
