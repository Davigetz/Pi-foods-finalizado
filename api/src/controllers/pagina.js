const { Op } = require("sequelize");
const { Recipe, Diet } = require("../db");
const { mySleepFunction } = require("./dietas");

const paginado = async (page, name, size) => {
  const limit = size ? size : 9;
  const offset = page ? page * limit : 0;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
  // misma razon de antes cuando se realizo en dietas
  await mySleepFunction(1000);
  const countRecipes = await Recipe.findAndCountAll({
    subQuery: false,
    where: condition,
    include: [{ model: Diet }],
    order: [["createdAt", "desc"]],
    // offset: offset,
    // limit: limit,
  });
  let recipest = [];
  // for (let i = offset; i < offset + limit; i++) {
  //   if (countRecipes.rows[i]) recipest.push(countRecipes.rows[i]);
  // }
  // +page para transformarlo en numero
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(countRecipes.rows.length / limit);
  return {
    totalRecipes: countRecipes.rows.length,
    recipes: countRecipes.rows,
    totalPages,
    currentPage,
  };
};

module.exports = { paginado };
