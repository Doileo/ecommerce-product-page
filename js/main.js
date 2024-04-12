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

// Cart functionality
function toggleCart() {
  const cartContent = document.getElementById("cart-content");
  const overlay = document.querySelector(".product-page__overlay");
  cartContent.classList.toggle("show");
  overlay.classList.toggle("show");
}

// Event listener for cart icon click to toggle cart visibility
document.getElementById("cart-icon").addEventListener("click", toggleCart);

// Function to add item to cart
function addItemToCart() {
  const cartItems = document.getElementById("cart-items");
  const productName = document.querySelector(".product__title").innerText;
  const productPrice = document.querySelector(
    ".product__price-current"
  ).innerText;
  const productImageSrc = document.querySelector(
    ".product-slider__image.active"
  ).src;
  const quantity = parseInt(
    document.querySelector(".quantity-control__input").value
  );

  // If cart is empty, hide the empty cart message
  const emptyCartMessage = document.getElementById("empty-cart-message");
  if (emptyCartMessage) {
    emptyCartMessage.style.display = "none";
  }

  const cartItem = document.createElement("div");
  cartItem.classList.add("cart-item");
  cartItem.innerHTML = `
        <img src="${productImageSrc}" alt="Product Image" class="cart-item__image">
        <div class="cart-item__details">
            <h3 class="cart-item__title">${productName}</h3>
            <span class="cart-item__price">${productPrice}</span>
            <span class="cart-item__quantity">${quantity}</span>
            <span class="cart-item__total">${
              parseInt(productPrice.slice(1)) * quantity
            }</span>
        </div>
        <button class="cart-item__remove-btn">
            <img src="../../images/icon-delete.svg" alt="Delete Icon">
        </button>
    `;
  cartItems.appendChild(cartItem);

  // Show the checkout button
  const checkoutButton = document.querySelector(".checkout-button");
  checkoutButton.style.display = "block";

  updateCartIcon(); // Update cart icon to show that items are present

  // Remove border from cart-item when items are added
  cartItem.classList.add("no-border");
}

// Function to update cart icon to indicate items are present
function updateCartIcon() {
  const cartIcon = document.getElementById("cart-icon");
  cartIcon.classList.add("has-items");
}

// Function to handle add to cart button click
function handleAddToCart() {
  addItemToCart();
  updateCartDot(); // Update cart icon to show the orange dot
  toggleCart();
}

// Function to update cart icon to show orange dot
function updateCartDot() {
  const cartIcon = document.getElementById("cart-icon");
  cartIcon.classList.add("has-items");
}

// Event listener for add to cart button click
document
  .querySelector(".product__add-to-cart")
  .addEventListener("click", handleAddToCart);

// Functionality for increasing/decreasing buttons
const decreaseButton = document.querySelector(".quantity-control__decrease");
const increaseButton = document.querySelector(".quantity-control__increase");
const quantityInput = document.querySelector(".quantity-control__input");

decreaseButton.addEventListener("click", () => {
  const currentValue = parseInt(quantityInput.value);
  if (currentValue > 1) {
    quantityInput.value = currentValue - 1;
  }
});

increaseButton.addEventListener("click", () => {
  const currentValue = parseInt(quantityInput.value);
  quantityInput.value = currentValue + 1;
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

// Get the product image and arrow icons
const productImage = document.querySelector(".product-slider__image");
const prevArrow = document.querySelector(".product-slider__prev");
const nextArrow = document.querySelector(".product-slider__next");

// Function to calculate and set arrow position
function setArrowPosition() {
  const imageRect = productImage.getBoundingClientRect();
  const imageCenterY = imageRect.top + imageRect.height / 2;

  // Set arrow position to center vertically
  prevArrow.style.top = `${imageCenterY}px`;
  nextArrow.style.top = `${imageCenterY}px`;
}

// Initial setup
setArrowPosition();

// Recalculate position on window resize
window.addEventListener("resize", setArrowPosition);

// Function to scroll back to the top of the page
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth", // Smooth scroll behavior
  });
}

// To hide the back-to-top button when scrolling to the top
window.addEventListener("scroll", function () {
  var backToTopButton = document.querySelector(".back-to-top");
  if (window.scrollY === 0) {
    // Check if user scrolled to the top
    backToTopButton.style.display = "none";
  } else {
    backToTopButton.style.display = "block";
  }
});
