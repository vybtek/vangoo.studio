class SpecialSidebar extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
        <div class="w-64 bg-gray-800 text-white p-5 fixed h-full">
          <h2 class="text-2xl font-bold mb-5 cursor-pointer" onclick="window.location.href='dashboard.html'">
            <i class="fa-solid fa-house"></i> Dashboard
          </h2>
          <ul>
            <li class="mb-3 group">
              <div class="block p-2 bg-gray-700 rounded w-full">Product</div>
              <div class="hidden group-hover:block mt-2">
                <a href="add-product.html" class="block px-4 py-2 bg-gray-600 rounded mb-1 hover:bg-gray-500">
                  <i class="fa-solid fa-plus mr-2"></i>Add Product
                </a>
                <a href="product-list.html" class="block px-4 py-2 bg-gray-600 rounded hover:bg-gray-500">
                  <i class="fa-solid fa-eye mr-2"></i>View Products
                </a>
              </div>
            </li>
            <li class="mb-3 group">
              <div class="block p-2 bg-gray-700 rounded w-full">Project</div>
              <div class="hidden group-hover:block mt-2">
                <a href="add-project.html" class="block px-4 py-2 bg-gray-600 rounded mb-1 hover:bg-gray-500">
                  <i class="fa-solid fa-plus mr-2"></i>Add Project
                </a>
                <a href="project-list.html" class="block px-4 py-2 bg-gray-600 rounded hover:bg-gray-500">
                  <i class="fa-solid fa-eye mr-2"></i>View Projects
                </a>
              </div>
            </li>
             <li class="mb-3">
              <a href="add-blog.html" class="block p-2 bg-gray-700 rounded">Blog</a>
            </li>
            <li>
              <button onclick="logout()" class="w-full mt-4 bg-red-500 p-2 rounded hover:bg-red-600">
                <i class="fa-solid fa-right-from-bracket"></i> Logout
              </button>
            </li>
          </ul>
        </div>
  
        <button id="menu-toggle" class="p-4 text-white bg-gray-800 md:hidden absolute top-4 left-4 z-10">
          <i class="fa-solid fa-bars"></i>
        </button>
      `;
  
      this.setupMobileMenu();
    }
  
    setupMobileMenu() {
      this.querySelector("#menu-toggle")?.addEventListener("click", () => {
        this.querySelector(".w-64").classList.toggle("hidden");
      });
    }
  }
  
  // Register the custom element
  customElements.define("special-sidebar", SpecialSidebar);
  