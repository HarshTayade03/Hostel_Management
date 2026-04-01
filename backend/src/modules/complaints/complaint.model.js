const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Complaint must have a title'],
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    required: [true, 'Complaint must have a detailed description'],
    maxlength: 1000
  },
  category: {
    type: String,
    enum: ['MAINTENANCE', 'CLEANING', 'FOOD', 'SECURITY', 'OTHER'],
    required: [true, 'Complaint must belong to a category']
  },
  status: {
    type: String,
    enum: ['OPEN', 'IN_PROGRESS', 'RESOLVED', 'REJECTED'],
    default: 'OPEN',
    index: true
  },
  studentId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Complaint must be tied to a student'],
    index: true
  },
  hostelId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Hostel',
    required: [true, 'Complaint must specify the hostel location'],
    index: true
  },
  assignedTo: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  resolvedAt: {
    type: Date
  }
}, {
  timestamps: true,
});

// Middleware to easily query Open vs Resolved complaints
complaintSchema.index({ status: 1, hostelId: 1 });

const Complaint = mongoose.model('Complaint', complaintSchema);
module.exports = Complaint;
