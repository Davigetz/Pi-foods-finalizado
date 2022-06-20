import React from "react";
import spinnerStyles from "./spinner.module.css";
function Spinner() {
  return (
    <div className={spinnerStyles.full}>
      <div>
        <h1 className={spinnerStyles.texto}>Loading...</h1>
      </div>
    </div>
  );
}

export default Spinner;
