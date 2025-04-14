// Function to fetch and display all products
async function fetchProducts() {
  const productGrid = document.getElementById("product-grid");
  if (!productGrid) return; // Exit if not on the products page

  try {
    const response = await fetch("http://localhost:5000/products");
    if (!response.ok) throw new Error("Failed to fetch products");

    const products = await response.json();
    productGrid.innerHTML = "";

    products.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.classList.add("text-center");

      productCard.innerHTML = `
      <div class="mb-6 bg-white shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl">
      <div class="p-2">
          <h3 class="text-lg font-semibold text-gray-800">${product.name}</h3>
          <a href="product-detail.html?id=${product.id}" 
             class="block text-center text-gray-600 hover:text-red-500 rounded-lg ">
            More Details <i class="fa-solid fa-arrow-right ml-1"></i>
          </a>
        </div>
        <img src="${product.image}" alt="${product.name}" class="w-full h-60 object-cover">
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
      "<p class='text-red-500 text-lg text-center font-semibold'>Product not found.</p>";
    return;
  }

  try {
    const response = await fetch(`http://localhost:5000/products/${productId}`);
    if (!response.ok) throw new Error("Failed to fetch product details");

    const product = await response.json();

    productDetail.innerHTML = `
    <div class="max-w-6xl mx-auto bg-white/90 backdrop-blur-lg overflow-hidden p-8 mt-2">
      <h1 class="text-4xl font-bold text-gray-900 text-center tracking-wide">${
        product.name
      }</h1>
      
      <div class="mt-8 flex justify-center">
        <img src="${product.image}" 
             class="w-full max-h-[28rem] object-cover rounded-xl transition-transform duration-300 hover:shadow-xl">
      </div>
      
      <p class="mt-8 text-lg text-gray-700 leading-relaxed text-justify">${
        product.description
      }</p>

      ${
        product.types && product.types.length > 0
          ? `
        <h2 class="text-3xl font-semibold text-gray-900 mt-10 text-center">Products List</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
          ${product.types
            .map(
              (type) => `
            <div class="p-6 rounded-xl transition duration-300 bg-white shadow hover:shadow-lg">
              <img src="${type.image}" class="w-full h-52 object-cover rounded-md">
              <h3 class="text-2xl font-semibold text-gray-800 mt-4">${type.name}</h3>
              <p class="text-gray-600 mt-3 text-sm leading-relaxed">${type.description}</p>
              <p class="text-lg font-semibold text-gray-900 mt-2">Price: ₹${type.price}</p>
            </div>
          `
            )
            .join("")}
        </div>
      `
          : `
        <p class="text-gray-500 mt-8 text-center">No product types available.</p>
      `
      }
      
  
      <div class="flex justify-center mt-10">
        <a href="products.html" 
           class="bg-gradient-to-r from-gray-800 to-gray-900 text-white font-semibold px-8 py-3 rounded-full transition duration-300 hover:from-gray-700 hover:to-gray-800 hover:shadow-lg">
          ← Back to Products
        </a>
      </div>
    </div>
  `;
  } catch (error) {
    productDetail.innerHTML =
      "<p class='text-red-500 text-lg text-center font-semibold'>Error loading product details.</p>";
  }
}

// Run the appropriate function when the page loads
document.addEventListener("DOMContentLoaded", () => {
  fetchProducts();
  fetchProductDetail();
});
