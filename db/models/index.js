const { Product, ProductSchema } = require('./product.model');

/**
 * Initializes all models and their associations.
 *
 * This function is responsible for initializing the Sequelize models with their respective schemas and
 * configurations. It also calls the associate method to set up any model relationships.
 *
 * @param {Sequelize} sequelize - The Sequelize instance to which the models are attached.
 */
function setupModels(sequelize) {
  // Initialize the Product model with its schema and configuration.
  Product.init(ProductSchema, Product.config(sequelize));

  // Setup associations if there are any defined in the model.
  Product.associate(sequelize.models);
}

module.exports = setupModels;