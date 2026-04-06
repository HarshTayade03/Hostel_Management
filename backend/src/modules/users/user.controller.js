const User = require('./user.model');
const catchAsync = require('../../core/utils/catchAsync');
const AppError = require('../../core/utils/AppError');

// Get current user profile securely driven strictly by the JWT verified via middleware
exports.getMe = catchAsync(async (req, res, next) => {
  // req.user is populated by the authMiddleware protecting this route
  const currentUser = await User.findById(req.user._id).populate('hostelId', 'name type');
  
  if (!currentUser) {
    return next(new AppError('User profile not found based on current active token.', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      user: currentUser,
    }
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  // Filter out unwanted fields
  const allowedFields = ['name', 'phone', 'gender', 'avatar'];
  const filteredBody = {};
  Object.keys(req.body).forEach(el => {
    if (allowedFields.includes(el)) filteredBody[el] = req.body[el];
  });

  const updatedUser = await User.findByIdAndUpdate(req.user._id, filteredBody, {
    new: true,
    runValidators: true
  }).populate('hostelId', 'name type');

  res.status(200).json({
     status: 'success',
     data: { user: updatedUser }
  });
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
  let query = User.find();
  if (req.query.role) {
    query = query.where({ role: req.query.role.toUpperCase() });
  }
  const users = await query.populate('hostelId', 'name type');
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: { users }
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return next(new AppError('No user found with that ID', 404));
  res.status(204).json({
    status: 'success',
    data: null
  });
});

exports.createUser = catchAsync(async (req, res, next) => {
  // Generate random pass and email if not provided from the rapid UI modals
  const mockEmail = req.body.email || `${req.body.name.replace(/\s+/g, '').toLowerCase()}${Math.floor(Math.random()*1000)}@hostel.com`;
  const mockPass  = req.body.password || 'password123';
  
  const newUser = await User.create({
    name: req.body.name,
    email: mockEmail,
    password: mockPass,
    role: req.body.role || 'STUDENT',
    phone: req.body.phone,
    hostelId: req.body.hostelId || null
  });

  res.status(201).json({
    status: 'success',
    data: { user: newUser }
  });
});
