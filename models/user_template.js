const logger = require('../logs')

const { Sequelize, DataTypes } = require('sequelize');

// login to mariadb database
// ex : new  new Sequelize(<dbname>, <user>, <password>, ...);
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER,process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  logging: msg => logger.verbose(msg),
  dialectOptions: {
    timezone: 'Etc/GMT0'
  },
  dialect: 'mariadb'
});

try {
  sequelize.authenticate();
  logger.info('Connection has been established successfully.');
} catch (error) {
  logger.error('Unable to connect to the database:', error);
}

/**
 * @swagger
 * definitions:
 *  User:
 *      type: object
 *      properties:
 *          firstName:
 *              type: string
 *          lastName:
 *              type: string
 */
const User = sequelize.define('User', {
  // Model attributes are defined here
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING
    // allowNull defaults to true
  }
}, {
  timestamps: false
  // Other model options go here
});

User.sync();
logger.info("The table for the User model was just (re)created!");
var _app = {};
module.exports = function(app){
  _app = app;
  return User
};
