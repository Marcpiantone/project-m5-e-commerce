import React from "react";
import styled from "styled-components";
import { NavLink, Link } from "react-router-dom";
import { getCartItemArray } from "./reducers/cart.reducer";
import { useSelector } from "react-redux";

import SearchBar from "./SearchBar";

const Header = () => {
  const cartItems = useSelector(getCartItemArray);
  let numCartItems = 0;

  cartItems.forEach((item) => {
    numCartItems = Number(numCartItems) + Number(item.quantity);
  });

  return (
    <Spacer>
      <HeaderDiv>
        <ShopLink to="/shop">GO-GO-GADGETS</ShopLink>
        <HeaderLinks>
          <StyledNavLink to="/about">ABOUT</StyledNavLink>
          <StyledNavLink to="/contact">CONTACT</StyledNavLink>
          <StyledNavLink to="/shop">SHOP</StyledNavLink>
          <StyledNavLink to="/cart">
            VIEW CART{numCartItems > 0 && <span>({numCartItems})</span>}
          </StyledNavLink>
          <StyledNavLink to="/order">VIEW ORDER</StyledNavLink>
          <SearchBar />
        </HeaderLinks>
      </HeaderDiv>
    </Spacer>
  );
};
const Spacer = styled.div`
  height: 140px;
  /* width: 100vw; */
  background-color: red;
  z-index: 4;
`;
const HeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 40px 20px;
  height: 140px;
  width: 100%;
  position: fixed;
  z-index: 5;
  background-color: white;
`;

const ShopLink = styled(Link)`
  background-image: linear-gradient(to right, #52d7e0, #0036b3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 50px;
`;

const StyledNavLink = styled(NavLink)`
  color: #0036b3;
  margin: 0px 10px;

  &:hover {
    border-bottom: 1px solid #0036b3;
  }
`;

const HeaderLinks = styled.div`
  display: flex;
  height: 18px;
`;

export default Header;
