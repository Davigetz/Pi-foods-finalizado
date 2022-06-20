const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Recipe", Recipe);
};

// al parecer el get funciona con una base de datos en sync no force
const Recipe = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    get() {
      const nombre = this.getDataValue("name");
      return nombre.replace(/\w\S*/g, (w) =>
        w.replace(/^\w/, (c) => c.toUpperCase())
      );
    },
    set(value) {
      this.setDataValue("name", value.toLowerCase());
    },
  },
  resumenPlato: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  scoreSaludable: {
    type: DataTypes.INTEGER,
  },
  pasoApaso: {
    type: DataTypes.TEXT,
  },
  imageLink: {
    type: DataTypes.STRING(100),
  },
  tiempo: {
    type: DataTypes.INTEGER,
    default: null,
  },
  precioPorcion: {
    type: DataTypes.FLOAT,
    default: null,
  },
  minutos: {
    type: DataTypes.INTEGER,
    default: null,
  },
  porcion: {
    type: DataTypes.INTEGER,
    default: null,
  },
};
