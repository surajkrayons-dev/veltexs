import Contact from '../models/Contact.js';
import { sendContactEmail } from '../utils/sendEmail.js';

// @desc    Submit a contact form
export const submitContactForm = async (req, res) => {
  try {
    const { name, email, service, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please fill in all required fields (Name, Email, Message).'
      });
    }

    // 1. ORIGINAL FUNCTIONALITY: Save to Database
    const newSubmission = await Contact.create({ name, email, service, message });

    // 2. EXTRA FUNCTIONALITY: Send email notification
    // Ab hum isko 'await' karenge. Agar mail fail hua, to hum error throw karenge.
    const emailSent = await sendContactEmail(name, email, service, message);

    if (!emailSent) {
      // Agar email send nahi hua (due to wrong credentials), to database se bhi entry delete kar do
      // taaki data mismatch na ho aur user ko error show ho.
      await newSubmission.destroy();
      return res.status(500).json({
        success: false,
        message: 'Could not send email notification. Please check server email configuration.'
      });
    }

    return res.status(201).json({
      success: true,
      message: 'Thank you! Your inquiry has been received successfully.',
      data: newSubmission
    });

  } catch (error) {
    console.error('Submission Error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.'
    });
  }
};

// @desc    Get all submissions
export const getAllSubmissions = async (req, res) => {
  try {
    const submissions = await Contact.findAll({
      order: [['created_at', 'DESC']]
    });

    return res.status(200).json({
      success: true,
      count: submissions.length,
      data: submissions
    });

  } catch (error) {
    console.error('Fetch Error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Could not retrieve data at this time.'
    });
  }
};
