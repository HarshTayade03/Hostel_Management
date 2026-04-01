const express = require('express');
const hostelController = require('./hostel.controller');
const authMiddleware = require('../../core/middlewares/authMiddleware');

const router = express.Router();

router.route('/')
  .get(authMiddleware.protect, hostelController.getAllHostels)
  .post(authMiddleware.protect, authMiddleware.restrictTo('ADMIN'), hostelController.createHostel);

module.exports = router;
