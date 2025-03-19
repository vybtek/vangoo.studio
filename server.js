const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

// GET: Fetch Products
app.get("/products", (req, res) => {
  fs.readFile("products.json", "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Error reading file" });
    }
    res.json(JSON.parse(data));
  });
});

// POST: Add New Product
app.post("/add-product", (req, res) => {
  const newProduct = req.body;

  fs.readFile("products.json", "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Error reading file" });
    }

    let products = JSON.parse(data);
    newProduct.id = products.length + 1;
    products.push(newProduct);

    fs.writeFile("products.json", JSON.stringify(products, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: "Error writing file" });
      }
      res.json({ message: "Product added successfully!", product: newProduct });
    });
  });
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
