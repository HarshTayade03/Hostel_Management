const express = require('express');
const notificationController = require('./notification.controller');
const authMiddleware = require('../../core/middlewares/authMiddleware');

const router = express.Router();

router.use(authMiddleware.protect);

router
  .route('/')
  .get(notificationController.getAllNotifications)
  .post(notificationController.createNotification);

router
  .route('/:id')
  .delete(notificationController.deleteNotification);

module.exports = router;
