import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import MultipleSelectDropDown from "../../components/MultipleSelectionDropDown";
import { AddRecipes } from "../../redux/recipes/recipesSlice";
import addRecipeStyle from "./addrecipe.module.css";

function AddRecipe({ diets }) {
  const history = useHistory()
  const dispatch = useDispatch();

  const [selected, setSelected] = useState([]);
  const [recipe, setRecipe] = useState({
    title: "",
    score: null,
    paso: "",
    resumen: "",
    options: [...diets],
    selOp: "D",
  });
  const [errors, setErrors] = useState({});
  const [rtaerr, setRtaErrors] = useState(null)
  const [exito, setExito] = useState(null)
  useEffect(() => {
    if (recipe.options.length === 0) {
      history.push("/")
      // eslint-disable-next-line no-restricted-globals
      location.reload()
    }
  })

  const handleChange = (key, sanitizeFn) => (e) => {
    const value = sanitizeFn ? sanitizeFn(e.target.value) : e.target.value;
    setRecipe({
      ...recipe,
      [key]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validations = {
      title: {
        required: {
          value: true,
          message: "Se necesita un nombre de receta",
        },
        pattern: {
          value: "^[A-Za-z]*$",
          message:
            "No puede contener caracteres especiales o numeros en tu nombre.",
        },
      },
      score: {
        custom: {
          isValid: (value) =>
            parseInt(value, 10) < 101 && parseInt(value, 10) >= 0,
          message: "El score tiene que tener un valor entre 0 a 100 ",
        },
      },
    };
    if (validations) {
      let valid = true;
      const newErrors = {};
      for (const key in validations) {
        const value = recipe[key];
        const validation = validations[key];
        if (validation?.required?.value && !value) {
          valid = false;
          newErrors[key] = validation?.required?.message;
        }

        const pattern = validation?.pattern;
        if (pattern?.value && !RegExp(pattern.value).test(value)) {
          valid = false;
          newErrors[key] = pattern.message;
        }

        const custom = validation?.custom;
        if (custom?.isValid && !custom.isValid(value)) {
          valid = false;
          newErrors[key] = custom.message;
        }
      }

      if (!valid) {
        setErrors(newErrors);
        return;
      }
    }

    try {
      await dispatch(
        AddRecipes({
          name: recipe.title,
          pasoApaso: recipe.paso,
          scoreSaludable: recipe.score,
          resumenPlato: recipe.resumen,
          diets: selected,
        })
      ).unwrap()
      setRecipe({
        title: "",
        score: null,
        paso: "",
        resumen: "",
        options: [
          { id: 1, name: "dairy free" },
          { id: 2, name: "lacto ovo vegetarian" },
          { id: 3, name: "vegan" },
          { id: 4, name: "gluten free" },
          { id: 5, name: "paleolithic" },
          { id: 6, name: "primal" },
          { id: 7, name: "pescatarian" },
          { id: 8, name: "fodmap friendly" },
          { id: 9, name: "whole 30" },
        ],
      });
      setRtaErrors(null)
      setExito("Receta Creada Exitosamente")
    } catch (error) {
      console.log(error)
      setRtaErrors(error.error)
      setExito(null)
    } finally {
      setTimeout(() => {
        setExito(null)
      }, 3000)
    }

    setErrors({});
  };

  const toggleOption = ({ id }) => {
    setSelected((prevSelected) => {
      // if it's in, remove
      const newArray = [...prevSelected];
      if (newArray.includes(id)) {
        return newArray.filter((item) => item !== id);
        // else, add
      } else {
        newArray.push(id);
        return newArray;
      }
    });
  };

  return (
    <section className={addRecipeStyle.container}>
      <form onSubmit={handleSubmit} className={addRecipeStyle.forma}>
        <div className={addRecipeStyle.segment}>
          <h2>Agregar Receta</h2>
        </div>
        <input
          type="text"
          id="Title"
          name="title"
          placeholder="Nombre"
          value={recipe.title}
          onChange={handleChange("title")}
        // required
        />
        {errors.title && <p className={addRecipeStyle.error}>{errors.title}</p>}

        <textarea
          value={recipe.resumen}
          onChange={handleChange("resumen")}
          placeholder="Resumen Receta"
        />
        {errors.resumen && <p className={addRecipeStyle.error}>{errors.resumen}</p>}
        <textarea
          value={recipe.paso}
          onChange={handleChange("paso")}
          placeholder="Paso a paso de preparacion"
        />
        {errors.paso && <p className={addRecipeStyle.error}>{errors.paso}</p>}

        <input
          type="number"
          name="paso"
          placeholder="Puntacion Saludable"
          value={recipe.score}
          onChange={handleChange("score")}
        />
        {errors.score && <p className={addRecipeStyle.error}>{errors.score}</p>}
        <strong>Dietas:</strong>
        <MultipleSelectDropDown
          options={recipe.options}
          selected={selected}
          toggleOption={toggleOption}
        />
        <input type="submit" value="Enviar" className={addRecipeStyle.boton} />
      </form>
      <div className={addRecipeStyle.prompt}>{rtaerr}</div>
      <div className={addRecipeStyle.exito}>{exito}</div>
    </section>
  );
}

export default AddRecipe;
