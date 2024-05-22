const express = require('express');
const productsRouter = require('./products.router');

/**
 * Initializes API routes for the application.
 * 
 * This function configures the base API path and registers various resource routers under this path.
 * It demonstrates a scalable way to organize route management, facilitating easier expansion and maintenance.
 *
 * @param {express.Application} app - The main application instance on which routes are to be registered.
 */
function routerApi(app) {
  // Create a router for versioning control of the API
  const router = express.Router();

  // Set the base path for the API to '/api/v1'
  //app.use('/api/v1', router);

  // Register 'products' routes under '/api/v1/products'
  //router.use('/products', productsRouter);

  app.use('/products', productsRouter)
}

module.exports = routerApi;
