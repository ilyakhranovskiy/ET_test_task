import React, { useEffect, useReducer } from "react";
import { getAll, getAllShops, search } from "../../services/medService";
import Thumbnails from "../../components/Main/Thumbnails";
import Sidebar from "../../components/SideBar/Sidebar";
import classes from "./homepage.module.css";
import { useCart } from "../../hooks/useCart";
import { useParams } from "react-router-dom";

const initialState = { drugs: [], shops: [] };

const reducer = (state, action) => {
  switch (action.type) {
    case "DRUGS_LOADED":
      return { ...state, drugs: action.payload };
    case "SHOPS_LOADED":
      return { ...state, shops: action.payload };

    default:
      return state;
  }
};
export default function HomePage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { drugs, shops } = state;
  const { addToCart } = useCart();
  const { searchTerm, shop } = useParams();

  useEffect(() => {
    getAllShops().then((shops) =>
      dispatch({ type: "SHOPS_LOADED", payload: shops })
    );

    const loadDrugs = searchTerm ? search(searchTerm) : getAll();

    loadDrugs.then((drugs) =>
      dispatch({ type: "DRUGS_LOADED", payload: drugs })
    );
  }, [searchTerm, shop]);

  return (
    <div className={classes.homepage}>
      <Sidebar shops={shops} />
      <Thumbnails drugs={drugs} addToCart={addToCart} />
    </div>
  );
}
