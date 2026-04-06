const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String,
    enum: ['Outpass', 'Leave'],
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  departureTime: {
    type: Date,
    required: true,
  },
  returnTime: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['PENDING', 'APPROVED', 'REJECTED'],
    default: 'PENDING',
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Leave', leaveSchema);
