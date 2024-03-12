import React from "react";
import classes from "./sidebar.module.css";
import { Link } from "react-router-dom";

export default function Sidebar({ shops }) {
  return (
    <div className={classes.sidebar}>
       
      {/* <ul>
        <li>Drugs 24</li>
        <li>Pharmacy One</li>
        <li>HealthPlus</li>
      </ul> */}

      {shops.map((shop) => (
        <Link key={shop.name} to={`/shop/${shop.name}`}>
          {shop.name}
        </Link>
      ))}
    </div>
  );
}
