async function addProduct(event) {
  event.preventDefault();

  const productForm = document.getElementById("product-form");
  if (!productForm) return; // Exit if form is not found

  const product = {
    name: document.getElementById("name").value.trim(),
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

    // Clear form after successful submission
    productForm.reset();
  } catch (error) {
    alert("Error adding product: " + error.message);
  }
}


// Attach event listener after the DOM loads
document.addEventListener("DOMContentLoaded", () => {
  const productForm = document.getElementById("product-form");
  if (productForm) {
    productForm.addEventListener("submit", addProduct);
  }
});
