const express = require('express');
const complaintController = require('./complaint.controller');
const authMiddleware = require('../../core/middlewares/authMiddleware');

const router = express.Router();

router.use(authMiddleware.protect);

router.route('/')
  .post(authMiddleware.restrictTo('STUDENT'), complaintController.createComplaint)
  .get(complaintController.getAllComplaints);

// Update status (Admin & Staff only)
router.route('/:id/status')
  .patch(authMiddleware.restrictTo('ADMIN', 'STAFF'), complaintController.updateComplaintStatus);

module.exports = router;
