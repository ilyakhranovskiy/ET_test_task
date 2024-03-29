import React from "react";
import classes from "./cartPage.module.css";
import { useCart } from "../../hooks/useCart";
import { Link } from "react-router-dom";
import Title from "../../components/Title/Title";
import NotFound from "../../components/NotFound/NotFound";

export default function CartPage() {
  const { cart, removeFromCart, changeQuantity } = useCart();

  return (
    <>
      <Title title="Cart Page" margin="1.5rem 0 0 2.5rem" />
      {cart.items.length === 0 ? (
        <NotFound message="Cart Page Is Empty!" />
      ) : (
        <div className={classes.container}>
          <ul className={classes.list}>
            {cart.items.map((item) => (
              <li key={item.drug.id}>
                <div>
                  <img
                    src={`/medicine/${item.drug.imageURL}`}
                    alt={item.drug.name}
                  />
                </div>
                <div>
                  <select
                    value={item.quantity}
                    onChange={(e) =>
                      changeQuantity(item, Number(e.target.value))
                    }
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                  </select>
                </div>
                <div>{item.price}</div>
                <div>
                  <button
                    className={classes.remove_button}
                    onClick={() => removeFromCart(item.drug.id)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className={classes.checkout}>
            <div>
              <div className={classes.drugs_count}>{cart.totalCount}</div>
              <div className={classes.total_price}>
                {cart.totalPrice.toFixed(2)}
              </div>
            </div>
            <Link to="/checkout">Proceed to checkout</Link>
          </div>
        </div>
      )}
    </>
  );
}
