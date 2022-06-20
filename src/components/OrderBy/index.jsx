import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderBy } from "../../redux/recipes/recipesSlice";
import orderByStyle from "./order.module.css"

function OrderBy() {
  const [state, setState] = useState("A - Z");
  const [tiempo, setTiempo] = useState("minimo Tiempo")
  const [scoreOrder, setScoreOrder] = useState("Ascendente");
  const dispatch = useDispatch();
  return (
    <div className={orderByStyle.container}>
      <div className={orderByStyle.frase}>
        <h3
          onClick={() => {
            if (state === "A - Z") {
              dispatch(orderBy({ s: "+", vari: "name" }));
              setState("Z - A");
            }
            if (state === "Z - A") {
              dispatch(orderBy({ s: "-", vari: "name" }));
              setState("A - Z");
            }
          }}
        >
          {state}
        </h3>
      </div>
      <div className={orderByStyle.frase}>
        <h3
          onClick={() => {
            if (scoreOrder === "Ascendente") {
              dispatch(orderBy({ s: "+", vari: "score" }));
              setScoreOrder("Descendente");
            }
            if (scoreOrder === "Descendente") {
              dispatch(orderBy({ s: "-", vari: "score" }));
              setScoreOrder("Ascendente");
            }
          }}
        >
          Ordenar Puntos Saludables:{scoreOrder}
        </h3>
      </div>
      <div className={orderByStyle.frase}>
        <h3
          onClick={() => {
            if (tiempo === "minimo Tiempo") {
              dispatch(orderBy({ s: "+", vari: "t" }));
              setTiempo("Mayor Duracion");
            }
            if (tiempo === "Mayor Duracion") {
              dispatch(orderBy({ s: "-", vari: "t" }));
              setTiempo("minimo Tiempo");
            }
          }}
        >
          Ordenar por:{tiempo}
        </h3>
      </div>
    </div>
  );
}

export default OrderBy;
