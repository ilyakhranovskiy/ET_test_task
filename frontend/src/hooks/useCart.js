import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);
const CART_KEY = "cart";
const EMPTY_CART = {
  items: [],
  totalPrice: 0,
  totalCount: 0,
};

export default function CartProvider({ children }) {
  const initCart = getCartFromLocalStorage();
  const [cartItems, setCartItems] = useState(initCart.items);

  const [totalPrice, setTotalPrice] = useState(initCart.totalPrice);
  const [totalCount, setTotalCount] = useState(initCart.totalCount);

  useEffect(() => {
    const totalPrice = sum(cartItems.map((item) => item.price));
    const totalCount = sum(cartItems.map((item) => item.quantity));
    setTotalPrice(totalPrice);
    setTotalCount(totalCount);

    localStorage.setItem(
      CART_KEY,
      JSON.stringify({
        items: cartItems,
        totalPrice,
        totalCount,
      })
    );
  }, [cartItems]);

  function getCartFromLocalStorage() {
    try {
      const storedCart = localStorage.getItem(CART_KEY);
      return storedCart ? JSON.parse(storedCart) : EMPTY_CART;
    } catch (error) {
      console.error("Error parsing cart data from localStorage:", error);
      return EMPTY_CART;
    }
  }

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
