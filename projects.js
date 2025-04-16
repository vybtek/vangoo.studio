// Function to fetch and display all projects
async function fetchProjects() {
  const projectGrid = document.getElementById("project-grid");
  if (!projectGrid) return; // Exit if not on the projects page

  try {
    const response = await fetch("http://localhost:5000/projects");
    if (!response.ok) throw new Error("Failed to fetch projects");

    const projects = await response.json();
    projectGrid.innerHTML = ""; // Clear previous content

    projects.forEach((project) => {
      const projectCard = document.createElement("div");
      projectCard.classList.add("relative", "p-4");

      projectCard.innerHTML = `
          <div class="bg-gray-100 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 p-6">
            <img src="${project.image}" alt="${project.title}" class="w-full h-60 object-cover rounded-lg">
            <div class="mt-4">
              <h3 class="text-xl font-semibold text-gray-900">${project.title}</h3>
              <a href="project-detail.html?id=${project.id}" 
                 class="block w-full text-center bg-gray-900 text-white font-medium px-5 py-3 rounded-lg mt-5 transition-all duration-300 hover:bg-gray-800">
                View Details
              </a>
            </div>
          </div>
        `;

      projectGrid.appendChild(projectCard);
    });
  } catch (error) {
    console.error(error);
  }
}

async function fetchProjects(containerId = "project-grid", view = "default") {
  const projectGrid = document.getElementById(containerId);
  if (!projectGrid) return;

  try {
    const response = await fetch("http://localhost:5000/projects");
    if (!response.ok) throw new Error("Failed to fetch projects");

    const projects = await response.json();
    projectGrid.innerHTML = "";

    projects.forEach((project) => {
      if (view === "default" && !project.active) return;

      const projectCard = document.createElement("div");
      projectCard.classList.add("text-center");

      if (view === "dashboard") {
        const isActive = project.active;
        projectCard.innerHTML = `
          <div class="bg-white p-4 rounded-lg shadow flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <img src="${project.image}" alt="${
          project.title
        }" class="w-16 h-16 object-cover rounded" />
              <div class="text-left">
                <h4 class="font-semibold text-gray-800">${project.title}</h4>
                <p class="text-sm text-gray-500 truncate">${
                  project.description?.slice(0, 60) || ""
                }</p>
              </div>
            </div>
            <div class="flex items-center space-x-2">
              <a href="update-project.html?id=${
                project.id
              }" class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm">Edit</a>
              <button onclick="deleteProject('${
                project.id
              }')" class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm">Delete</button>
              <button onclick="toggleProjectActive('${
                project.id
              }', ${isActive})" class="${
          isActive
            ? "bg-yellow-500 hover:bg-yellow-600"
            : "bg-green-500 hover:bg-green-600"
        } text-white px-3 py-1 rounded text-sm">
                ${isActive ? "Deactivate" : "Activate"}
              </button>
              <a href="project-detail.html?id=${
                project.id
              }" class="bg-gray-200 text-black px-3 py-1 rounded text-sm">View</a>
            </div>
          </div>
        `;
      } else {
        projectCard.innerHTML = `
          <a href="project-detail.html?id=${project.id}" class="block">
  <div class="bg-gray-100 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 p-6">
    <img src="${project.image}" alt="${project.title}" class="w-full h-60 object-cover rounded-lg">
    <div class="mt-4">
      <h3 class="text-xl font-semibold text-gray-900">${project.title}</h3>
      <div class="mt-5 text-center">
        <span class="block w-full text-center bg-gray-900 text-white font-medium px-5 py-3 rounded-lg transition-all duration-300 hover:bg-gray-800">
          View Details
        </span>
      </div>
    </div>
  </div>
</a>
        `;
      }

      projectGrid.appendChild(projectCard);
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
  }
}

// Function to fetch and display a single project's details
async function fetchProjectDetail() {
  const projectDetail = document.getElementById("project-detail");
  if (!projectDetail) return; // Exit if not on the project details page

  const params = new URLSearchParams(window.location.search);
  const projectId = params.get("id");

  if (!projectId) {
    projectDetail.innerHTML =
      "<p class='text-red-500 text-lg'>Project not found.</p>";
    return;
  }

  try {
    const response = await fetch(`http://localhost:5000/projects/${projectId}`);
    if (!response.ok) throw new Error("Failed to fetch project details");

    const project = await response.json();

    // Alternating left-right layout for additional images with descriptions
    const imagesWithContent =
      project.images && project.images.length > 0
        ? `
        <section class="max-w-6xl mx-auto mt-16">
          <h2 class="text-3xl font-bold text-center text-gray-800">More About This Project</h2>
          <div class="mt-8 space-y-12">
            ${project.images
              .map(
                (img, index) => `
              <div class="flex flex-col md:flex-row ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } items-center gap-8">
                <div class="w-full md:w-1/2 overflow-hidden rounded-lg shadow-md group">
                  <img src="${img.url}" alt="${
                  img.caption
                }" class="w-full h-80 object-cover rounded-lg transition-transform duration-500">
                </div>
                <div class="w-full md:w-1/2 text-center md:text-left">
                  <h3 class="text-xl font-semibold text-gray-800">${
                    img.caption || "Additional Image"
                  }</h3>
                  <p class="text-gray-600 mt-2">${
                    img.description || "No additional details provided."
                  }</p>
                </div>
              </div>
            `
              )
              .join("")}
          </div>
        </section>
      `
        : "";

    // Project Gallery Section (With Swiper Slider)
    const imagesSection =
      project.images && project.images.length > 0
        ? `
        <section class="max-w-6xl mx-auto mt-16">
          <h2 class="text-3xl font-bold text-center text-gray-800">Project Gallery</h2>
          <div class="swiper-container mt-8">
            <div class="swiper-wrapper">
              ${project.images
                .map(
                  (img) => `
                <div class="swiper-slide">
                  <div class="rounded-md shadow-lg overflow-hidden">
                    <img src="${img.url}" alt="${img.caption}" class="w-full h-72 object-cover rounded-md">
                  </div>
                </div>
              `
                )
                .join("")}
            </div>         
            <!-- Swiper Pagination -->
            <div class="swiper-pagination"></div>
          </div>
        </section>
      `
        : "";

    projectDetail.innerHTML = `
      <div class="max-w-full w-full mx-auto bg-white overflow-hidden">
        
        <!-- Hero Section (Banner) -->
        <section class="relative w-full h-[450px] md:h-[600px] overflow-hidden flex items-center justify-center">
          <img src="${project.image}" class="absolute inset-0 w-full h-full object-cover brightness-75 rounded-md">
          <div class="relative z-10 text-center px-4">
            <h1 class="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg">${project.title}</h1>
          </div>
        </section>

        <!-- Project Overview -->
        <section class="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-12 mt-[-50px] z-10 relative text-center md:text-left">
          <h2 class="text-4xl font-bold">Project Overview</h2>
          <p class="mt-6 text-lg leading-relaxed opacity-90">${project.description}</p>
        </section>

        <!-- Alternating Image and Description Section -->
        ${imagesWithContent}

        <!-- Project Gallery Section (with slider) -->
        ${imagesSection}

        <!-- Back Button -->
        <div class="flex justify-center mt-8">
          <a href="projects.html" 
             class="bg-gray-800 text-white font-semibold px-6 py-3 rounded-lg transition duration-300 hover:bg-gray-900 hover:shadow-md">
            ← Back to Projects
          </a>
        </div>
      </div>
    `;

    // Initialize Swiper after content is loaded
    setTimeout(() => {
      if (document.querySelector(".swiper-container")) {
        new Swiper(".swiper-container", {
          loop: true,
          autoplay: {
            delay: 3000,
            disableOnInteraction: false,
          },
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
          },
          slidesPerView: 1, // Default for small screens
          spaceBetween: 15,
          breakpoints: {
            640: { slidesPerView: 1, spaceBetween: 20 }, // Phones
            768: { slidesPerView: 2, spaceBetween: 25 }, // Tablets
            1024: { slidesPerView: 3, spaceBetween: 30 }, // Desktop
          },
        });
      }
    }, 500);
  } catch (error) {
    projectDetail.innerHTML =
      "<p class='text-red-500 text-lg'>Error loading project details.</p>";
  }
}


