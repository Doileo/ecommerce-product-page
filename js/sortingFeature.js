document.addEventListener("DOMContentLoaded", function () {
  // Function to hide or show the Bestsellers title based on whether items are present
  function toggleBestsellersTitle() {
    const bestsellersTitle = document.querySelector(".bestsellers__title");
    const bestsellersItems = document.querySelectorAll(
      ".bestsellers .item-details"
    );

    // Check if there are any items in the Bestsellers section
    if (bestsellersItems.length === 0) {
      bestsellersTitle.style.display = "none"; // Hide the Bestsellers title
    } else {
      bestsellersTitle.style.display = "block"; // Show the Bestsellers title
    }
  }

  // Call the function initially
  toggleBestsellersTitle();

  // Function to sort items by price in ascending order
  function sortByPriceAscending() {
    const allItems = document.querySelectorAll(".item-details");

    // Create an array of objects representing each item and its price
    const itemsWithPrice = Array.from(allItems).map((item) => {
      return {
        element: item.parentElement.parentElement, // Parent element of item details
        price: parseFloat(
          item.querySelector(".item-price").textContent.replace("$", "")
        ),
      };
    });

    // Sort items based on price in ascending order
    itemsWithPrice.sort((a, b) => a.price - b.price);

    // Update the HTML content based on the sorted array
    const container = document.querySelector(".featured-categories__grid");
    container.innerHTML = ""; // Clear the container

    itemsWithPrice.forEach((item) => {
      container.appendChild(item.element); // Append the sorted items back to the container
    });

    // Call the function to hide or show the Bestsellers title
    toggleBestsellersTitle();
  }

  // Function to sort items by price in descending order
  function sortByPriceDescending() {
    const allItems = document.querySelectorAll(".item-details");

    // Create an array of objects representing each item and its price
    const itemsWithPrice = Array.from(allItems).map((item) => {
      return {
        element: item.parentElement.parentElement, // Parent element of item details
        price: parseFloat(
          item.querySelector(".item-price").textContent.replace("$", "")
        ),
      };
    });

    // Sort items based on price in descending order
    itemsWithPrice.sort((a, b) => b.price - a.price);

    // Update the HTML content based on the sorted array
    const container = document.querySelector(".featured-categories__grid");
    container.innerHTML = ""; // Clear the container

    itemsWithPrice.forEach((item) => {
      container.appendChild(item.element); // Append the sorted items back to the container
    });

    // Call the function to hide or show the Bestsellers title
    toggleBestsellersTitle();
  }

  // Event listener for the sort select
  document
    .getElementById("sort-select")
    .addEventListener("change", function () {
      console.log("Sort select changed:", this.value);

      const sortBy = this.value;
      if (sortBy === "price-low-high") {
        sortByPriceAscending();
      } else if (sortBy === "price-high-low") {
        sortByPriceDescending();
      }
    });
});
