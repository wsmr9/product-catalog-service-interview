require('dotenv').config();

const config = {
  isProd: process.env.NODE_ENV === 'production',
  dbUrl: process.env.DATABASE_URL,
  dialect: process.env.DB_DIALECT
}

module.exports = { config };
