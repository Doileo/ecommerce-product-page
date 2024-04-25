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

// Function to toggle cart visibility
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
  const productPriceText = document.querySelector(
    ".product__price-current"
  ).innerText;
  const productPrice = parseFloat(productPriceText.replace("$", ""));
  const productImageSrc = document.querySelector(
    ".product-slider__image.active"
  ).src;
  const quantity = parseInt(
    document.querySelector(".quantity-control__input").value
  );

  // Check if cart is empty before adding item
  const cartIsEmpty = cartItems.children.length === 0;

  // Calculate the total price with the desired format
  const totalPrice = (productPrice * quantity).toFixed(2);
  const totalPriceFormatted = `$${totalPrice}`;

  // Add the item to the cart display
  const cartItem = document.createElement("div");
  cartItem.classList.add("cart-item");
  cartItem.innerHTML = `
        <img src="${productImageSrc}" alt="Product Image" class="cart-item__image">
        <div class="cart-item__details">
            <h3 class="cart-item__title">${productName}</h3>
            <span class="cart-item__price">${productPriceText} x ${quantity}</span>
            <span class="cart-item__total">${totalPriceFormatted}</span>
        </div>
        <button class="cart-item__remove-btn">
            <img src="../../images/icon-delete.svg" alt="Delete Icon">
        </button>
    `;
  cartItems.appendChild(cartItem);

  // Show the checkout button
  const checkoutButton = document.querySelector(".checkout-button");
  checkoutButton.style.display = "block";

  // Update empty cart message visibility if cart was previously empty
  if (cartIsEmpty) {
    const emptyCartMessage = document.getElementById("empty-cart-message");
    if (emptyCartMessage) {
      // Hide the paragraph
      const paragraph = emptyCartMessage.querySelector(
        ".empty-cart-message__text"
      );
      if (paragraph) {
        paragraph.style.display = "none";
      }

      // Show the heading and line break
      const heading = emptyCartMessage.querySelector(
        ".empty-cart-message__heading"
      );
      const lineBreak = emptyCartMessage.querySelector("#cart-br-tag");
      if (heading) {
        heading.style.display = "block";
      }
      if (lineBreak) {
        lineBreak.style.display = "block";
      }
    }
  }

  updateCartIcon(); // Update cart icon to show that items are present
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

  // Function to go to the previous image
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

window.addEventListener("scroll", function () {
  var backToTopButton = document.querySelector(".back-to-top");
  if (backToTopButton) {
    // Check if back-to-top button exists
    if (window.scrollY === 0) {
      // Check if user scrolled to the top
      backToTopButton.style.display = "none";
    } else {
      backToTopButton.style.display = "block";
    }
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const productThumbnails = document.querySelectorAll(
    ".product-thumbnails__image"
  );
  const productImageOverlay = document.getElementById("product-image-overlay");
  const productImageContainer = document.getElementById(
    "product-image-container"
  );
  const prevButton = document.querySelector(".product-slider__prev-btn");
  const nextButton = document.querySelector(".product-slider__next-btn");
  const closeButton = document.querySelector(".product-image-overlay__close");
  const productSliderImages = document.querySelectorAll(
    ".product-slider__image"
  );
  const productThumbnailsWrapper = document.querySelector(
    ".product-thumbnails-wrapper"
  );

  let currentImageIndex = 0;

  // Event listener for each product thumbnail image
  productThumbnails.forEach(function (thumbnail, index) {
    thumbnail.addEventListener("click", function () {
      // Show the overlay
      productImageOverlay.classList.add("show");

      // Display the corresponding product image
      currentImageIndex = index;
      displayProductImage(currentImageIndex);

      // Show the thumbnails wrapper
      productThumbnailsWrapper.style.display = "flex";

      // Ensure left and right arrows are visible
      prevButton.style.display = "block";
      nextButton.style.display = "block";
    });
  });

  // Function to display the product image in the overlay
  function displayProductImage(index) {
    // Clear previous image
    productImageContainer.innerHTML = "";

    // Create image element
    const newImage = productSliderImages[index].cloneNode(true);

    // Append image to container
    productImageContainer.appendChild(newImage);
  }

  // Event listener for previous button
  prevButton.addEventListener("click", function () {
    currentImageIndex =
      (currentImageIndex - 1 + productSliderImages.length) %
      productSliderImages.length;
    displayProductImage(currentImageIndex);
  });

  // Event listener for next button
  nextButton.addEventListener("click", function () {
    currentImageIndex = (currentImageIndex + 1) % productSliderImages.length;
    displayProductImage(currentImageIndex);
  });

  // Event listener for closing the overlay
  closeButton.addEventListener("click", function () {
    productImageOverlay.classList.remove("show");
    // Hide the thumbnails wrapper
    productThumbnailsWrapper.style.display = "none";

    // Hide the left and right arrows
    prevButton.style.display = "none";
    nextButton.style.display = "none";
  });
});