async function deleteProject(id) {
  if (confirm("Are you sure you want to delete this project?")) {
    try {
      const response = await fetch(`http://localhost:5000/projects/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete project");

      // Option 1: Refresh view
      location.reload();

      // Option 2 (better): Re-fetch projects without reload
      // await fetchProjects("project-grid", "dashboard");
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  }
}


// async function toggleActive(productId, currentStatus) {
//   try {
//     const response = await fetch(`http://localhost:5000/products/${productId}`, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ active: !currentStatus }),
//     });

//     if (!response.ok) throw new Error("Failed to update product status");

//     // Refresh dashboard list
//     fetchProducts("dashboard-product-list", "dashboard");
//   } catch (error) {
//     console.error("Error toggling product active status:", error);
//     alert("Failed to update product status.");
//   }
// }

// Fetch product by ID to populate the update form
// async function fetchProductForUpdate() {
//   const params = new URLSearchParams(window.location.search);
//   const productId = params.get("id");

//   if (!productId) {
//     alert("Product not found!");
//     return;
//   }

//   try {
//     const response = await fetch(`http://localhost:5000/products/${productId}`);
//     if (!response.ok) throw new Error("Failed to fetch product details");

//     const product = await response.json();
//     populateForm(product);
//   } catch (error) {
//     console.error("Error fetching product:", error);
//     alert("Failed to load product data.");
//   }
// }

// Populate the update form with product data
// function populateForm(product) {
//   document.getElementById("product-id").value = product.id;
//   document.getElementById("name").value = product.name;
//   document.getElementById("image").value = product.image;
//   document.getElementById("description").value = product.description;

//   // Populate the product types (if any)
//   const typesContainer = document.getElementById("types-container");
//   typesContainer.innerHTML = ""; // Clear previous types

//   if (Array.isArray(product.types) && product.types.length > 0) {
//     product.types.forEach((type, index) => {
//       const typeDiv = document.createElement("div");
//       typeDiv.classList.add("space-y-2");

//       typeDiv.innerHTML = `
//         <h4 class="font-semibold">Product Type ${index + 1}</h4>
//         <div>
//           <label for="type-name-${index}" class="block">Type Name</label>
//           <input type="text" id="type-name-${index}" class="w-full p-2 border rounded" value="${type.name}">
//         </div>
//         <div>
//           <label for="type-description-${index}" class="block">Type Description</label>
//           <textarea id="type-description-${index}" class="w-full p-2 border rounded">${type.description}</textarea>
//         </div>
//         <div>
//           <label for="type-price-${index}" class="block">Type Price</label>
//           <input type="number" id="type-price-${index}" class="w-full p-2 border rounded" value="${type.price}">
//         </div>
//         <div>
//           <label for="type-image-${index}" class="block">Type Image URL</label>
//           <input type="url" id="type-image-${index}" class="w-full p-2 border rounded" value="${type.image}">
//         </div>
//       `;

//       typesContainer.appendChild(typeDiv);
//     });
//   }
// }

// Handle form submission to update the product
// document.getElementById("update-product-form").addEventListener("submit", async (e) => {
//   e.preventDefault();

//   const productId = document.getElementById("product-id").value;
//   const name = document.getElementById("name").value;
//   const image = document.getElementById("image").value;
//   const description = document.getElementById("description").value;

 
//   const types = Array.from(document.querySelectorAll("#types-container > div")).map((typeDiv, index) => {
//     return {
//       name: typeDiv.querySelector(`#type-name-${index}`).value,
//       description: typeDiv.querySelector(`#type-description-${index}`).value,
//       price: typeDiv.querySelector(`#type-price-${index}`).value,
//       image: typeDiv.querySelector(`#type-image-${index}`).value,
//     };
//   });

//   const updatedProduct = {
//     name,
//     image,
//     description,
//     types,
//   };

//   try {
//     const response = await fetch(`http://localhost:5000/products/${productId}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(updatedProduct),
//     });

//     if (!response.ok) throw new Error("Failed to update product");

//     alert("Product updated successfully!");
//     window.location.href = "dashboard.html";
//   } catch (error) {
//     console.error("Error updating product:", error);
//     alert("Failed to update product.");
//   }
// });

// Fetch the product data when the page loads
// document.addEventListener("DOMContentLoaded", () => {
//   fetchProductForUpdate();
// });


// Run the appropriate function when the page loads


document.addEventListener("DOMContentLoaded", () => {
  fetchProjects();
  fetchProjectDetail();
});



