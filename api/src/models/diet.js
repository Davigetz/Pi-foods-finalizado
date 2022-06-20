const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Diet", Diet);
};

const Diet = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(100),
    unique: true,
  },
};
