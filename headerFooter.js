class SpecialHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
     <header>
  <nav class="bg-white text-gray-800">
    <div class="container mx-auto flex justify-between items-center py-2 px-6">
      <a href="index.html" class="flex items-center">
        <img src="./images/logo.png" alt="Logo" class="w-20 h-18" />
        <span class="text-xl font-bold text-gray-800">Vangoo.Studio</span>
      </a>

      <!-- Desktop Menu -->
      
       <!-- <li class="nav-link relative group">
          <button class="nav-link hover:opacity-80">Services ▾</button>
          <div class="absolute left-0 p-1 w-48 bg-white shadow-lg rounded-lg hidden group-hover:block z-50">
            <a href="software" class="nav-link dropdown-item block px-4 py-2 text-gray-800 hover:bg-gray-200">Service 1</a>
            <a href="design" class="nav-link dropdown-item block px-4 py-2 text-gray-800 hover:bg-gray-200">Service 2</a>
            <a href="marketing" class="nav-link dropdown-item block px-4 py-2 text-gray-800 hover:bg-gray-200">Service 3</a>
            <a href="techsupport" class="nav-link dropdown-item block px-4 py-2 text-gray-800 hover:bg-gray-200">Service 4</a>
            <a href="outsourcing" class="nav-link dropdown-item block px-4 py-2 text-gray-800 hover:bg-gray-200">Service 5</a>
            <a href="consultation" class="nav-link dropdown-item block px-4 py-2 text-gray-800 hover:bg-gray-200">Service 6</a>
          </div>
        </li> -->

       <!-- <li class="nav-link relative group">
          <button class="nav-link hover:opacity-80">Products ▾</button>
          <div class="absolute left-0 p-1 w-48 bg-white shadow-lg rounded-lg hidden group-hover:block z-50">
            <a href="software" class="nav-link dropdown-item block px-4 py-2 text-gray-800 hover:bg-gray-200">Products 1</a>
            <a href="design" class="nav-link dropdown-item block px-4 py-2 text-gray-800 hover:bg-gray-200">Products 2</a>
            <a href="marketing" class="nav-link dropdown-item block px-4 py-2 text-gray-800 hover:bg-gray-200">Products 3</a>
            <a href="techsupport" class="nav-link dropdown-item block px-4 py-2 text-gray-800 hover:bg-gray-200">Products 4</a>
            <a href="outsourcing" class="nav-link dropdown-item block px-4 py-2 text-gray-800 hover:bg-gray-200">Products 5</a>
            <a href="consultation" class="nav-link dropdown-item block px-4 py-2 text-gray-800 hover:bg-gray-200">Products 6</a>
          </div>
        </li> -->
        <ul id="nav-menu" class="hidden md:flex space-x-8">
        <li><a href="services.html" class="nav-link hover:opacity-80">Services</a></li>
         <li><a href="products.html" class="nav-link hover:opacity-80">Products</a></li>
        <li><a href="blog" class="nav-link hover:opacity-80">Projects</a></li>
        <li><a href="contact" class="nav-link hover:opacity-80">Contact</a></li>
      </ul>

      <!-- Mobile Menu Button -->
      <button id="menu-toggle" class="md:hidden text-gray-700 text-2xl">
        <i class="fas fa-bars"></i>
      </button>
    </div>

    <!-- Mobile Menu -->
    <div id="mobile-menu" class="hidden md:hidden flex-col bg-white shadow-lg p-4 space-y-3">
      <a href="about" class="nav-link block hover:bg-gray-200 text-black py-2">About</a>

      <div class="relative group">
        <button class="w-full hover:bg-gray-200 text-left flex justify-between items-center text-black py-2">
          Services <i class="fas fa-chevron-down"></i>
        </button>
        <div class="hidden group-hover:block bg-gray-100 p-2 space-y-2">
          <a href="software" class="nav-link block hover:bg-gray-200 text-black">Service 1</a>
          <a href="design" class="nav-link block hover:bg-gray-200 text-black">Service 2</a>
          <a href="marketing" class="nav-link block hover:bg-gray-200 text-black">Service 3</a>
          <a href="techsupport" class="nav-link block hover:bg-gray-200 text-black">Service 4</a>
          <a href="outsourcing" class="nav-link block hover:bg-gray-200 text-black">Service 5</a>
          <a href="consultation" class="nav-link block hover:bg-gray-200 text-black">Service 6</a>
        </div>
      </div>

      <a href="blog" class="nav-link block hover:bg-gray-200 text-black py-2">Blog</a>
      <a href="contact" class="nav-link block hover:bg-gray-200 text-black py-2">Contact</a>
    </div>
  </nav>
