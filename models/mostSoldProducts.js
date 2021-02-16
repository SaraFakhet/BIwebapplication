const logger = require("../logs");
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("./setup");
const Segmentation = require('./segmentation');

/**
 * @swagger
 * definitions:
 *  MostSold:
 *      type: object
 *      properties:
 *          segmentationId:
 *              type: integer
 *          productCode:
 *              type: string
 *          productFamily:
 *              type: string
 */

class MostSold extends Sequelize.Model {}

MostSold.init({
    productCode: {
        type: DataTypes.STRING,
        allowNull: false
    },
    productFamily: {
        type: DataTypes.STRING,
    }
}, {sequelize, modelName: 'mostSoldProducts'});

MostSold.belongsTo(Segmentation);
Segmentation.hasMany(MostSold);

module.exports = MostSold;