import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCartItemArray } from "./reducers/cart.reducer";
import { removeCart, addCart } from "../actions";

const Cart = () => {
  const cartItems = useSelector(getCartItemArray);

  //   // to be used in CartItem =
  //   //ADDING ITEM
  //   dispatch = useDispatch();
  //   dispatch(addCart(item))
  //   //REMOVING ITEM
  //   dispatch(removeCart(item))
};

export default Cart;
