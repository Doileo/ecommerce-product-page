"use strict";

// Function to smoothly scroll back to the top of the page
const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

document.addEventListener("DOMContentLoaded", () => {
  // Navigation menu elements
  const navToggle = document.querySelector(".header__nav-toggle");
  const navClose = document.querySelector(".header__nav-close");
  const navMenu = document.querySelector(".header__nav");
  const overlay = document.querySelector(".overlay");

  // Empty cart message element
  const emptyCartMessage = document.getElementById("empty-cart-message");

  // Product thumbnails and image overlay elements
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

  // Cart elements
  const cartIcon = document.getElementById("cart-icon");
  const cartContent = document.getElementById("cart-content");
  const checkoutButton = document.querySelector(".checkout-button");

  // Back to top button
  const backToTopButton = document.querySelector(".back-to-top");

  // Show empty cart message by default
  if (emptyCartMessage) {
    const paragraph = emptyCartMessage.querySelector(
      ".empty-cart-message__text"
    );
    if (paragraph) paragraph.style.display = "block"; // Make the empty cart message visible
  }

  // Function to open the navigation menu
  const openMenu = () => {
    navMenu.classList.add("header__nav-visible");
    overlay.classList.add("overlay-visible");
  };

  // Function to close the navigation menu
  const closeMenu = () => {
    navMenu.classList.remove("header__nav-visible");
    overlay.classList.remove("overlay-visible");
  };

  // Function to toggle the cart visibility
  const toggleCart = () => {
    cartContent.classList.toggle("show");
    overlay.classList.toggle("show");
  };

  // Function to add an item to the cart
  const addItemToCart = () => {
    const cartItems = document.getElementById("cart-items");
    const productName = document.querySelector(".product__title").innerText;
    const productPriceText = document.querySelector(
      ".product__price-current"
    ).textContent;
    const productPrice = parseFloat(productPriceText.replace("$", ""));
    const productImageSrc = document.querySelector(
      ".product-slider__image.active"
    ).src;
    const quantity = parseInt(
      document.querySelector(".quantity-control__input").value
    );

    // Calculate total price
    const totalPrice = (productPrice * quantity).toFixed(2);

    // Generate cart item HTML
    const cartItemHTML = `
      <div class="cart-item">
        <img src="${productImageSrc}" alt="Product Image" class="cart-item__image">
        <div class="cart-item__details">
          <h3 class="cart-item__title">${productName}</h3>
          <span class="cart-item__price">${productPriceText} x ${quantity}</span>
          <span class="cart-item__total">$${totalPrice}</span>
        </div>
        <button class="cart-item__remove-btn">
          <img src="../../images/icon-delete.svg" alt="Delete Icon">
        </button>
      </div>
    `;

    // Insert cart item HTML
    cartItems.insertAdjacentHTML("beforeend", cartItemHTML);

    // Display checkout button
    checkoutButton.style.display = "block";

    // Hide empty cart message if cart has items
    if (emptyCartMessage) {
      const paragraph = emptyCartMessage.querySelector(
        ".empty-cart-message__text"
      );
      if (paragraph) paragraph.style.display = "none";
    }

    updateCartIcon();

    // Event listener for removing item from cart
    const removeButton = cartItems.lastElementChild.querySelector(
      ".cart-item__remove-btn"
    );
    removeButton.addEventListener("click", () => {
      cartItems.lastElementChild.remove();
      // Hide checkout button and show empty cart message if cart is empty
      if (cartItems.children.length === 0) {
        checkoutButton.style.display = "none";
        if (emptyCartMessage) {
          const paragraph = emptyCartMessage.querySelector(
            ".empty-cart-message__text"
          );
          if (paragraph) paragraph.style.display = "block";
        }
      }
      updateCartIcon();
    });
  };

  // Function to update the cart icon
  const updateCartIcon = () => {
    const cartItems = document.querySelectorAll(".cart-item");
    const itemCountElement = cartIcon.querySelector(".item-count");

    let totalItemCount = 0;
    // Calculate total number of items in cart
    cartItems.forEach((item) => {
      totalItemCount += parseInt(
        item.querySelector(".cart-item__price").textContent.split("x")[1]
      );
    });

    // Display or hide cart icon based on item count
    if (totalItemCount > 0) {
      itemCountElement.textContent = totalItemCount;
      cartIcon.classList.add("has-items");
      itemCountElement.style.display = "block";
      // Apply styling to item count badge
      itemCountElement.style.backgroundColor = getComputedStyle(
        document.documentElement
      ).getPropertyValue("--primary-orange");
      itemCountElement.style.borderRadius = "50%";
    } else {
      cartIcon.classList.remove("has-items");
      itemCountElement.style.display = "none";
      checkoutButton.style.display = "none";

      // Display empty cart message if cart is empty
      if (emptyCartMessage) {
        const paragraph = emptyCartMessage.querySelector(
          ".empty-cart-message__text"
        );
        if (paragraph) paragraph.style.display = "block";
      }
    }
  };

  // Product slider functions
  let currentIndex = 0;

  // Function to go to the next image
  const goToNextImage = () => {
    productSliderImages[currentIndex].style.display = "none";
    currentIndex = (currentIndex + 1) % productSliderImages.length;
    productSliderImages[currentIndex].style.display = "block";
  };

  // Function to go to the previous image
  const goToPreviousImage = () => {
    productSliderImages[currentIndex].style.display = "none";
    currentIndex =
      (currentIndex - 1 + productSliderImages.length) %
      productSliderImages.length;
    productSliderImages[currentIndex].style.display = "block";
  };

  // Function to display the product image in the overlay
  const displayProductImage = (index) => {
    productImageContainer.innerHTML = "";
    const newImage = productSliderImages[index].cloneNode(true);
    productImageContainer.appendChild(newImage);
  };

  // Function to set the position of the arrow buttons
  const setArrowPosition = () => {
    // Calculate the vertical center of the product image
    const imageRect = productSliderImages[0].getBoundingClientRect();
    const imageCenterY = imageRect.top + imageRect.height / 2;
    // Set the position of the arrow buttons
    document.querySelector(
      ".product-slider__prev"
    ).style.top = `${imageCenterY}px`;
    document.querySelector(
      ".product-slider__next"
    ).style.top = `${imageCenterY}px`;
  };

  // Event Listeners
  // Navigation menu
  navToggle.addEventListener("click", openMenu);
  navClose.addEventListener("click", closeMenu);
  // Cart
  cartIcon.addEventListener("click", toggleCart);
  document
    .querySelector(".product__add-to-cart")
    .addEventListener("click", () => {
      addItemToCart();
      toggleCart();
    });

  // Quantity control buttons
  document
    .querySelector(".quantity-control__decrease")
    .addEventListener("click", () => {
      const quantityInput = document.querySelector(".quantity-control__input");
      const currentValue = parseInt(quantityInput.value);
      if (currentValue > 1) quantityInput.value = currentValue - 1;
    });

  document
    .querySelector(".quantity-control__increase")
    .addEventListener("click", () => {
      const quantityInput = document.querySelector(".quantity-control__input");
      quantityInput.value = parseInt(quantityInput.value) + 1;
    });

  // Product slider navigation
  document
    .querySelector(".product-slider__next")
    .addEventListener("click", goToNextImage);
  document
    .querySelector(".product-slider__prev")
    .addEventListener("click", goToPreviousImage);

  // Event listener for each product thumbnail image
  productThumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener("click", () => {
      productImageOverlay.classList.add("show");
      currentIndex = index;
      displayProductImage(currentIndex);
      productThumbnailsWrapper.style.display = "flex";
      prevButton.style.display = "block";
      nextButton.style.display = "block";
      // Highlight the selected thumbnail image
      highlightSelectedThumbnail(thumbnail);
    });
  });

  // Function to highlight the selected thumbnail image
  const highlightSelectedThumbnail = (selectedThumbnail) => {
    productThumbnails.forEach((thumbnail) => {
      thumbnail.classList.remove("selected");
    });

    selectedThumbnail.classList.add("selected");
  };

  // Event listeners for navigation within the product images
  prevButton.addEventListener("click", () => {
    currentIndex =
      (currentIndex - 1 + productSliderImages.length) %
      productSliderImages.length;
    displayProductImage(currentIndex);
  });

  nextButton.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % productSliderImages.length;
    displayProductImage(currentIndex);
  });

  // Event listener for closing the image overlay
  closeButton.addEventListener("click", () => {
    productImageOverlay.classList.remove("show");
    productThumbnailsWrapper.style.display = "none";
    prevButton.style.display = "none";
    nextButton.style.display = "none";
  });

  // Window resize event for setting arrow position
  window.addEventListener("resize", setArrowPosition);

  // Event listener for scrolling
  window.addEventListener("scroll", () => {
    if (backToTopButton) {
      // Show or hide back to top button based on scroll position
      backToTopButton.style.display = window.scrollY === 0 ? "none" : "block";
    }
  });

  // Event listener for back to top button click
  if (backToTopButton) {
    backToTopButton.addEventListener("click", scrollToTop);
  }

  // Initial setup
  setArrowPosition(); // Set initial arrow position
}); // Show or hide back to top button based on scroll position
