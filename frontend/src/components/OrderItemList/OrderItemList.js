import React from "react";
import { Link } from "react-router-dom";
import classes from "./orderItemList.module.css";

export default function OrderItemsList({ order }) {
  return (
    <table className={classes.table}>
      <tbody>
        <tr>
          <td colSpan="5">
            <h3>Order Items:</h3>
          </td>
        </tr>

        {order.items.map((item) => (
          <tr key={item.drug.id}>
            <td>
              <div>
                <img
                  src={`/medicine/${item.drug.imageURL}`}
                  alt={item.drug.name}
                />
              </div>
            </td>
            <td>{item.drug.name}</td>
            <td>
              <div price={item.drug.price} />
            </td>
            <td>{item.quantity}</td>
            <td>
              <div>{item.price}</div>
            </td>
          </tr>
        ))}

        <tr>
          <td colSpan="3"></td>
          <td>
            <strong>
              Total: <div>{order.totalPrice.toFixed(2)}</div>
            </strong>
          </td>
          <td></td>
        </tr>
      </tbody>
    </table>
  );
}
