document.addEventListener("DOMContentLoaded", function () {
  const sortSelect = document.getElementById("sort-select");
  const productContainer = document.querySelector(".sorted-products");

  sortSelect.addEventListener("change", function () {
    const sortBy = sortSelect.value;
    const products = Array.from(
      productContainer.getElementsByClassName("item")
    );

    products.sort((a, b) => {
      const priceA = parseFloat(
        a.querySelector(".item-price").textContent.replace("$", "")
      );
      const priceB = parseFloat(
        b.querySelector(".item-price").textContent.replace("$", "")
      );

      if (sortBy === "price-low-high") {
        return priceA - priceB;
      } else if (sortBy === "price-high-low") {
        return priceB - priceA;
      }
    });

    // Clear the product container
    productContainer.innerHTML = "";

    // Re-append sorted products
    products.forEach((product) => {
      productContainer.appendChild(product);
    });
  });
});
