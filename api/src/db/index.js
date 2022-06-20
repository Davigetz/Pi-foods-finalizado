require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/food`,
  {
    logging: false,
    native: false,
  }
);

const basename = path.basename(__filename);

const modelDefiners = [];
fs.readdirSync(path.join(__dirname, "../models"))
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "../models", file)));
  });

modelDefiners.forEach((model) => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

const { Recipe, Diet } = sequelize.models;

// Crear relacion Puente entre recetas y dietas
const Recipe_Diet = sequelize.define("Recipe_Diet", {}, { timestamps: false });
// relacionesj
// muchos a muchos
Recipe.belongsToMany(Diet, { through: Recipe_Diet });
Diet.belongsToMany(Recipe, { through: Recipe_Diet });

module.exports = {
  ...sequelize.models,
  sequelize,
  conn: sequelize,
};
