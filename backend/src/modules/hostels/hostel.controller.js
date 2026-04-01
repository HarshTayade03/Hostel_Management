const AppError = require('../../core/utils/AppError');
const catchAsync = require('../../core/utils/catchAsync');
const Hostel = require('./hostel.model');

// Basic CRUD for Hostels (restricted to Admin usually)
exports.createHostel = catchAsync(async (req, res, next) => {
  const newHostel = await Hostel.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      hostel: newHostel
    }
  });
});

exports.getAllHostels = catchAsync(async (req, res, next) => {
  const hostels = await Hostel.find({ isActive: true });
  res.status(200).json({
    status: 'success',
    results: hostels.length,
    data: {
      hostels
    }
  });
});
