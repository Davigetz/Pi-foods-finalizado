const { Recipe, Diet, Recipe_Diet } = require("../db");

function mySleepFunction(delayTime) {
  return new Promise((resolve) => setTimeout(resolve, delayTime));
}

const EncontrarDietas = async () => {
  //  timer para hacer que toda la informacion
  // ingrese a la base de datos y no la tome antes de tiempo
  // await mySleepFunction(2500);
  try {
    await mySleepFunction(2500);
    const dietas = await Diet.findAll();
    console.log(dietas);
    return dietas;
  } catch (error) {
    console.log(error);
  }
};
module.exports = { EncontrarDietas, mySleepFunction };
