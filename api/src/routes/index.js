require("dotenv").config();
const { Router } = require("express");
const { IngresarDatos } = require("../controllers/recetas");

const { API_KEY } = process.env;
const axios = require("axios");
const fullData = require("../../InfoTotal.json");
const { EncontrarDietas } = require("../controllers/dietas");
const { paginado } = require("../controllers/pagina");
const { encontrarReceta, insertarReceta } = require("../controllers/recetas");
const { Recipe } = require("../db");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/recipes", async (req, res) => {
  //   manera a
  let { name, page } = req.query;
  if (name !== undefined) {
    name = name.toLowerCase();
  }

  try {
    const rta = await paginado(page, name);

    if (rta.totalRecipes === 0) {
      // eslint-disable-next-line no-throw-literal
      throw `No se encontro la receta con el nombre: ${name}`;
    }
    res.json({ msg: rta });
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: error });
  }
});

router.get("/recipes/:id", function (req, res) {
  const { id } = req.params;
  encontrarReceta(id, res);
});

router.get("/diets", async function (req, res) {
  try {
    const url = `https://api.spoonacular.com/recipes/complexSearch?number=100&addRecipeInformation=true&apiKey=${API_KEY}`;
    const result = await axios.get(url);
    if (result.status !== 200) {
      throw new Error("La api tiene un inconveniente");
    }
    // if (result.status === 200) {
    //   await IngresarDatos(result.data.results);
    // } else {
    await IngresarDatos(fullData.results);
    // }

    const rta = await EncontrarDietas();
    res.json({ msg: rta });
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: error });
  }
});
router.delete("/recipes", async (req, res) => {
  const { id } = req.query;
  try {
    const recetaEncontrada = await Recipe.findOne({
      where: { id: id },
    });

    const rta = await recetaEncontrada.destroy();
    if (rta.length === 0) {
      res.json({ msg: "Borrado exitosamente" });
    }
  } catch (err) {
    console(err);
    res.status(404).json({ msg: err });
  }
});

router.post("/recipes", async (req, res) => {
  let { name, resumenPlato, scoreSaludable, pasoApaso, diets } = req.body;
  if (name !== undefined) {
    name = name.toLowerCase();
  }
  try {
    const nombreEncontrado = await Recipe.findOne({ where: { name: name } });
    if (nombreEncontrado) throw new Error(`La receta ya existe`);
    const ultimaReceta = await Recipe.findOne({
      order: [["id", "DESC"]],
    });
    await insertarReceta(
      ultimaReceta.id + 1,
      name,
      resumenPlato,
      scoreSaludable,
      pasoApaso,
      "",
      null,
      null,
      null,
      diets
    );
    const ultimaRecetaInsertada = await Recipe.findOne({
      order: [["id", "DESC"]],
    });

    res.status(201).json({ msg: ultimaRecetaInsertada });
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;
