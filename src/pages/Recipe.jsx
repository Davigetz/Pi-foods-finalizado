import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import RecipeCp from "../components/Recipe";
import Spinner from "../components/Spinner";
import StyleRecipe from "../components/Recipe/recipe.module.css"

function Recipe() {
  const { id } = useParams();
  let history = useHistory();
  const [recipe, setRecipe] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const API = `http://localhost:3001/recipes/${id}`;
  const fetchRecipe = () => {
    fetch(API)
      .then((res) => res.json())
      .then((res) => {
        setRecipe(res.msg);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      });
  };
  useEffect(() => {
    let ignore = false;
    fetchRecipe();
    return () => {
      ignore = true;
      setRecipe(null)
    };
  }, [loading]);
  if (loading) {
    return (
      <div style={{ paddingTop: "100px" }}>
        <Spinner />
      </div>
    );
  }
  if (error) {
    return <div style={{ paddingTop: "100px" }}>{error}</div>;
  }
  console.log("entre")
  return (
    <div className={StyleRecipe.container}>
      {recipe && <RecipeCp recipe={recipe} />}
      <button
        onClick={() => {
          history.goBack();
        }}
        className={StyleRecipe.back}
      >
        Volver
      </button>
    </div>
  );
}

export default Recipe;
