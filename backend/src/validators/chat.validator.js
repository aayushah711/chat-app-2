const Joi = require("joi");

const createValidator = Joi.object({
  title: Joi.string().alphanum().min(1).max(150).optional(),
  description: Joi.string().optional().min(3).max(30),
  users: Joi.array().items(Joi.string()).required().min(2).max(250),
});

module.exports = {
  createValidator,
};
