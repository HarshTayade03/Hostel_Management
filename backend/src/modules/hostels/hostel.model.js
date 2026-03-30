const mongoose = require('mongoose');

const hostelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Hostel must have a name'],
    unique: true,
    trim: true,
  },
  type: {
    type: String,
    enum: ['BOYS', 'GIRLS', 'COED'],
    required: [true, 'Hostel must have a type (BOYS, GIRLS, COED)'],
  },
  totalCapacity: {
    type: Number,
    required: [true, 'Hostel must have a total capacity defined'],
    min: 1,
  },
  currentOccupancy: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  }
}, {
  timestamps: true,
});

const Hostel = mongoose.model('Hostel', hostelSchema);
module.exports = Hostel;
