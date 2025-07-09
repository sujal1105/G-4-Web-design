document.addEventListener("DOMContentLoaded", () => {
  const productContainer = document.getElementById("products");      // fixed ID
  const loadingStatus = document.getElementById("status");           // fixed ID

  async function fetchProducts() {
    try {
      const response = await fetch("https://dummyjson.com/products");
      if (!response.ok) throw new Error("Cannot fetch products");

      const { products } = await response.json();

      loadingStatus.style.display = "none";   // hide “Loading…” text
      productContainer.innerHTML = "";        // clear any placeholder

      products.forEach((product) => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
          <h2 class="product-name">${product.title}</h2>
          <p class="product-price">₹${product.price}</p>
          <p class="product-category">${product.category}</p>
          <p class="product-rating">⭐ ${product.rating}</p>
        `;
        productContainer.appendChild(card);
      });
    } catch (error) {
      loadingStatus.textContent = `Error: ${error.message}`;
      console.error("Error fetching products:", error.message);
    }
  }

  fetchProducts();
});
