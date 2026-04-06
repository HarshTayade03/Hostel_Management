const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A notification must have a title'],
    trim: true
  },
  desc: {
    type: String,
    required: [true, 'A notification must have a description']
  },
  audience: {
    type: String,
    default: 'All Residents'
  },
  type: {
    type: String,
    enum: ['Info', 'Warning', 'Alert'],
    default: 'Info'
  },
  time: {
    type: String,
    default: 'Just now' // Storing preformatted time for simplistic frontend compatibility as defined by UI mock
  }
}, {
  timestamps: true
});

const Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification;
