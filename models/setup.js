const logger = require("../logs");
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  process.env.URSI_DB_NAME,
  process.env.URSI_DB_USER,
  process.env.URSI_DB_PASSWORD,
  {
    host: process.env.URSI_DB_HOST,
    port: Number(process.env.URSI_DB_PORT),
    logging: (msg) => logger.verbose(msg),
    dialectOptions: {
      timezone: "Etc/GMT0",
    },
    dialect: "mariadb",
  }
);

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    logger.info("Connection has been established successfully.");
  } catch (error) {
    logger.error("Unable to connect to the database:", error);
  }
})();

module.exports = sequelize;
