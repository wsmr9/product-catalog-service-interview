const Joi = require('joi');

// Define basic validation rules for different fields
const id = Joi.number().integer();
const name = Joi.string().min(3).max(15);
const price = Joi.number().integer().min(10);
const description = Joi.string().min(10);
const image = Joi.string().uri();

const price_min = Joi.number().integer();
const price_max = Joi.number().integer();

const limit = Joi.number().integer();
const offset = Joi.number().integer();

/**
 * Schema to validate data for product creation.
 * Ensures that the name, price, description, and image are provided and meet the specified criteria.
 */
const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  description: description.required(),
  image: image.required(),
});

/**
 * Schema to validate data for product update.
 * Fields are optional; provided values must meet the criteria if specified.
 */
const updateProductSchema = Joi.object({
  name: name,
  price: price,
  image: image,
  description: description,
});

/**
 * Schema to validate the product ID in requests.
 * ID must be an integer and is required.
 */
const getProductSchema = Joi.object({
  id: id.required(),
});

/**
 * Schema to validate query parameters for product search.
 * Supports pagination and price filtering.
 */
const queryProductSchema = Joi.object({
  limit,
  offset,
  price,
  price_min,
  price_max: Joi.when('price_min', {
    is: Joi.exist(),
    then: price_max.required(),  // Require price_max if price_min is present
  })
});

module.exports = { 
    createProductSchema, 
    updateProductSchema, 
    getProductSchema, 
    queryProductSchema 
}
