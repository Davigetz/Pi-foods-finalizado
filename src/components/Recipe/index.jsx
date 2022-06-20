import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import style from "./recipe.module.css"

function RecipeCp({ recipe }) {
  const [pasos, setPasos] = useState(null)
  const [alternativePasos, setAltPasos] = useState(null)
  useEffect(() => {
    console.log(recipe.pasoApaso)
    if (recipe.pasoApaso.includes("[")) {
      let steps = JSON.parse(recipe.pasoApaso)
      if (steps.length > 0) {
        steps = steps["0"]["steps"]
        setPasos(steps)
      }
    } else {
      setAltPasos(recipe.pasoApaso)
    }


  }, [])
  return (
    <div>
      <figure className={style.fig}>
        <div className="">
          <h1 className={style.texto}>{recipe.name}</h1>
          {recipe.imageLink && (
            <img src={recipe.imageLink} width="304" height="228" alt={`Imagen receta ${recipe.name}`} />
          )}
          <figcaption>

            <p dangerouslySetInnerHTML={{ __html: recipe.resumenPlato }}></p>
            <ul className="">
              {recipe.Diets &&
                recipe.Diets.map((d) => <li key={d.id}>{d.name}</li>)}
            </ul>
          </figcaption>
          {pasos && pasos.map((paso) => {
            return (
              <ul key={paso.number}>
                {paso.step}
              </ul>
            )
          })}
          {alternativePasos}
        </div>
      </figure>
    </div>
  );
}

export default RecipeCp;
