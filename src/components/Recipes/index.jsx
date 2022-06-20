import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchRecipes,
  selectAllRecipes,
  filterByDiet
} from "../../redux/recipes/recipesSlice";
import Spinner from "../Spinner";
import recipeStyles from "./recipe.module.css";

function Recipes() {
  const [state, setState] = useState({ name: null, page: null });
  const dispatch = useDispatch();
  const recipes = useSelector(selectAllRecipes);
  const recipesStatus = useSelector((state) => state.recipes.status);
  const error = useSelector((state) => state.recipes.error);
  useEffect(() => {
    if (recipesStatus === "idle") {
      dispatch(fetchRecipes({ ...state }));
    }
  }, [recipesStatus, state, dispatch]);

  let content;
  if (recipesStatus === "loading") {
    content = <Spinner />;
  } else if (recipesStatus === "succeeded") {
    content = recipes.map((recipe) => {
      return (
        <figure className={recipeStyles.figura} key={recipe.id}>
          <div className={recipeStyles.figuraInside}>
            <img src={recipe.imageLink} width="304" height="228" alt={`Imagen-receta-${recipe.name}`} />
            <figcaption className={recipeStyles.containerCaption}>
              <h2 className={recipeStyles.letras}>
                <Link to={`recipe/${recipe.id}`}>{recipe.name}</Link>
              </h2>
              <ul className={recipeStyles.listaDatos}>
                <li>
                  {recipe.minutos && <h4 className={recipeStyles.titulo}>Listo en minutos:</h4>}
                  {recipe.minutos && <h5 className={recipeStyles.subtitulo}>{recipe.minutos} </h5>}
                </li>
                <li>
                  {recipe.porcion && <h4 className={recipeStyles.titulo}>Porcion para:</h4>}
                  {recipe.porcion && <h5 className={recipeStyles.subtitulo}>{recipe.porcion}</h5>}
                </li>
                <li>
                  {recipe.scoreSaludable && <h4 className={recipeStyles.titulo}>Puntos Saludable:</h4>}
                  {recipe.scoreSaludable && <h5 className={recipeStyles.subtitulo}>{recipe.scoreSaludable}</h5>}
                </li>
              </ul>
              <ul className={recipeStyles.lista}>
                {recipe.Diets && recipe.Diets.map((d) => (
                  <li key={d.id} onClick={() => dispatch(filterByDiet({ dieta: d.name }))}>{d.name}</li>
                ))}
              </ul>

            </figcaption>
          </div>
        </figure>
      );
    });
  } else if (recipesStatus === "failed") {
    content = <div>{error}</div>;
  }
  return <section className={recipeStyles.container}>{content}</section>;
}

export default Recipes;
