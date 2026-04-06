const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomNumber: {
    type: String,
    required: [true, 'Room must have a number/identifier'],
    trim: true,
  },
  hostelId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Hostel',
    required: [true, 'Room must belong to a hostel'],
    index: true,
  },
  floor: {
    type: Number,
    required: [true, 'Room must specify its floor'],
  },
  capacity: {
    type: Number,
    required: [true, 'Room must have a capacity (e.g. 1, 2, 3)'],
    min: 1,
  },
  occupancy: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ['AVAILABLE', 'PARTIALLY_FULL', 'FULL', 'MAINTENANCE'],
    default: 'AVAILABLE',
    index: true,
  },
  occupants: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    }
  ],
}, {
  timestamps: true,
});

// Compound index to ensure room numbers are unique per hostel
roomSchema.index({ roomNumber: 1, hostelId: 1 }, { unique: true });

// Pre-save hook to automatically update room status based on occupancy
roomSchema.pre('save', function() {
  if (this.status === 'MAINTENANCE') return; // Don't auto-change maintenance rooms
  if (this.occupancy >= this.capacity) {
    this.status = 'FULL';
  } else if (this.occupancy > 0) {
    this.status = 'PARTIALLY_FULL';
  } else {
    this.status = 'AVAILABLE';
  }
});

const Room = mongoose.model('Room', roomSchema);
module.exports = Room;
