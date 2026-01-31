require('dotenv').config();
const { sendPriceAlert } = require('./services/emailService');

async function test() {
  console.log("📤 Attempting to send test email...");
  const result = await sendPriceAlert(
    process.env.EMAIL_USER, // Send to yourself
    "Test Product",
    "99.99",
    "150.00",
    "https://example.com"
  );

  if (result.success) {
    console.log("✅ Success! Check your inbox (and Spam folder).");
  } else {
    console.log("❌ Failed! Error:", result.error);
  }
}

test();