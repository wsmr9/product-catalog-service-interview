const boom = require('@hapi/boom');

/**
 * Creates a middleware function that validates request data against a Joi schema.
 * 
 * This middleware is reusable and can be applied to any route to validate different types
 * of request data (e.g., `body`, `params`, `query`) based on the provided Joi schema.
 * It uses `boom` to standardize error responses, improving API error management.
 *
 * @param {Object} schema - The Joi schema to validate against.
 * @param {string} property - The property on the request object to validate (e.g., 'body', 'query', 'params').
 * @returns {Function} Middleware function that validates the request and handles errors.
 */
function validatorHandler(schema, property) {
  return (req, res, next) => {
    const data = req[property];
    const { error } = schema.validate(data, { abortEarly: false }); // Validate the data against the schema

    if (error) {
      // If validation fails, create a boom error with the details and pass it to the next error handler
      return next(boom.badRequest(error.message));
    }
    next(); // Continue to the next middleware if validation is successful
  }
}

module.exports = validatorHandler;
