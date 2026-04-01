const express = require('express');
const paymentController = require('./payment.controller');
const authMiddleware = require('../../core/middlewares/authMiddleware');

const router = express.Router();

router.use(authMiddleware.protect);

router.post('/create-order', authMiddleware.restrictTo('STUDENT'), paymentController.createOrder);
router.post('/verify', authMiddleware.restrictTo('STUDENT'), paymentController.verifyPayment);
router.get('/my-transactions', authMiddleware.restrictTo('STUDENT'), paymentController.getMyTransactions);

module.exports = router;
