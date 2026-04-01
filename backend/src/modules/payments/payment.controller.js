const AppError = require('../../core/utils/AppError');
const catchAsync = require('../../core/utils/catchAsync');
const Payment = require('./payment.model');
const paymentService = require('./payment.service');
const { createOrderSchema, verifyPaymentSchema } = require('./payment.validation');

exports.createOrder = catchAsync(async (req, res, next) => {
  const { error } = createOrderSchema.validate(req.body);
  if (error) {
    return next(new AppError(error.details[0].message, 400));
  }

  // Create a pending payment log in Database
  const paymentRecord = await Payment.create({
    studentId: req.user._id,
    amount: req.body.amount,
    type: req.body.type,
    status: 'PENDING'
  });

  // Call Razorpay API
  const order = await paymentService.createRazorpayOrder(req.body.amount, paymentRecord._id);

  // Update DB with razorpay order ID
  paymentRecord.razorpayOrderId = order.id;
  await paymentRecord.save();

  res.status(201).json({
    status: 'success',
    data: {
      order,
      paymentId: paymentRecord._id
    }
  });
});

exports.verifyPayment = catchAsync(async (req, res, next) => {
  const { error } = verifyPaymentSchema.validate(req.body);
  if (error) {
    return next(new AppError(error.details[0].message, 400));
  }

  const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;

  const isValid = paymentService.verifyRazorpaySignature(razorpayOrderId, razorpayPaymentId, razorpaySignature);

  if (!isValid) {
    return next(new AppError('Invalid payment signature exactly!', 400));
  }

  // Find payment and mark as success
  const payment = await Payment.findOneAndUpdate(
    { razorpayOrderId },
    {
      status: 'SUCCESS',
      razorpayPaymentId,
      razorpaySignature,
      paidAt: Date.now()
    },
    { new: true }
  );

  if (!payment) {
     return next(new AppError('Payment Order not found in database', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      payment
    }
  });
});

exports.getMyTransactions = catchAsync(async (req, res, next) => {
  const payments = await Payment.find({ studentId: req.user._id }).sort({ createdAt: -1 });

  res.status(200).json({
    status: 'success',
    results: payments.length,
    data: {
      payments
    }
  });
});
