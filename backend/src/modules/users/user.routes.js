const express = require('express');
const userController = require('./user.controller');
const authMiddleware = require('../../core/middlewares/authMiddleware');

const router = express.Router();

// The /me endpoint must be strictly protected
router.get('/me', authMiddleware.protect, userController.getMe);
router.patch('/me', authMiddleware.protect, userController.updateMe);

// Admin / Management endpoints for Users (Staff, Students)
router.use(authMiddleware.protect); // Protect all routes below
router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
