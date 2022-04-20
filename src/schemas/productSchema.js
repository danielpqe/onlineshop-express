const Joi = require('Joi');

const id = Joi.string().uuid();
const name = Joi.string().min(3).max(20);
const price = Joi.number().integer().min(10);
const description = Joi.string().min(3);

const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  description: description.required(),
});

const updateProductSchema = Joi.object({
  name: name.required(),
  price: price,
  description: description,
});

const getProductSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
};
