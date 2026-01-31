const nodemailer = require('nodemailer');

const sendPriceAlert = async (toEmail, productName, newPrice, oldPrice, url) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // Use SSL
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, 
    },
  });

  const mailOptions = {
    from: `"Price Watcher" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: `🎯 Price Drop: ${productName}`,
    html: `<h1>Price Drop!</h1><p>${productName} is now $${newPrice}</p><a href="${url}">Link</a>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return { success: true, info };
  } catch (error) {
    // This will now actually log the error message so we can see it
    return { success: false, error: error.message }; 
  }
};

module.exports = { sendPriceAlert };