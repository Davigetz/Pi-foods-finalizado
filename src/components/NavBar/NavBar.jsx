import React from "react";
import { Link } from "react-router-dom";
import NavBarstyle from "./navbar.module.css";
import Search from "./search";

function NavBar() {
  return (
    <div className={NavBarstyle.full}>
      <ul className={NavBarstyle.container}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/addReceta">+Receta</Link>
        </li>
        <li>
          <Search />
        </li>
      </ul>
    </div>
  );
}

export default NavBar;
