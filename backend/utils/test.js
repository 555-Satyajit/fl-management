// Create a test file: testEmail.js
require('dotenv').config();
const { sendVerificationEmail } = require('./email');


async function testEmail() {
  try {
    await sendVerificationEmail('sriyamishra74@gmail.com', 'test-token');
    console.log('Test email sent successfully');
  } catch (error) {
    console.error('Test failed:', error);
  }
}

testEmail();