const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

// Use the full connection string if available (for Cloud), otherwise use individual params (for Local)
const sequelize = process.env.DATABASE_URL 
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: 'postgres',
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false // Required for Neon.tech/Render
        }
      },
      logging: false,
    })
  : new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: process.env.DB_HOST,
        dialect: 'postgres',
        logging: false,
      }
    );

module.exports = sequelize;