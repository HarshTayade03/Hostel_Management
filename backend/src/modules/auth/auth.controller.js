const User = require('../users/user.model');
const catchAsync = require('../../core/utils/catchAsync');
const AppError = require('../../core/utils/AppError');
const { createSendToken } = require('./auth.service');
const { registerSchema, loginSchema } = require('./auth.validation');

exports.register = catchAsync(async (req, res, next) => {
  // Validate request body
  const { error } = registerSchema.validate(req.body);
  if (error) {
    return next(new AppError(error.details[0].message, 400));
  }

  // Prevent creation of Admin role via public API
  let { role } = req.body;
  if (role === 'ADMIN') {
    return next(new AppError('Unauthorized to create Admin account', 403));
  }

  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    role: role || 'STUDENT',
    phone: req.body.phone,
    gender: req.body.gender,
  });

  createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  // Validate request body
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return next(new AppError(error.details[0].message, 400));
  }

  const { email, password } = req.body;

  // Check if user exists && password is correct
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  // If ok, send token
  createSendToken(user, 200, res);
});
