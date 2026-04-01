const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const AppError = require('./core/utils/AppError');
const globalErrorHandler = require('./core/middlewares/errorHandler');

const app = express();

// Set security HTTP headers
app.use(helmet());

// Logging in development
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Enable CORS securely for React Frontend
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:5174', 'http://127.0.0.1:5174'], // React Dev Server default ports
  credentials: true
}));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Global Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes'
});
app.use('/api', limiter);

// API Routes will be mounted here
const authRoutes = require('./modules/auth/auth.routes');
const userRoutes = require('./modules/users/user.routes');
const roomRoutes = require('./modules/rooms/room.routes');
const hostelRoutes = require('./modules/hostels/hostel.routes');
const complaintRoutes = require('./modules/complaints/complaint.routes');
const paymentRoutes = require('./modules/payments/payment.routes');

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/rooms', roomRoutes);
app.use('/api/v1/hostels', hostelRoutes);
app.use('/api/v1/complaints', complaintRoutes);
app.use('/api/v1/payments', paymentRoutes);


// Handle undefined routes safely for Express 5 / newer path-to-regexp
app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global Error Handler
app.use(globalErrorHandler);

module.exports = app;
