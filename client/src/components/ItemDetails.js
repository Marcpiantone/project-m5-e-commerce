import styled from "styled-components";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getStoreItem } from "./reducers/item.reducer";
import { getCompany } from "./reducers/company.reducer";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { addCart } from "../actions";

import {
  requestItem,
  receiveItem,
  receiveCompany,
  updateCategory,
  updateBodyLocation,
  updateCompany,
} from "../actions";

const ItemDetails = () => {
  const params = useParams();
  const id = params.itemId;

  const dispatch = useDispatch();

  const handleItem = (id) => {
    dispatch(requestItem());
    fetch(`/items/${id}`)
      .then((res) => res.json())
      .then((json) => {
        dispatch(receiveItem(json));
      })
      .catch((err) => console.error(err));
  };

  const handleCompany = (id) => {
    fetch(`/companies/${id}`)
      .then((res) => res.json())
      .then((json) => {
        dispatch(receiveCompany(json));
      })
      .catch((err) => console.error(err));
  };

  const item = useSelector(getStoreItem);

  useEffect(() => {
    handleItem(id);
  }, [id]);

  useEffect(() => {
    if (item.status === "idle") {
      handleCompany(item.item.companyId);
    }
  }, [item.status, id]);

  const company = useSelector(getCompany);

  console.log(item, "item");
  console.log(company, "company");

  const toggleCategory = (target) => {
    dispatch(updateCategory(target));
  };

  const toggleBodyLocation = (target) => {
    dispatch(updateBodyLocation(target));
  };

  const toggleCompany = (target) => {
    dispatch(updateCompany(target));
  };

  if (item.status === "loading") {
    return <>LOADING</>;
  } else {
    return (
      <Wrapper>
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
            <div>
              <ItemName>{item.item.name}</ItemName>
              <LinkDiv>
                <span style={{ color: "grey" }}> tags: </span>
                <StyledLink
                  key={item.item.category}
                  to="/shop"
                  onClick={() => {
                    toggleCategory(item.item.category);
                    toggleBodyLocation("All");
                    toggleCompany(0);
                  }}
                >
                  {item.item.category}
                </StyledLink>
                <StyledLink
                  key={item.item.body_location}
                  to="/shop"
                  onClick={() => {
                    toggleBodyLocation(item.item.body_location);
                    toggleCategory("All");
                    toggleCompany(0);
                  }}
                >
                  {item.item.body_location}
                </StyledLink>
                {company.status === "idle" && (
                  <StyledLink
                    key={company.company.id}
                    to="/shop"
                    onClick={() => {
                      toggleCompany(company.company.id);
                      toggleCategory("All");
                      toggleBodyLocation("All");
                    }}
                  >
                    {company.company.name}
                  </StyledLink>
                )}
              </LinkDiv>
              <ItemPrice>{item.item.price}</ItemPrice>
            </div>
            {item.item.numInStock === 0 ? null : (
              <PurchaseButton onClick={() => dispatch(addCart(item.item))}>
                ADD TO CART
              </PurchaseButton>
            )}

            <OriginDiv>
              {company.status === "idle" && (
                <>
                  <span>made by </span>
                  <a target="_blank" href={company.company.url}>
                    {company.company.name}
                  </a>
                  <span> in {company.company.country}</span>
                </>
              )}
            </OriginDiv>
          </ItemInfo>
        </ItemDiv>
      </Wrapper>
    );
  }
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ItemDiv = styled.div`
  color: black;
  font-family: sans-serif;
  margin-top: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
  position: relative;
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
  height: 400px;
  width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 30px;
`;

const ItemName = styled.h1`
  margin-bottom: 20px;
`;

const LinkDiv = styled.div`
  display: flex;
`;

const StyledLink = styled(Link)`
  text-align: center;
  width: 60px;
  font-size: 0.75em;
  margin: 0px 10px 20px 10px;
  padding: 3px;
  text-decoration: none;
  border: solid 1px grey;
  color: grey;
  &:hover {
    background-color: #aa80ff;
    color: white;
  }
`;

const ItemPrice = styled.p`
  margin-top: 10px;
  margin-bottom: 20px;
  font-size: 25px;
`;

const OriginDiv = styled.div``;

const PurchaseButton = styled.button`
  width: 350px;
  margin-top: 30px;
  background-color: #aa80ff;
  color: white;
  border: none;
  padding: 10px 20px;
  margin-bottom: 30px;
  &:hover {
    cursor: pointer;
    background-color: #443366;
  }
`;

export default ItemDetails;
