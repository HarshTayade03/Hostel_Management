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
