import styled from "styled-components";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getStoreItem } from "./reducers/item.reducer";
import { useParams } from "react-router-dom";
import { receiveItem } from "../actions";
import { Link } from "react-router-dom";

const ItemDetails = () => {
  const params = useParams();
  const id = params.itemId;

  const dispatch = useDispatch();

  const handleItem = (id) => {
    fetch(`/items/${id}`)
      .then((res) => res.json())
      .then((json) => {
        dispatch(receiveItem(json));
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    handleItem(id);
  }, []);

  const item = useSelector(getStoreItem);
  console.log(item, "item");
  // const itemArray = item !== null ? Object.values(item) : [];

  // console.log(itemArray, "item array");

  if (item.status === "loading") {
    return <>LOADING</>;
  } else {
    return (
      <ItemDiv>
        {item.item.numInStock === 0 ? (
          <ImageDiv>
            <SoldOut>SOLD OUT</SoldOut>
            <ItemImage
              src={item.item.imageSrc}
              alt={`${item.item.name} product`}
            />
          </ImageDiv>
        ) : (
          <ItemImage
            src={item.item.imageSrc}
            alt={`${item.item.name} product`}
          />
        )}
        <ItemInfo>
          <ItemName>{item.item.name}</ItemName>
          <ItemPrice>{item.item.price}</ItemPrice>
          <StyledLink key={item.item.category} to="/shop">
            {item.item.category}
          </StyledLink>
          <StyledLink key={item.item.companyId} to="/company:id">
            {item.item.companyId}
          </StyledLink>

          {item.item.numInStock === 0 ? null : (
            <PurchaseButton>ADD TO CART</PurchaseButton>
          )}
        </ItemInfo>
      </ItemDiv>
    );
  }
};

const ItemDiv = styled.div`
  font-family: sans-serif;
  width: 100vh;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImageDiv = styled.div``;

const SoldOut = styled.div`
  width: 100px;
  height: 50px;
  background-color: black;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ItemImage = styled.img`
  min-height: 400px;
  min-width: 400px;
  overflow: hidden;
`;

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 30px;
  width: 400px;
`;

const ItemName = styled.h1``;

const ItemPrice = styled.p``;

const StyledLink = styled(Link)`
  margin-bottom: 20px;
  text-decoration: none;
`;

const PurchaseButton = styled.button`
  background-color: #aa80ff;
  color: white;
  border: none;
  padding: 10px 20px;
  &:hover {
    cursor: pointer;
    background-color: #443366;
  }
`;

export default ItemDetails;
