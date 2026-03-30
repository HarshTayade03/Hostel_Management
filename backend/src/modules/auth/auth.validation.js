const Joi = require('joi');

const registerSchema = Joi.object({
  name: Joi.string().required().min(3).max(50),
  email: Joi.string().required().email(),
  password: Joi.string().required().min(8),
  role: Joi.string().valid('STUDENT', 'STAFF').default('STUDENT'),
  phone: Joi.string().optional().allow(''),
  gender: Joi.string().valid('MALE', 'FEMALE', 'OTHER').required(),
});

const loginSchema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required(),
});

module.exports = {
  registerSchema,
  loginSchema,
};
