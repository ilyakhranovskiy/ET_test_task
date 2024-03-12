import React, { createContext, useContext, useEffect, useState } from "react";
import { sample_med } from "../data";

const CartContext = createContext(null);

export default function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(
    sample_med
      .slice(1, 4)
      .map((drug) => ({ drug, quantity: 1, price: drug.price }))
  );
  const [totalPrice, settotalPrice] = useState(40);
  const [totalCount, setTotalcount] = useState(3);

  useEffect(() => {
    const totalPrice = sum(cartItems.map((item) => item.price));
    const totalCount = sum(cartItems.map((item) => item.quantity));
    settotalPrice(totalPrice);
    setTotalcount(totalCount);
  }, [cartItems]);

  const sum = (items) => {
    return items.reduce((prevValue, curValue) => prevValue + curValue, 0);
  };

  const removeFromCart = (drugId) => {
    const filteredCartItems = cartItems.filter(
      (item) => item.drug.id !== drugId
    );
    setCartItems(filteredCartItems);
  };

  const changeQuantity = (cartItem, newQuantity) => {
    const { drug } = cartItem;

    const changedCartItem = {
      ...cartItem,
      quantity: newQuantity,
      price: drug.price * newQuantity,
    };

    setCartItems(
      cartItems.map((item) =>
        item.drug.id === drug.id ? changedCartItem : item
      )
    );
  };

  const addToCart = (drug) => {
    const cartItem = cartItems.find((item) => item.drug.id === drug.id);
    if (cartItem) {
      changeQuantity(cartItem, cartItem.quantity + 1);
    } else {
      setCartItems([...cartItems, { drug, quantity: 1, price: drug.price }]);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart: { items: cartItems, totalPrice, totalCount },
        removeFromCart,
        changeQuantity,
        addToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
