// Helper to get query parameters
function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  }
  
  // Function to fetch and display all blogs
  async function fetchBlogs() {
    const blogGrid = document.getElementById("blog-grid");
    if (!blogGrid) return;
  
    try {
      const response = await fetch("http://localhost:5000/blogs");
      if (!response.ok) throw new Error("Failed to fetch blogs");
  
      const blogs = await response.json();
      blogGrid.innerHTML = "";
  
      blogs.forEach((blog) => {
        const blogCard = document.createElement("div");
        blogCard.classList.add("bg-white", "rounded-lg", "overflow-hidden");
  
        blogCard.innerHTML = `
          <img src="${blog.image}" alt="${blog.title}" class="w-full h-80 object-cover">
          <div class="p-4">
            <div class="text-gray-500 text-sm mb-2">
              <span class="text-yellow-500"> | ${blog.author}</span>
            </div>
            <h3 class="text-xl font-semibold text-gray-800 mb-2">${blog.title}</h3>
            <p class="text-gray-600 text-sm mb-4">${blog.content.substring(0, 150)}...</p>
            <a href="blog-detail.html?id=${blog.id}" class="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline">Read More...</a>
          </div>
        `;
  
        blogGrid.appendChild(blogCard);
      });
    } catch (error) {
      blogGrid.innerHTML = `<p class="text-red-500">Error loading blogs: ${error.message}</p>`;
    }
  }
  
  // Function to fetch and display a single blog
  async function fetchBlogDetail() {
    const blogId = getQueryParam("id");
    const detailContainer = document.getElementById("blog-detail");
  
    if (!blogId || !detailContainer) return;
  
    try {
      const response = await fetch(`http://localhost:5000/blogs/${blogId}`);
      if (!response.ok) throw new Error("Blog not found");
  
      const blog = await response.json();
  
      detailContainer.innerHTML = `
        <div class="text-gray-500 text-sm mb-2">
          <span class="text-yellow-500"> | ${blog.author}</span>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 mb-4">${blog.title}</h1>
        <div class="mb-6">
          <img src="${blog.image}" alt="${blog.title}" class="w-full rounded-lg shadow-md" />
        </div>
        <p class="text-gray-700 leading-relaxed text-md whitespace-pre-line">
          ${blog.content}
        </p>
      `;
    } catch (error) {
      detailContainer.innerHTML = `<p class="text-red-500">Error loading blog: ${error.message}</p>`;
    }
  }
  
  // Auto-run appropriate function
  window.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("blog-grid")) {
      fetchBlogs();
    } else if (document.getElementById("blog-detail")) {
      fetchBlogDetail();
    }
  });
  