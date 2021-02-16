const logger = require("../logs");
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("./setup");

/**
 * @swagger
 * definitions:
 *  Segmentation:
 *      type: object
 *      properties:
 *          startDate:
 *              type: string
 *          endDate:
 *              type: string
 */

class Segmentation extends Sequelize.Model {}

Segmentation.init(
  {
    startDate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, modelName: "segmentation" }
);

Segmentation.sync();
logger.info("The table for the Segmentation model was just (re)created!");

module.exports = Segmentation;