const Razorpay = require('razorpay');
const crypto = require('crypto');
const AppError = require('../../core/utils/AppError');

let razorpayInstance;

try {
  razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || 'test_key_dummy',
    key_secret: process.env.RAZORPAY_KEY_SECRET || 'test_secret_dummy',
  });
} catch (error) {
  console.error("Razorpay instance initialization failed. Ensure you have valid keys in .env");
}

exports.createRazorpayOrder = async (amountInINR, receiptId) => {
  if (!razorpayInstance) throw new AppError("Payment Gateway is currently unavailable.", 503);

  if (!amountInINR || amountInINR <= 0) {
    throw new AppError("Payment amount must be greater than 0.", 400);
  }

  const options = {
    amount: Math.round(amountInINR) * 100, // Razorpay uses paisa (integer only)
    currency: "INR",
    receipt: receiptId.toString().slice(0, 40) // Razorpay receipt max 40 chars
  };

  try {
    const order = await razorpayInstance.orders.create(options);
    return order;
  } catch (err) {
    // Razorpay errors nest the message inside err.error
    const message = err?.error?.description || err?.message || 'Unknown Razorpay error';
    throw new AppError(`Payment gateway error: ${message}`, 502);
  }
};

exports.verifyRazorpaySignature = (orderId, paymentId, signature) => {
  const secret = process.env.RAZORPAY_KEY_SECRET || 'test_secret_dummy';
  const generatedSignature = crypto
    .createHmac('sha256', secret)
    .update(orderId + "|" + paymentId)
    .digest('hex');

  return generatedSignature === signature;
};
