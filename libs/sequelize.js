const { Sequelize } = require('sequelize');

const { config } = require('./../config/config');
const setupModels = require('./../db/models');

// Set up options for the Sequelize instance based on the environment.
const options = {
  dialect: config.dialect,
  // Disable logging for production to improve performance and avoid leaking sensitive data.
  logging: !config.isProd,
}

// In production, configure additional dialect options for secure database connections.
if (config.isProd) {
  options.dialectOptions = {
    ssl: {
      // Enabling this option is important to avoid SSL security vulnerabilities.
      rejectUnauthorized: false
    }
  }
}

// Create a new Sequelize instance with configurations from 'config'.
const sequelize = new Sequelize(config.dbUrl, options);

// Setup database models.
setupModels(sequelize);

// Synchronize all defined models to the database.
// Note: 'force: false' means it will not drop existing tables.
sequelize.sync({ force: false });

module.exports = sequelize;
