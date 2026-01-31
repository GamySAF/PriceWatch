const cron = require('node-cron');
const Product = require('../models/product');
const { scrapePrice } = require('../services/scraper');
const { sendPriceAlert } = require('../services/emailService'); // Import email service

const initPriceTracker = () => {
  cron.schedule('*/30 * * * *', async () => {
    console.log('--- 🤖 Price Check Started ---');
    try {
      // Use .populate('owner') so we have access to the user's email address
      const products = await Product.find().populate('owner');
      
      for (const product of products) {
        const newPrice = await scrapePrice(product.url);

        if (newPrice) {
          const oldPrice = product.currentPrice;

          // Logic: If price hits target, SEND EMAIL
          if (newPrice <= product.targetPrice) {
            // Check if product has an owner and the owner has an email
            if (product.owner && product.owner.email) {
              await sendPriceAlert(
                product.owner.email, 
                product.name, 
                newPrice, 
                oldPrice, 
                product.url
              );
              console.log(`📧 Email alert sent to ${product.owner.email} for ${product.name}`);
            } else {
              console.log(`⚠️ No email found for owner of ${product.name}`);
            }
          }

          product.currentPrice = newPrice;
          
          // Add to history array if you updated your model
          if (product.priceHistory) {
             product.priceHistory.push({ price: newPrice, date: new Date() });
          }

          await product.save();
        }
      }
    } catch (err) {
      console.error("Cron Error:", err);
    }
    console.log('--- ✅ Price Check Finished ---');
  });
};

module.exports = initPriceTracker;