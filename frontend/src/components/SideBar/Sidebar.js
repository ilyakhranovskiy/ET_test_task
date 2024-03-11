import React from "react";
import classes from "./sidebar.module.css";

export default function Sidebar({ drugs }) {
  return (
    <div className={classes.sidebar}>
      <ul>
        <li>Drugs 24</li>
        <li>Pharmacy One</li>
        <li>HealthPlus</li>
      </ul>
    </div>
  );
}
