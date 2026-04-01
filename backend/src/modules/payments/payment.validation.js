const Joi = require('joi');

const createOrderSchema = Joi.object({
  amount: Joi.number().min(1).required(),
  type: Joi.string().valid('TUITION', 'HOSTEL_FEE', 'MESS_FEE', 'FINE').required(),
});

const verifyPaymentSchema = Joi.object({
  razorpayOrderId: Joi.string().required(),
  razorpayPaymentId: Joi.string().required(),
  razorpaySignature: Joi.string().required(),
});

module.exports = {
  createOrderSchema,
  verifyPaymentSchema
};
