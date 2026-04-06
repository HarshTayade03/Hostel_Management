const express = require('express');
const leaveController = require('./leave.controller');
const authMiddleware = require('../../core/middlewares/authMiddleware');

const router = express.Router();

router.use(authMiddleware.protect);

router.post('/', leaveController.createLeave);
router.get('/my-leaves', leaveController.getMyLeaves);

router.use(authMiddleware.restrictTo('ADMIN', 'STAFF'));
router.get('/', leaveController.getAllLeaves);
router.patch('/:id/status', leaveController.updateLeaveStatus);

module.exports = router;
