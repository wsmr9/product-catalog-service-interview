const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class ProductsService {
  constructor() {
    // Constructor can initialize if needed
  }

  /**
   * Creates a new product in the database.
   * @param {Object} data Product data.
   * @returns {Promise<Object>} The created product.
   */
  async create(data) {
    const newProduct = await models.Product.create(data);
    return newProduct;
  }

  /**
   * Retrieves all products from the database.
   * @returns {Promise<Array>} List of products.
   */
  async find() {
    const products = await models.Product.findAll();
    return products;
  }

  /**
   * Retrieves a single product by its ID.
   * @param {number} id Product ID.
   * @returns {Promise<Object>} The requested product.
   * @throws {Boom} If the product is not found or is blocked.
   */
  async findOne(id) {
    const product = await models.Product.findByPk(id);
    if (!product) {
      throw boom.notFound('product not found');
    }
    if (product.isBlock) {
      throw boom.conflict('product is blocked');
    }
    return product;
  }

  /**
   * Updates a product by its ID.
   * @param {number} id Product ID.
   * @param {Object} changes Object containing the changes.
   * @returns {Promise<Object>} The updated product.
   * @throws {Boom} If the product is not found.
   */
  async update(id, changes) {
    const product = await models.Product.findByPk(id);
    if (!product) {
      throw boom.notFound('product not found');
    }
    const updatedProduct = await product.update(changes);
    return updatedProduct;
  }

  /**
   * Deletes a product by its ID.
   * @param {number} id Product ID.
   * @returns {Promise<Object>} Confirmation of deletion.
   * @throws {Boom} If the product is not found.
   */
  async delete(id) {
    const product = await models.Product.findByPk(id);
    if (!product) {
      throw boom.notFound('product not found');
    }
    await product.destroy();
    return { id };
  }
}

module.exports = ProductsService;
