document.addEventListener("DOMContentLoaded", function () {
  // Dropdown element for selecting sorting order
  const sortSelect = document.getElementById("sort-select");

  // Container for displaying sorted products
  const productContainer = document.querySelector(".sorted-products");

  // Event listener for change in sort selection
  sortSelect.addEventListener("change", handleSortChange);

  // Handles sort selection change
  function handleSortChange() {
    // Get the selected sorting option
    const sortBy = sortSelect.value;

    // Retrieve array of product elements
    const products = getProductsArray();

    // Sort products based on the selected option
    sortProducts(products, sortBy);

    // Update the DOM with the sorted products
    updateProductContainer(products);
  }

  // Retrieves an array of product elements
  function getProductsArray() {
    return Array.from(productContainer.getElementsByClassName("item"));
  }

  // Sorts the products array based on the selected sorting option
  function sortProducts(products, sortBy) {
    products.sort((a, b) => {
      // Get price of product A
      const priceA = getProductPrice(a);

      // Get price of product B
      const priceB = getProductPrice(b);

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
    // Clear the product container
    productContainer.innerHTML = "";

    // Append sorted products
    products.forEach((product) => productContainer.appendChild(product));
  }
});
