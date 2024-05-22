const { ValidationError } = require('sequelize');

/**
 * Log errors to the console.
 * 
 * @param {Error} err - The error object.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {Function} next - The next middleware function.
 */
function logErrors(err, req, res, next) {
  console.error(err);
  next(err);
}

/**
 * General error handler that sends a JSON response with the error details.
 * 
 * @param {Error} err - The error object.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 */
function errorHandler(err, req, res, next) {
  res.status(500).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack, // Do not send stack trace in production
  });
}

/**
 * Error handler for handling Boom error objects.
 * 
 * @param {Error} err - The error object.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {Function} next - The next middleware function.
 */
function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  } else {
    next(err);
  }
}

/**
 * Error handler specifically for Sequelize validation errors.
 * 
 * @param {Error} err - The error object.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {Function} next - The next middleware function.
 */
function ormErrorHandler(err, req, res, next) {
  if (err instanceof ValidationError) {
    res.status(409).json({
      statusCode: 409,
      message: err.name,
      errors: err.errors.map(e => e.message)
    });
    return; // Ensure to return after handling the error to prevent calling next(err)
  }
  next(err);
}

module.exports = { logErrors, errorHandler, boomErrorHandler, ormErrorHandler };
