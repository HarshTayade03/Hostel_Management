const Joi = require('joi');

const createRoomSchema = Joi.object({
  roomNumber: Joi.string().required(),
  hostelId: Joi.string().hex().length(24).required(), // valid object id
  floor: Joi.number().integer().min(0).required(),
  capacity: Joi.number().integer().min(1).max(10).required(),
});

module.exports = {
  createRoomSchema
};
