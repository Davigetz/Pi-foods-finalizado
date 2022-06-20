import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderBy from "../components/OrderBy";
import Paginate from "../components/pagination/paginate";
import Recipes from "../components/Recipes";
import Spinner from "../components/Spinner";
import { fetchDiets } from "../redux/recipes/dietsSlice";
import HomeStyle from "./home.module.css";
function Home() {
  const dispatch = useDispatch();
  // const diets = useSelector(selectAllDiets);

  const dietStatus = useSelector((state) => state.diets.status);
  const error = useSelector((state) => state.diets.error);
  useEffect(() => {
    if (dietStatus === "idle") {
      dispatch(fetchDiets());
    }
  }, [dietStatus, dispatch]);

  let content;
  let style;

  if (dietStatus === "loading") {
    content = <Spinner />;
    style = HomeStyle.extra;
  } else if (dietStatus === "succeeded") {
    content = <Recipes />;
    style = HomeStyle.container;
  } else if (dietStatus === "failed") {
    content = <div className={HomeStyle.errorContainer}>{error}</div>;
  }
  return (
    <div className={HomeStyle.container}>
      <div style={{ paddingTop: "90px" }}>
        <OrderBy />
      </div>
      {content}
      <div>
        <Paginate />
      </div>
    </div>
  );
}

export default Home;
