import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar.jsx";
import AddRecipe from "./pages/AddRecipe/index.jsx";
import Home from "./pages/Home.jsx";
import NotMatch from "./pages/NotMatch/index.jsx";
import Recipe from "./pages/Recipe.jsx";

function App() {
  const dietas = useSelector((state) => state.diets);
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/addReceta">
          <AddRecipe diets={dietas.diets} />
        </Route>
        <Route path="/recipe/:id">
          <Recipe />
        </Route>
        <Route path="*">
          <NotMatch />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
