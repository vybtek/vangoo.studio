const express = require("express");
const fs = require("fs");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(express.json());
app.use(cors());

const PRODUCTS_FILE = "products.json";
const PROJECTS_FILE = "projects.json";

// Helper function to read JSON files
function readFile(file, callback) {
  fs.readFile(file, "utf8", (err, data) => {
    if (err) {
      callback(err, null);
      return;
    }
    callback(null, JSON.parse(data || "[]"));
  });
}

// GET: Fetch All Products
app.get("/products", (req, res) => {
  readFile(PRODUCTS_FILE, (err, products) => {
    if (err)
      return res.status(500).json({ error: "Error reading products file" });
    res.json(products);
  });
});

// GET: Fetch Single Product by ID
app.get("/products/:id", (req, res) => {
  readFile(PRODUCTS_FILE, (err, products) => {
    if (err)
      return res.status(500).json({ error: "Error reading products file" });
    const product = products.find((p) => p.id === req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  });
});

// POST: Add New Product
app.post("/add-product", (req, res) => {
  const { name, image, description, types } = req.body;

  const newProduct = {
    id: uuidv4(),
    name,
    image,
    description,
    types: types || [],
  };

  readFile(PRODUCTS_FILE, (err, products) => {
    if (err) return res.status(500).json({ error: "Error reading file" });

    products.push(newProduct);

    fs.writeFile(PRODUCTS_FILE, JSON.stringify(products, null, 2), (err) => {
      if (err) return res.status(500).json({ error: "Error saving product" });

      res.status(201).json(newProduct);
    });
  });
});

// DELETE: Remove Product by ID
app.delete("/products/:id", (req, res) => {
  readFile(PRODUCTS_FILE, (err, products) => {
    if (err)
      return res.status(500).json({ error: "Error reading products file" });
    const updatedProducts = products.filter((p) => p.id !== req.params.id);
    if (updatedProducts.length === products.length)
      return res.status(404).json({ error: "Product not found" });
    fs.writeFile(
      PRODUCTS_FILE,
      JSON.stringify(updatedProducts, null, 2),
      (err) => {
        if (err)
          return res
            .status(500)
            .json({ error: "Error updating products file" });
        res.json({ message: "Product deleted successfully!" });
      }
    );
  });
});

// --- PROJECTS ENDPOINTS ---

// GET: Fetch All Projects
app.get("/projects", (req, res) => {
  readFile(PROJECTS_FILE, (err, projects) => {
    if (err)
      return res.status(500).json({ error: "Error reading projects file" });
    res.json(projects);
  });
});

// GET: Fetch Single Project by ID
app.get("/projects/:id", (req, res) => {
  readFile(PROJECTS_FILE, (err, projects) => {
    if (err)
      return res.status(500).json({ error: "Error reading projects file" });
    const project = projects.find((p) => p.id === req.params.id);
    if (!project) return res.status(404).json({ error: "Project not found" });
    res.json(project);
  });
});

// Add new project
app.post("/add-project", (req, res) => {
  const { title, image, description, images, additionalContent } = req.body;

  // Validate required fields
  if (!title || !image || !description) {
    return res
      .status(400)
      .json({ error: "Title, image, and description are required." });
  }

  const newProject = {
    id: uuidv4(),
    title,
    image,
    description,
    images: images || [], // optional array of detailed image objects
    additionalContent: additionalContent || "",
  };

  // Read existing projects
  fs.readFile(PROJECTS_FILE, "utf-8", (err, data) => {
    if (err) return res.status(500).json({ error: "Error reading file" });

    let projects = [];
    try {
      projects = JSON.parse(data);
    } catch (parseErr) {
      return res.status(500).json({ error: "Error parsing existing projects" });
    }

    projects.push(newProject);

    // Save updated projects
    fs.writeFile(PROJECTS_FILE, JSON.stringify(projects, null, 2), (err) => {
      if (err) return res.status(500).json({ error: "Error saving project" });

      res
        .status(201)
        .json({ message: "Project added successfully", project: newProject });
    });
  });
});

// DELETE: Remove Project by ID
app.delete("/projects/:id", (req, res) => {
  readFile(PROJECTS_FILE, (err, projects) => {
    if (err)
      return res.status(500).json({ error: "Error reading projects file" });
    const updatedProjects = projects.filter((p) => p.id !== req.params.id);
    if (updatedProjects.length === projects.length)
      return res.status(404).json({ error: "Project not found" });
    fs.writeFile(
      PROJECTS_FILE,
      JSON.stringify(updatedProjects, null, 2),
      (err) => {
        if (err)
          return res
            .status(500)
            .json({ error: "Error updating projects file" });
        res.json({ message: "Project deleted successfully!" });
      }
    );
  });
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
