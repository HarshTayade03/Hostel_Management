const catchAsync = require('../../core/utils/catchAsync');
const AppError = require('../../core/utils/AppError');
const Room = require('./room.model');
const roomService = require('./room.service');
const { createRoomSchema } = require('./room.validation');

exports.getMyRoom = catchAsync(async (req, res, next) => {
  const room = await Room.findOne({ occupants: req.user._id }).populate('hostelId', 'name type');

  if (!room) {
    return next(new AppError('No room allocated to you yet.', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      room
    }
  });
});

exports.createRoom = catchAsync(async (req, res, next) => {
  const { error } = createRoomSchema.validate(req.body);
  if (error) {
    return next(new AppError(error.details[0].message, 400));
  }

  const room = await Room.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      room
    }
  });
});

exports.getAllRooms = catchAsync(async (req, res, next) => {
  // basic filtering implementation
  const filter = {};
  if (req.query.status) filter.status = req.query.status;
  if (req.query.hostelId) filter.hostelId = req.query.hostelId;

  const rooms = await Room.find(filter).populate('hostelId', 'name type').populate('occupants', 'name email');

  res.status(200).json({
    status: 'success',
    results: rooms.length,
    data: {
      rooms
    }
  });
});

exports.triggerAutoAllocate = catchAsync(async (req, res, next) => {
  // Execute the FCFS Greedy algorithm
  const result = await roomService.autoAllocateRooms();

  res.status(200).json({
    status: 'success',
    data: result
  });
});
