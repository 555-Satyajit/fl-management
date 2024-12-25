// utils/email.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',  // Changed to use Gmail service directly
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD
  }
});

exports.sendVerificationEmail = async (email, token) => {
  const verificationURL = `${process.env.FRONTEND_URL}/verify-email/${token}`;
  
  const mailOptions = {
    from: process.env.EMAIL_USERNAME, // Changed to use username directly
    to: email,
    subject: 'Email Verification',
    html: `
      <h1>Verify your email</h1>
      <p>Please click the link below to verify your email:</p>
      <a href="${verificationURL}">${verificationURL}</a>
    `
  };

  try {
    console.log('Attempting to send email...'); // Debug log
    console.log('Mail options:', mailOptions); // Debug log
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info); // Debug log
    return info;
  } catch (error) {
    console.error('Detailed email error:', error); // Detailed error log
    throw new Error(`Email sending failed: ${error.message}`);
  }
};