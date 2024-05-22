const { Model, DataTypes, Sequelize } = require('sequelize');

// Define the table name
const PRODUCT_TABLE = 'products';

// Define the schema for the 'products' table
const ProductSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW, // Automatically set the date to the current timestamp
  }
};

/**
 * Class representing a Product model.
 * 
 * This class encapsulates the model definition and its associated operations.
 * It inherits from the Sequelize Model class.
 */
class Product extends Model {
  /**
   * Associate function to define relationships with other models.
   *
   * @param {object} models - The list of models in the application.
   */
  static associate(models) {
    // Define associations here
    // Example: this.belongsTo(models.OtherModel, { foreignKey: 'otherModelId' });
  }

  /**
   * Configuration method for the model to specify the sequelize instance, table name, etc.
   *
   * @param {Sequelize} sequelize - The sequelize instance.
   * @returns {object} The model configuration.
   */
  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCT_TABLE,
      modelName: 'Product',
      timestamps: false // Do not automatically create updatedAt and createdAt fields
    }
  }
}

module.exports = { Product, ProductSchema, PRODUCT_TABLE };
