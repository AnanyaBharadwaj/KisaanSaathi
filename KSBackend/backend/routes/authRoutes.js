const express = require('express');
const User = require('../models/User');
const crypto = require('crypto');
const sendgrid = require('@sendgrid/mail');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const router = express.Router();

// SendGrid Setup
sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

// Function to send the verification email
const sendVerificationEmail = (email, verificationCode) => {
  const msg = {
    to: email, // The recipient email address
    from: 'teamkisaansaathi@gmail.com', // Your verified email address from SendGrid
    subject: 'Email Verification',
    text: `Please use the following verification code to verify your email: ${verificationCode}`,
    html: `<strong>Please use the following verification code to verify your email: ${verificationCode}</strong>`,
  };

  sendgrid
    .send(msg)
    .then(() => {
      console.log('Verification email sent successfully');
    })
    .catch((error) => {
      console.error('Error sending email:', error);
    });
};

// Signup Route
router.post('/signup', async (req, res) => {
  const { name, email, employeeId, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Create a random verification code
    const verificationCode = crypto.randomBytes(3).toString('hex'); // Generate 6 characters code

    const newUser = new User({
      name,
      email,
      employeeId,
      password,
      verificationCode,
    });

    // Save the new user to the database
    await newUser.save();

    // Send the verification email
    sendVerificationEmail(email, verificationCode);

    res.status(201).json({ message: 'Signup successful! Please check your email for verification.' });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Server error during signup.' });
  }
});

// Verification Code Route
router.post('/verify-code', async (req, res) => {
  const { email, code } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Verify the code
    if (user.verificationCode === code) {
      user.isVerified = true;
      user.verificationCode = undefined; // Remove the code after successful verification
      await user.save();

      res.status(200).json({ message: 'Email verified successfully!' });
    } else {
      res.status(400).json({ message: 'Invalid verification code' });
    }
  } catch (error) {
    console.error('Error during verification:', error);
    res.status(500).json({ message: 'Server error during verification.' });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    if (!await user.matchPassword(password)) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    if (!user.isVerified) {
      return res.status(400).json({ message: 'Please verify your email first' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Login successful!', token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server error during login.' });
  }
});

module.exports = router;
