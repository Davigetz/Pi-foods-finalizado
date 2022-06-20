import { configureStore } from "@reduxjs/toolkit";
import recipesReducer from "./recipes/recipesSlice";
import recipeReducer from "./recipes/recipeSlice";
import dietsReducer from "./recipes/dietsSlice";
export default configureStore({
  reducer: {
    recipes: recipesReducer,
    diets: dietsReducer,
    recipe: recipeReducer,
  },
});
