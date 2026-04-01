const AppError = require('../../core/utils/AppError');
const catchAsync = require('../../core/utils/catchAsync');
const Complaint = require('./complaint.model');
const { createComplaintSchema, updateComplaintStatusSchema } = require('./complaint.validation');

exports.createComplaint = catchAsync(async (req, res, next) => {
  const { error } = createComplaintSchema.validate(req.body);
  if (error) {
    return next(new AppError(error.details[0].message, 400));
  }

  // Ensure user has a hostel assigned before complaining
  if (!req.user.hostelId) {
    return next(new AppError('You must be allocated to a hostel before raising complaints.', 403));
  }

  const newComplaint = await Complaint.create({
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    studentId: req.user._id,
    hostelId: req.user.hostelId,
  });

  res.status(201).json({
    status: 'success',
    data: {
      complaint: newComplaint
    }
  });
});

exports.getAllComplaints = catchAsync(async (req, res, next) => {
  let filter = {};
  
  // RBAC Implementation for listing
  if (req.user.role === 'STUDENT') {
    filter.studentId = req.user._id; // Student sees only their complaints
  } else if (req.user.role === 'STAFF') {
    filter.assignedTo = req.user._id; // Optional: Or allow them to see their hostel's complaints
  }

  // Allow Admins to query specific statuses
  if (req.query.status) {
    filter.status = req.query.status;
  }
  if (req.query.hostelId && req.user.role === 'ADMIN') {
    filter.hostelId = req.query.hostelId;
  }

  const complaints = await Complaint.find(filter)
                      .populate('studentId', 'name email roomNumber')
                      .populate('hostelId', 'name')
                      .sort({ createdAt: -1 });

  res.status(200).json({
    status: 'success',
    results: complaints.length,
    data: {
      complaints
    }
  });
});

exports.updateComplaintStatus = catchAsync(async (req, res, next) => {
  const { error } = updateComplaintStatusSchema.validate(req.body);
  if (error) {
    return next(new AppError(error.details[0].message, 400));
  }

  const complaint = await Complaint.findById(req.params.id);
  
  if (!complaint) {
    return next(new AppError('No complaint found with that ID', 404));
  }

  // Status updates allowed by Admin and Staff
  complaint.status = req.body.status;
  if (req.body.status === 'RESOLVED' || req.body.status === 'REJECTED') {
      complaint.resolvedAt = Date.now();
  }

  // If a staff is updating it, auto-assign to them
  if (req.user.role === 'STAFF') {
      complaint.assignedTo = req.user._id;
  }

  await complaint.save();

  res.status(200).json({
    status: 'success',
    data: {
      complaint
    }
  });
});
