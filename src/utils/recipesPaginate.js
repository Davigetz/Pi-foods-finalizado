export const paginado = (page, size, recipes) => {
  const limit = size ? size : 9;
  const offset = page ? page * limit : 0;

  let currentRecipes = [];
  for (let i = offset; i < offset + limit; i++) {
    if (recipes[i]) currentRecipes.push(recipes[i]);
  }
  return currentRecipes;
};
