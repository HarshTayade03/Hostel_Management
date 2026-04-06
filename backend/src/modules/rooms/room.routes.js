const express = require('express');
const roomController = require('./room.controller');
const authMiddleware = require('../../core/middlewares/authMiddleware');

const router = express.Router();

// Protect all routes after this middleware
router.use(authMiddleware.protect);

router.get('/my-room', authMiddleware.restrictTo('STUDENT'), roomController.getMyRoom);

router.route('/')
  .get(roomController.getAllRooms)
  .post(authMiddleware.restrictTo('ADMIN'), roomController.createRoom);

router.route('/:id')
  .patch(authMiddleware.restrictTo('ADMIN', 'STAFF'), roomController.updateRoom);

// Only Admin can trigger bulk auto allocation
router.post('/auto-allocate', authMiddleware.restrictTo('ADMIN'), roomController.triggerAutoAllocate);

module.exports = router;
