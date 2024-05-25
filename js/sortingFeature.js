document.addEventListener("DOMContentLoaded", function () {
  const sortSelect = document.getElementById("sort-select"); // Dropdown to select sorting order
  const productContainer = document.querySelector(".sorted-products"); // Container for products to be sorted

  // Event listener for sort selection change
  sortSelect.addEventListener("change", handleSortChange);

  // Handles the change event for the sort selection
  function handleSortChange() {
    const sortBy = sortSelect.value; // Get selected sorting option
    const products = getProductsArray(); // Retrieve array of product elements

    sortProducts(products, sortBy); // Sort products based on the selected option
    updateProductContainer(products); // Update the DOM with the sorted products
  }

  // Retrieves an array of product elements
  function getProductsArray() {
    return Array.from(productContainer.getElementsByClassName("item"));
  }

  // Sorts the products array based on the selected sorting option
  function sortProducts(products, sortBy) {
    products.sort((a, b) => {
      const priceA = getProductPrice(a); // Get price of product A
      const priceB = getProductPrice(b); // Get price of product B

      // Compare prices based on selected sorting order
      return sortBy === "price-low-high" ? priceA - priceB : priceB - priceA;
    });
  }

  // Extracts the price from a product element
  function getProductPrice(product) {
    return parseFloat(
      product.querySelector(".item-price").textContent.replace("$", "")
    );
  }

  // Updates the product container with sorted products
  function updateProductContainer(products) {
    productContainer.innerHTML = ""; // Clear the product container
    products.forEach((product) => productContainer.appendChild(product)); // Append sorted products
  }
});
