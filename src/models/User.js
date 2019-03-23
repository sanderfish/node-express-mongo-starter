const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: 'Please supply an email address',
    },
    name: {
      type: String,
      required: 'Please supply a name',
    },
    password: {
      type: String,
      required: 'Please supply a password',
    },
    active: {
      type: Boolean,
      default: false,
    },
    activationToken: String,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    role: {
      type: String,
      default: 'default',
    },
    lastActivity: {
      type: Date,
      default: Date.now,
    },
    initialReferrer: {
      type: String,
    },
    referrer: {
      type: String,
    },
    sessionCount: {
      type: Number,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('User', userSchema);
