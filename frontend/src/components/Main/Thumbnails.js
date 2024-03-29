import React from "react";
import classes from "./thumbnails.module.css";

export default function Thumbnails({ drugs, addToCart }) {
  
  return (
    <ul className={classes.list}>
      {drugs.map((drug) => (
        <li key={drug.id}>
          <img
            className={classes.image}
            src={`/medicine/${drug.imageURL}`}
            alt={drug.name}
          />
          <div className={classes.content}>
            <div className={classes.name}>{drug.name}</div>
            <span
              className={`${classes.favorite} ${
                drug.isFavorite ? "" : classes.not
              }`}
            >
              ❤
            </span>
            <div>{drug.price}</div>
          </div>
          <button onClick={()=>addToCart(drug)}>Add to Cart</button>
        </li>
      ))}
    </ul>
  );
}
