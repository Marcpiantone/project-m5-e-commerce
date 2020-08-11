import React from "react";
import { Link } from "react-router-dom";
import ShopItem from "./ShopItem";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { getStoreItems } from "./reducers/items.reducer";
import {
  getFilterCategory,
  getFilterbodyLocation,
} from "./reducers/filter.reducer";
import { updateCategory, updateBodyLocation } from "../actions";
import Cart from "./Cart";
import { addCart } from "../actions";

const Shop = () => {
  const dispatch = useDispatch();

  const shopItems = useSelector(getStoreItems);
  const shopItemsArray =
    shopItems.items !== null ? Object.values(shopItems.items.items) : [];

  const status = shopItems.status;

  // if (shopItems !== null) {
  //   console.log("shopItemsArray", shopItemsArray);
  // }
  //console.log("status", status);

  const activeCategory = useSelector(getFilterCategory);
  const activeBodyLocation = useSelector(getFilterbodyLocation);

  const toggleCategory = (ev) => {
    dispatch(updateCategory(ev.target.value));
  };

  const toggleBodyLocation = (ev) => {
    dispatch(updateBodyLocation(ev.target.value));
  };

  const categoryFilterArray =
    activeCategory === "All"
      ? shopItemsArray
      : shopItemsArray.filter((item) => item.category === activeCategory);

  const mapShopItemsArray =
    activeBodyLocation === "All"
      ? categoryFilterArray
      : categoryFilterArray.filter(
          (item) => item.body_location === activeBodyLocation
        );

  return (
    <ShopPageAll>
      <ShopDiv>
        <Header>
          <Title>WEARABLES SHOP</Title>
          <FilterDiv>
            <Category>
              <label htmlFor="category">WHAT:</label>
              <Dropdown
                onChange={(ev) => toggleCategory(ev)}
                id="category"
                name="category"
                placeholder="Category"
              >
                <option
                  selected={activeCategory === "All" && "selected"}
                  value="All"
                >
                  Show All
                </option>
                <option
                  selected={activeCategory === "Entertainment" && "selected"}
                  value="Entertainment"
                >
                  Entertainment
                </option>
                <option
                  selected={activeCategory === "Fitness" && "selected"}
                  value="Fitness"
                >
                  Fitness
                </option>
                <option
                  selected={activeCategory === "Gaming" && "selected"}
                  value="Gaming"
                >
                  Gaming
                </option>
                <option
                  selected={activeCategory === "Industrial" && "selected"}
                  value="Industrial"
                >
                  Industrial
                </option>
                <option
                  selected={activeCategory === "Lifestyle" && "selected"}
                  value="Lifestyle"
                >
                  Lifestyle
                </option>
                <option
                  selected={activeCategory === "Medical" && "selected"}
                  value="Medical"
                >
                  Medical
                </option>
                <option
                  selected={activeCategory === "Pets and Animals" && "selected"}
                  value="Pets and Animals"
                >
                  Pets and Animals
                </option>
              </Dropdown>
            </Category>
            <BodyLocation>
              <label htmlFor="bodylocation">WHERE:</label>
              <Dropdown
                onChange={(ev) => toggleBodyLocation(ev)}
                id="bodylocation"
                name="bodylocation"
              >
                {" "}
                {/* <option id="default-option" value={activeBodyLocation}>
                  {activeBodyLocation}
                </option> */}
                <option
                  selected={activeBodyLocation === "All" && "selected"}
                  value="All"
                >
                  Show All
                </option>
                <option
                  selected={activeBodyLocation === "Arms" && "selected"}
                  value="Arms"
                >
                  Arms
                </option>
                <option
                  selected={activeBodyLocation === "Chest" && "selected"}
                  value="Chest"
                >
                  Chest
                </option>
                <option
                  selected={activeBodyLocation === "Feet" && "selected"}
                  value="Feet"
                >
                  Feet
                </option>
                <option
                  selected={activeBodyLocation === "Hands" && "selected"}
                  value="Hands"
                >
                  Hands
                </option>
                <option
                  selected={activeBodyLocation === "Head" && "selected"}
                  value="Head"
                >
                  Head
                </option>
                <option
                  selected={activeBodyLocation === "Neck" && "selected"}
                  value="Neck"
                >
                  Neck
                </option>
                <option
                  selected={activeBodyLocation === "Waist" && "selected"}
                  value="Waist"
                >
                  Waist
                </option>
                <option
                  selected={activeBodyLocation === "Wrist" && "selected"}
                  value="Wrist"
                >
                  Wrist
                </option>
              </Dropdown>
            </BodyLocation>
          </FilterDiv>
        </Header>
        {status && status === "loading" ? (
          <div>LOADING</div>
        ) : (
          <ItemList>
            {mapShopItemsArray.map((item) => {
              //console.log(item.category);
              return (
                <div key={item.id}>
                  <Link to={`/items/${item.id}`}>
                    <ShopItem item={item} />
                  </Link>
                  <button onClick={() => dispatch(addCart(item))}>
                    Add to Cart - {item.price}
                  </button>
                </div>
              );
            })}
          </ItemList>
        )}
      </ShopDiv>
      <Cart />
    </ShopPageAll>
  );
};
const ShopDiv = styled.div`
  /* background-color: #6694ff; /* For browsers that do not support gradients */
  /* background-image: linear-gradient(to right, #52d7e0, #0036b3); */
  min-height: 100vh;
  flex: 3;
`;

const Header = styled.div`
  background-image: linear-gradient(to right, #52d7e0, #0036b3);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
`;

const Title = styled.h1`
  color: white;
  font-family: sans-serif;
`;

const FilterDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const Category = styled.div`
  margin: 10px;
  padding: 10px 0;
  font-family: sans-serif;
`;

const BodyLocation = styled.div`
  margin: 10px;
  padding: 10px 0;
  font-family: sans-serif;
`;

const Dropdown = styled.select`
  font-family: sans-serif;
  padding: 5px;
  margin: 10px;
  background-color: #aa80ff;
  color: white;
`;

const ItemList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const ShopPageAll = styled.div`
  display: flex;
  flex-basis: 100vw;
  position: relative;
`;

export default Shop;
