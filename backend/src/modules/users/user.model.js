const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name!'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    index: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false,
  },
  role: {
    type: String,
    enum: ['STUDENT', 'STAFF', 'ADMIN'],
    default: 'STUDENT',
    index: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  gender: {
    type: String,
    enum: ['MALE', 'FEMALE', 'OTHER'],
  },
  hostelId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Hostel',
  },
  isActive: {
    type: Boolean,
    default: true,
    select: false,
  }
}, {
  timestamps: true,
});

// Password hashing middleware
userSchema.pre('save', async function(next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Instance method to check password
userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// Filter out inactive users on queries
userSchema.pre(/^find/, function(next) {
  // this points to the current query
  this.find({ isActive: { $ne: false } });
  next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
