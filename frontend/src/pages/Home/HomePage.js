import React, { useEffect, useReducer } from "react";
import { getAll } from "../../services/medService";
import Thumbnails from "../../components/Main/Thumbnails";
import Sidebar from "../../components/SideBar/Sidebar";
import classes from './homepage.module.css'

const initialState = { drugs: [] };

const reducer = (state, action) => {
  switch (action.type) {
    case "LOADED":
      return { ...state, drugs: action.payload };
    default:
      return state;
  }
};
export default function HomePage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { drugs } = state;

  useEffect(() => {
    getAll().then((drugs) => dispatch({ type: "LOADED", payload: drugs }));
  }, []);
  return (
    <div className={classes.homepage}>
      <Sidebar drugs={drugs} /> 
      <Thumbnails drugs={drugs} />
    </div>
  );
}
