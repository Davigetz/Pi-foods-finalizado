import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  fetchRecipes,
  recipeNameAdded,
} from "../../redux/recipes/recipesSlice";
import searchStyle from "./navbar.module.css";
function Search() {
  const dispatch = useDispatch();
  const [input, setInput] = useState({ name: null });

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(recipeNameAdded(input.name));
    dispatch(fetchRecipes({ ...input }));
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        className={searchStyle.search}
        placeholder="Buscar..."
        onChange={handleChange}
      />
      <input type="submit" className={searchStyle.send} value="s" />
    </form>
  );
}

export default Search;
