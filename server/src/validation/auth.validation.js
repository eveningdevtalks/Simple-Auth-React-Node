const Joi = require("joi");

module.exports = {
  login: {
    body: Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required(),
    }),
  },
  register: {
    body: Joi.object({
      email: Joi.string().required(),
      name: Joi.string().required(),
      password: Joi.string().required(),
    }),
  },
};
