const express = require('express');
const app = express();
const cors=require('cors')
const connectDB=require('./config/db')

require('dotenv').config();


app.use(express.json());
app.use(cors());
// In-memory database
let products = [];



// Connect to MongoDB
connectDB();


// 🟢 GET all products
app.get('/products', (req, res) => {
  res.json(products); // send back all products as JSON
});


// 🟡 POST add new product
app.post('/products', (req, res) => {
  const { name, url, targetPrice, currentPrice } = req.body;

  if (!name || !url || !targetPrice) {
    return res.status(400).json({ message: "Name, URL, and targetPrice are required!" });
  }

const newProduct = {
  id: products.length + 1,
  name,
  url,
  targetPrice,
  currentPrice: currentPrice || null,
  change: 0,       // start at 0% change
  history: []      // always start with empty history
};


  products.push(newProduct);
  res.status(201).json(newProduct);
});


// 🔵 PUT update product (like when price changes)
app.put('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  // Update simple fields
  if (req.body.name) product.name = req.body.name;
  if (req.body.url) product.url = req.body.url;
  if (req.body.targetPrice) product.targetPrice = req.body.targetPrice;

  // PRICE UPDATE LOGIC (fix)
  const newPrice = Number(req.body.currentPrice);
  const oldPrice = Number(product.currentPrice);

  if (!isNaN(newPrice) && newPrice > 0) {
    // only update history if old price exists
    if (oldPrice && oldPrice > 0) {
      const percentChange = ((newPrice - oldPrice) / oldPrice) * 100;
      const rounded = Math.round(percentChange * 10) / 10;

      const historyEntry = {
        oldPrice,
        newPrice,
        change: rounded,
        date: new Date().toLocaleString(),
      };

      // ensure history exists
      if (!product.history) product.history = [];

      product.history.push(historyEntry);
      product.change = rounded;
    }

    // Finally update current price
    product.currentPrice = newPrice;
  }

  res.json(product);
});

// 🔴 DELETE remove product
app.delete('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);

  if (!product) return res.status(404).json({ message: "Product not found" });

  products = products.filter(p => p.id !== id);
  res.json({ message: "Product deleted successfully" });
});

// 🚀 Start server
app.listen(3000, () => {
  console.log("Price Watcher API running on http://localhost:3000");
});
