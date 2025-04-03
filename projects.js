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

  

// Function to fetch and display a single project's details
async function fetchProjectDetail() {
  const projectDetail = document.getElementById("project-detail");
  if (!projectDetail) return; // Exit if not on the project details page

  const params = new URLSearchParams(window.location.search);
  const projectId = params.get("id");

  if (!projectId) {
    projectDetail.innerHTML = "<p class='text-red-500 text-lg'>Project not found.</p>";
    return;
  }

  try {
    const response = await fetch(`http://localhost:5000/projects/${projectId}`);
    if (!response.ok) throw new Error("Failed to fetch project details");

    const project = await response.json();

    // Alternating left-right layout for additional images with descriptions
    const imagesWithContent = project.images && project.images.length > 0
      ? `
        <section class="max-w-6xl mx-auto mt-16">
          <h2 class="text-3xl font-bold text-center text-gray-800">More About This Project</h2>
          <div class="mt-8 space-y-12">
            ${project.images.map((img, index) => `
              <div class="flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8">
                <div class="w-full md:w-1/2 overflow-hidden rounded-lg shadow-md group">
                  <img src="${img.url}" alt="${img.caption}" class="w-full h-80 object-cover rounded-lg transition-transform duration-500">
                </div>
                <div class="w-full md:w-1/2 text-center md:text-left">
                  <h3 class="text-xl font-semibold text-gray-800">${img.caption || "Additional Image"}</h3>
                  <p class="text-gray-600 mt-2">${img.description || "No additional details provided."}</p>
                </div>
              </div>
            `).join("")}
          </div>
        </section>
      `
      : "";

    // Project Gallery Section (With Swiper Slider)
    const imagesSection = project.images && project.images.length > 0
      ? `
        <section class="max-w-6xl mx-auto mt-16">
          <h2 class="text-3xl font-bold text-center text-gray-800">Project Gallery</h2>
          <div class="swiper-container mt-8">
            <div class="swiper-wrapper">
              ${project.images.map((img) => `
                <div class="swiper-slide">
                  <div class="rounded-md shadow-lg overflow-hidden">
                    <img src="${img.url}" alt="${img.caption}" class="w-full h-72 object-cover rounded-md">
                  </div>
                </div>
              `).join("")}
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
    projectDetail.innerHTML = "<p class='text-red-500 text-lg'>Error loading project details.</p>";
  }
}





  
  // Run the appropriate function when the page loads
  document.addEventListener("DOMContentLoaded", () => {
    fetchProjects();
    fetchProjectDetail();
  });
  