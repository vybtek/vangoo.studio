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
        projectCard.classList.add("text-center");
  
        projectCard.innerHTML = `
        <div class="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl">
          <img src="${project.image}" alt="${project.title}" class="w-full h-60 object-cover">
          <div class="p-4">
            <h3 class="text-xl font-bold text-gray-800">${project.title}</h3>
            <a href="project-detail.html?id=${project.id}" 
               class="block text-center bg-blue-500 text-white font-semibold px-5 py-2 rounded-lg mt-4 transition duration-300 hover:bg-blue-600">
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
  
      projectDetail.innerHTML = `
      <div class="max-w-3xl mx-auto bg-white overflow-hidden p-6">
        <h1 class="text-4xl font-bold text-gray-900 text-center">${project.title}</h1>
        
        <div class="mt-6">
          <img src="${project.image}" class="w-full h-96 object-cover rounded-lg transition-transform duration-300">
        </div>
        
        <p class="mt-6 text-lg text-gray-700 leading-relaxed text-justify">${project.description}</p>
    
        <div class="flex justify-center mt-6">
          <a href="projects.html" 
             class="bg-gray-800 text-white font-semibold px-6 py-3 rounded-lg transition duration-300 hover:bg-gray-900 hover:shadow-md">
            ← Back to Projects
          </a>
        </div>
      </div>
    `;
    
    } catch (error) {
      projectDetail.innerHTML = "<p class='text-red-500 text-lg'>Error loading project details.</p>";
    }
  }
  
  // Run the appropriate function when the page loads
  document.addEventListener("DOMContentLoaded", () => {
    fetchProjects();
    fetchProjectDetail();
  });
  