const Leave = require('./leave.model');

exports.createLeave = async (req, res, next) => {
  try {
    const leave = await Leave.create({
      ...req.body,
      user: req.user._id
    });
    res.status(201).json({ status: 'success', data: { leave } });
  } catch (err) {
    next(err);
  }
};

exports.getMyLeaves = async (req, res, next) => {
  try {
    const leaves = await Leave.find({ user: req.user._id }).sort('-createdAt');
    res.status(200).json({ status: 'success', results: leaves.length, data: { leaves } });
  } catch (err) {
    next(err);
  }
};

exports.getAllLeaves = async (req, res, next) => {
  try {
    const leaves = await Leave.find().populate('user', 'name identifier').sort('-createdAt');
    res.status(200).json({ status: 'success', results: leaves.length, data: { leaves } });
  } catch (err) {
    next(err);
  }
};

exports.updateLeaveStatus = async (req, res, next) => {
  try {
    const leave = await Leave.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    );
    if (!leave) return res.status(404).json({ status: 'fail', message: 'No leave found' });
    res.status(200).json({ status: 'success', data: { leave } });
  } catch (err) {
    next(err);
  }
};
