import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

console.log('Testing connection for:', process.env.EMAIL_USER);

transporter.verify(function (error, success) {
  if (error) {
    console.error("❌ NODEMAILER ERROR:", error.message);
  } else {
    console.log("✅ SUCCESS: Server is ready to take our messages");
  }
});
