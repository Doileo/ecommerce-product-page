"use strict";

(function () {
  document
    .getElementById("newsletter-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      const emailInput = document.getElementById("email");
      const message = document.getElementById("form-message");

      // Reset message
      message.style.display = "none";
      message.textContent = "";

      // Validate email
      if (!validateEmail(emailInput.value)) {
        message.textContent = "Please enter a valid email";
        message.style.color = "#960000";
        message.style.display = "block";
        return;
      }

      // Simulate form submission
      setTimeout(() => {
        message.textContent = "Thank you for subscribing!";
        message.style.color = "#2a4c19";
        message.style.display = "block";
        emailInput.value = ""; // Clear the input field
      }, 1000);
    });

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }
})();
