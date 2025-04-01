// Function to fetch and display all products
async function fetchProducts() {
  const productGrid = document.getElementById("product-grid");
  if (!productGrid) return; // Exit if not on the products page

  try {
    const response = await fetch("http://localhost:5000/products");
    if (!response.ok) throw new Error("Failed to fetch products");

    const products = await response.json();
    productGrid.innerHTML = ""; // Clear previous content

    products.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.classList.add("text-center");

      productCard.innerHTML = `
      <div class="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl">
        <img src="${product.image}" alt="${product.name}" class="w-full h-60 object-cover">
        <div class="p-4">
          <h3 class="text-xl font-bold text-gray-800">${product.name}</h3>
          <a href="product-detail.html?id=${product.id}" 
             class="block text-center bg-red-500 text-white font-semibold px-5 py-2 rounded-lg mt-4 transition duration-300 hover:bg-red-600">
            Discover More
          </a>
        </div>
      </div>
    `;

      productGrid.appendChild(productCard);
    });
  } catch (error) {
    console.error(error);
  }
}

// Function to fetch and display a single product's details
async function fetchProductDetail() {
  const productDetail = document.getElementById("product-detail");
  if (!productDetail) return; // Exit if not on the product details page

  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");

  if (!productId) {
    productDetail.innerHTML =
      "<p class='text-red-500 text-lg'>Product not found.</p>";
    return;
  }

  try {
    const response = await fetch(`http://localhost:5000/products/${productId}`);
    if (!response.ok) throw new Error("Failed to fetch product details");

    const product = await response.json();

    productDetail.innerHTML = `
    <div class="max-w-3xl mx-auto bg-white overflow-hidden p-6">
      <h1 class="text-4xl font-bold text-gray-900 text-center">${product.name}</h1>
      
      <div class="mt-6">
        <img src="${product.image}" class="w-full h-96 object-cover rounded-lg transition-transform duration-300">
      </div>
      
      <p class="mt-6 text-lg text-gray-700 leading-relaxed text-justify">${product.description}</p>
  
      <div class="flex justify-center mt-6">
        <a href="products.html" 
           class="bg-gray-800 text-white font-semibold px-6 py-3 rounded-lg transition duration-300 hover:bg-gray-900 hover:shadow-md">
          ← Back to Products
        </a>
      </div>
    </div>
  `;
  } catch (error) {
    productDetail.innerHTML =
      "<p class='text-red-500 text-lg'>Error loading product details.</p>";
  }
}

// Run the appropriate function when the page loads
document.addEventListener("DOMContentLoaded", () => {
  fetchProducts();
  fetchProductDetail();
});
