const logger = require("../logs");
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("./setup");
const Segmentation = require('./segmentation');

/**
 * @swagger
 * definitions:
 *  LeastSold:
 *      type: object
 *      properties:
 *          segmentationId:
 *              type: integer
 *          productCode:
 *              type: string
 *          productFamily:
 *              type: string
 */

class LeastSold extends Sequelize.Model {}

LeastSold.init({
    productCode: {
        type: DataTypes.STRING,
        allowNull: false
    },
    productFamily: {
        type: DataTypes.STRING,
    }
}, {sequelize, modelName: 'leastSoldProducts'});

LeastSold.belongsTo(Segmentation);
Segmentation.hasMany(LeastSold);

module.exports = LeastSold;