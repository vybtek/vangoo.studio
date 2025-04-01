async function addProduct(event) {
  event.preventDefault();

  const productForm = document.getElementById("product-form");
  if (!productForm) return; // Exit if form is not found

  const product = {
    name: document.getElementById("name").value.trim(),
    price: document.getElementById("price").value.trim(),
    image: document.getElementById("image").value.trim(),
    description: document.getElementById("description").value.trim(),
  };

  try {
    const response = await fetch("http://localhost:5000/add-product", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });

    if (!response.ok) throw new Error("Failed to add product");

    const result = await response.json();
    alert(result.message);

    // Display newly added product details
    displayProductDetails(product);

    // Clear form after successful submission
    productForm.reset();
  } catch (error) {
    alert("Error adding product: " + error.message);
  }
}

function displayProductDetails(product) {
  const productDetails = document.getElementById("product-details");
  if (!productDetails) return; // Exit if the details section is missing

  productDetails.innerHTML = `
      <div class="bg-white rounded-lg shadow-lg p-6 mt-6">
        <h2 class="text-2xl font-bold text-gray-800 text-center">${product.name}</h2>
        <img src="${product.image}" alt="${product.name}" class="mt-4 w-full h-80 object-cover rounded-lg shadow-md">
        <p class="mt-4 text-lg text-gray-700 text-justify">${product.description}</p>
        <p class="text-lg font-semibold text-gray-900 mt-2">Price: <span class="text-red-500">$${product.price}</span></p>
      </div>
    `;

  productDetails.classList.remove("hidden"); // Make the section visible
}

// Attach event listener after the DOM loads
document.addEventListener("DOMContentLoaded", () => {
  const productForm = document.getElementById("product-form");
  if (productForm) {
    productForm.addEventListener("submit", addProduct);
  }
});
