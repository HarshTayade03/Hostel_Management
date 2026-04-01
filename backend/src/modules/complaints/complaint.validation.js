const Joi = require('joi');

const createComplaintSchema = Joi.object({
  title: Joi.string().required().max(100),
  description: Joi.string().required().max(1000),
  category: Joi.string().valid('MAINTENANCE', 'CLEANING', 'FOOD', 'SECURITY', 'OTHER').required(),
});

const updateComplaintStatusSchema = Joi.object({
  status: Joi.string().valid('OPEN', 'IN_PROGRESS', 'RESOLVED', 'REJECTED').required(),
});

module.exports = {
  createComplaintSchema,
  updateComplaintStatusSchema
};
