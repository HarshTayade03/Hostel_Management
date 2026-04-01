const express = require('express');
const userController = require('./user.controller');
const authMiddleware = require('../../core/middlewares/authMiddleware');

const router = express.Router();

// The /me endpoint must be strictly protected
router.get('/me', authMiddleware.protect, userController.getMe);

module.exports = router;
