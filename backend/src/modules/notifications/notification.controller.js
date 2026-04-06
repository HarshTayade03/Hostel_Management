const Notification = require('./notification.model');
const catchAsync = require('../../core/utils/catchAsync');
const AppError = require('../../core/utils/AppError');

exports.getAllNotifications = catchAsync(async (req, res, next) => {
  const notifications = await Notification.find().sort('-createdAt');
  res.status(200).json({
    status: 'success',
    results: notifications.length,
    data: { notifications }
  });
});

exports.createNotification = catchAsync(async (req, res, next) => {
  const newNotification = await Notification.create(req.body);
  res.status(201).json({
    status: 'success',
    data: { notification: newNotification }
  });
});

exports.deleteNotification = catchAsync(async (req, res, next) => {
  const notification = await Notification.findByIdAndDelete(req.params.id);
  if (!notification) {
    return next(new AppError('No notification found with that ID', 404));
  }
  res.status(204).json({
    status: 'success',
    data: null
  });
});
