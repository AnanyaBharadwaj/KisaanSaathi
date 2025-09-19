const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  employeeId: { type: String, required: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false }, // To track if the email is verified
  verificationCode: { type: String }, // To store the verification code
  totpSecret: { type: String }, // TOTP secret for 2FA
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12); // Hash password before saving
  }
  next();
});

// Method to compare password (for login)
userSchema.methods.matchPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