</header>
`;

    this.activateCurrentNavLink();
    this.setupMobileMenu();
  }

  activateCurrentNavLink() {
    const navLinks = document.querySelectorAll(
      "#mobile-menu .nav-link, .nav-link"
    );
    const currentPath =
      window.location.pathname.split("/").pop() || "index.html"; // Default to index.html if empty

    navLinks.forEach((link) => {
      const linkPath = link.getAttribute("href")
        ? link.getAttribute("href").split("/").pop()
        : null;

      if (linkPath === currentPath) {
        link.classList.add("active-link");
        link.classList.remove("inactive-link");

        // If the link is inside a dropdown, mark its parent button as active
        const parentDiv = link.closest(".group");
        if (parentDiv) {
          parentDiv.querySelector("button").classList.add("active-link");
        }
      } else {
        link.classList.add("inactive-link");
        link.classList.remove("active-link");
      }
    });
  }

  setupMobileMenu() {
    this.querySelector("#menu-toggle")?.addEventListener("click", () => {
      this.querySelector("#mobile-menu").classList.toggle("hidden");
    });
  }
}

class SpecialFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = ` 
      <footer class="bg-white py-6 px-6 md:px-16 border-t border-gray-800 ">
        <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Branding Section -->
          <div>
            <h2 class="text-2xl font-bold flex items-center gap-2">
              <img src="./images/logo.png" alt="Vangoo Logo" class="w-16 h-16" />Vangoo.Studio
            </h2>
            <p class="text-gray-600 mt-2">
              Your furniture partner.
            </p>
            <!--  <div class="flex space-x-3 mt-4">
              <a href="https://www.facebook.com/profile.php?id=61572940687826" target="_blank" class="p-2 bg-white rounded-full shadow-md hover:text-gray-400"><i class="fab fa-facebook-f"></i></a>
              <a href="https://x.com/vybtekIT" target="_blank" class="p-2 bg-white rounded-full shadow-md hover:text-gray-400"><i class="fa-brands fa-x-twitter"></i></a>
              <a href="https://www.linkedin.com/company/vybtek/" target="_blank" class="p-2 bg-white rounded-full shadow-md hover:text-gray-400"><i class="fab fa-linkedin"></i></a>
              <a href="https://www.instagram.com/vybtek_it/" target="_blank" class="p-2 bg-white rounded-full shadow-md hover:text-gray-400"><i class="fab fa-instagram"></i></a>
            </div> -->
          </div>

          <!-- IT Services Section -->
          <div>
            <h3 class="text-lg font-semibold">Products</h3>
            <ul class="mt-2 space-y-2 text-gray-600">
              <li><a href="design" class="footer-link">Products 1</a></li>
              <li><a href="marketing" class="footer-link">Products 2</a></li>
              <li><a href="techsupport" class="footer-link">Products 3</a></li>
              <li><a href="outsourcing" class="footer-link">Products 4</a></li>
              <li><a href="consultation" class="footer-link">Products 5</a></li>
            </ul>
          </div>

          <!-- Contact Info Section -->
          <div>
    <h3 class="text-lg font-semibold">Contact Info</h3>
    <ul class="mt-2 space-y-2 text-gray-600">
        <li>
            <a href="https://maps.app.goo.gl/bhadKHqrtPvyghnb7" target="_blank" class="flex items-center space-x-2">
                <i class="fas fa-map-marker-alt text-blue-500"></i>
                <span> Udaipur, Rajasthan 313001</span>
            </a>
        </li>
        <li>
            <a href="tel:+919116560069" class="flex items-center space-x-2">
                <i class="fas fa-phone text-blue-500"></i>
                <span>+91 0000000000</span>
            </a>
        </li>
        <li>
            <a href="mailto:vybtek@gmail.com" class="flex items-center space-x-2">
                <i class="fas fa-envelope text-blue-500"></i>
                <span>vangoo@gmail.com</span>
            </a>
        </li>
         <li><i class="fas fa-clock text-blue-500"></i> Opening Hours: 10:00 - 18:00</li>
    </ul>
 </div>

        </div>

        <!-- Footer Bottom -->
        <div class="mt-10 text-center text-gray-600 border-t pt-4">
          <p>&copy; 2025 All Rights Reserved.</p>
          <div class="mt-2 space-x-4">
            <a href="index" class="footer-link">Home</a>
            <a href="services" class="footer-link">Services</a>
            <a href="contact" class="footer-link">Contact Us</a>
            <a href="contact" class="footer-link">Projects</a>
          </div>
        </div>
      </footer>`

    this.activateCurrentFooterLink();
  }

  activateCurrentFooterLink() {
    const footerLinks = this.querySelectorAll(".footer-link");
    const currentPath =
      window.location.pathname.split("/").pop() || "index.html"; // Default to index.html if empty

    footerLinks.forEach((link) => {
      const linkPath = link.getAttribute("href")
        ? link.getAttribute("href").split("/").pop()
        : null;

      if (linkPath === currentPath) {
        link.classList.add("active-footer-link");
        link.classList.remove("inactive-footer-link");
      } else {
        link.classList.add("inactive-footer-link");
        link.classList.remove("active-footer-link");
      }
    });
  }
}

customElements.define("special-header", SpecialHeader);
customElements.define("special-footer", SpecialFooter);
