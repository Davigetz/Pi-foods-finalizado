const { Op } = require("sequelize");
const { Recipe, Diet, Recipe_Diet } = require("../db");

const IngresarDatos = async (lista) => {
  lista.map(async (i) => {
    await insertarReceta(
      i.id,
      i.title,
      i.summary,
      i.healthScore,
      JSON.stringify(i.analyzedInstructions),
      i.image,
      i.servings,
      i.pricePerServing,
      i.readyInMinutes,
      i.diets
    );
  });
};

const insertarReceta = async (
  id,
  name,
  resumenPlato,
  scoreSaludable,
  pasoApaso,
  imageLink,
  porcion = null,
  precioPorcion = null,
  minutos = null,
  dietas
) => {
  try {
    // falta complementar la parte del error que hacer con el
    const recipeCreate = await Recipe.create({
      id,
      name,
      resumenPlato,
      scoreSaludable: +scoreSaludable,
      pasoApaso,
      imageLink,
      porcion,
      precioPorcion,
      minutos,
    });
    dietas.map(async (dieta) => {
      if (typeof dieta === "string") {
        await Diet.findOrCreate({ where: { name: dieta } });
      }

      let finDieta;
      if (typeof dieta === "string") {
        finDieta = await Diet.findOne({ where: { name: dieta } });
      }
      if (typeof dieta === "number") {
        finDieta = await Diet.findByPk(dieta);
      }
      await crearPuente(recipeCreate, finDieta);
    });
  } catch (error) {
    console.log(error);
  }
};

async function crearPuente(receta, dieta) {
  await receta.addDiet(dieta.id);
}

const encontrarReceta = (id, res) => {
  Recipe.findOne({ where: { id }, include: [{ model: Diet }] })
    .then((rta) => {
      res.send({ msg: rta });
    })
    .catch((error) => {
      res.status(404).json({ error: error });
    });
};

module.exports = {
  insertarReceta,
  crearPuente,
  IngresarDatos,
  encontrarReceta,
};
