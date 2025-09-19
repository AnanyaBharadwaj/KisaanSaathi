const express = require('express');
const bodyParser = require('body-parser');
const speakeasy = require('speakeasy');
const app = express();
const port = 5000;

// Example in-memory store for user secrets (replace with DB in production)
const users = {
  user@example.com: {
    password: 'password123',
    totpSecret: 'JBSWY3DPEHPK3PXP', // Store this secret in your database during registration
  },
};

app.use(bodyParser.json());

app.post('/api/login', (req, res) => {
  const { email, password, totp } = req.body;
  
  if (!users[email]) {
    return res.status(400).json({ success: false, message: 'User not found!' });
  }

  const user = users[email];

  // Validate password (this should be securely hashed in production)
  if (user.password !== password) {
    return res.status(400).json({ success: false, message: 'Invalid credentials!' });
  }

  // Verify TOTP (Google Authenticator code)
  const verified = speakeasy.totp.verify({
    secret: user.totpSecret,
    encoding: 'base32',
    token: totp,
  });

  if (!verified) {
    return res.status(400).json({ success: false, message: 'Invalid 6-digit code!' });
  }

  // If all validations pass
  return res.json({ success: true, message: 'Login successful!' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
