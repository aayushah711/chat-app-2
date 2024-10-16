const Joi = require("joi");

const getMessagesByChatIdValidator = Joi.object({
  chatId: Joi.number().required(),
});

module.exports = {
  getMessagesByChatIdValidator,
};
