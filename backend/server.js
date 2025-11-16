const express = require('express');
const app = express();
const cors=require('cors')
const connectDB=require('./config/db')
const product=require('./models/product')

require('dotenv').config();


app.use(express.json());
app.use(cors());
// In-memory database




// Connect to MongoDB
connectDB();


// 🟢 GET all products
// 🟢 GET all products
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find(); // fetch all products from MongoDB
    res.json(products); // send them as JSON
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


// 🟡 POST add new product
// 🟡 POST add new product
app.post('/products', async (req, res) => {
  const { name, url, targetPrice, currentPrice } = req.body;

  if (!name || !url || !targetPrice) {
    return res.status(400).json({ message: "Name, URL, and targetPrice are required!" });
  }

  try {
    const newProduct = new Product({
      name,
      url,
      targetPrice,
      currentPrice: currentPrice || null,
      change: 0,   // start at 0% change
      history: []  // empty history
    });

    const savedProduct = await newProduct.save(); // save to MongoDB
    res.status(201).json(savedProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add product" });
  }
});


// 🔵 PUT update product (price or other fields)
app.put('/products/:id', async (req, res) => {
  const { id } = req.params;
  const { name, url, targetPrice, currentPrice } = req.body;

  try {
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Update simple fields
    if (name) product.name = name;
    if (url) product.url = url;
    if (targetPrice) product.targetPrice = targetPrice;

    // Update price & history
    if (currentPrice && currentPrice > 0) {
      const oldPrice = product.currentPrice || 0;
      const newPrice = Number(currentPrice);

      if (oldPrice > 0) {
        const percentChange = ((newPrice - oldPrice) / oldPrice) * 100;
        const roundedChange = Math.round(percentChange * 10) / 10;

        product.history.push({
          oldPrice,
          newPrice,
          change: roundedChange,
          date: new Date()
        });

        product.change = roundedChange;
      }

      product.currentPrice = newPrice;
    }

    const updatedProduct = await product.save();
    res.json(updatedProduct);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update product" });
  }
});


// 🔴 DELETE remove product
app.delete('/products/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete product" });
  }
});


// 🚀 Start server
app.listen(3000, () => {
  console.log("Price Watcher API running on http://localhost:3000");
});
