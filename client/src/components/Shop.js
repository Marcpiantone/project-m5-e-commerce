import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import ShopItem from "./ShopItem";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { getStoreItems } from "./reducers/items.reducer";
import { getCompanies } from "./reducers/companies.reducer";
import {
  getFilterCategory,
  getFilterbodyLocation,
  getFilterCompany,
} from "./reducers/filter.reducer";
import {
  updateCategory,
  updateBodyLocation,
  updateCompany,
  receiveCompanies,
} from "../actions";
import Cart from "./Cart";

import Header from "./Header";
import PurchaseModal from "./PurchaseModal";
import Loading from "./Loading";

const Shop = () => {
  const dispatch = useDispatch();

  const shopItems = useSelector(getStoreItems);
  const shopItemsArray =
    shopItems.items !== null ? Object.values(shopItems.items.items) : [];

  console.log(shopItems, "items");
  console.log(shopItemsArray, "item Array");
  const status = shopItems.status;
  const activeCategory = useSelector(getFilterCategory);
  const activeBodyLocation = useSelector(getFilterbodyLocation);
  const activeCompany = useSelector(getFilterCompany);

  const handleCompanies = () => {
    fetch(`/companies`)
      .then((res) => res.json())
      .then((json) => {
        dispatch(receiveCompanies(json));
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    console.log(status);
    if (status === "idle") {
      handleCompanies(shopItemsArray.companyId);
    }
  }, [status]);

  const companies = useSelector(getCompanies);
  console.log(companies);

  //console.log(activeCompany, "company");

  const toggleCategory = (ev) => {
    dispatch(updateCategory(ev.target.value));
    setCurrentPage(1);
  };

  const toggleBodyLocation = (ev) => {
    dispatch(updateBodyLocation(ev.target.value));
    setCurrentPage(1);
  };

  const toggleCompany = (ev) => {
    dispatch(updateCompany(Number(ev.target.value)));
  };

  const categoryFilterArray =
    activeCategory === "All"
      ? shopItemsArray
      : shopItemsArray.filter((item) => item.category === activeCategory);

  const bodyLocationFilterArray =
    activeBodyLocation === "All"
      ? categoryFilterArray
      : categoryFilterArray.filter(
          (item) => item.body_location === activeBodyLocation
        );

  const mapShopItemsArray =
    activeCompany === 0
      ? bodyLocationFilterArray
      : bodyLocationFilterArray.filter(
          (item) => item.companyId === activeCompany
        );

  const totalItemCount = mapShopItemsArray.length;
  //console.log(totalItemCount);
  const [maxNumItemsPerPage, setMaxNumItemsPerPage] = React.useState(15);

  const numOfPages = Math.ceil(totalItemCount / maxNumItemsPerPage);

  let pagesArray = [];

  for (let i = 1; i <= numOfPages; i++) {
    pagesArray.push(i);
    //console.log("pagesArray: ", pagesArray);
  }

  const [currentPage, setCurrentPage] = React.useState(1);

  const goToPage = (pageNum) => {
    setCurrentPage(pageNum);
  };

  //console.log(currentPage);

  const currentPageArray =
    mapShopItemsArray.length === maxNumItemsPerPage
      ? mapShopItemsArray
      : mapShopItemsArray.slice(
          maxNumItemsPerPage * (currentPage - 1),
          maxNumItemsPerPage * currentPage
        );

  const activePageStyle = { backgroundColor: "blue" };

  const toggleNumItemsPerPage = (ev) => {
    setMaxNumItemsPerPage(ev.target.value);
  };

  const itemsPerPageDisplay =
    mapShopItemsArray.length > 15
      ? { visibility: "visible" }
      : { visibility: "hidden" };

  return (
    <>
      <Header />
      <ShopPageAll>
        <SpacerDiv>
          <FilterDiv>
            <BodyLocation>
              <label htmlFor="bodylocation">WHO:</label>
              <Dropdown
                onChange={(ev) => toggleCompany(ev)}
                defaultValue={activeCompany}
                id="company"
                name="company"
              >
                <option value="0">Show All</option>
                {companies.status === "idle" &&
                  companies.companies.companies.map((company) => {
                    return <option value={company.id}>{company.name}</option>;
                  })}
              </Dropdown>
            </BodyLocation>
            <Category>
              <label htmlFor="category">WHAT:</label>
              <Dropdown
                onChange={(ev) => toggleCategory(ev)}
                defaultValue={activeCategory}
                id="category"
                name="category"
                placeholder="Category"
              >
                <option value="All">Show All</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Fitness">Fitness</option>
                <option value="Gaming">Gaming</option>
                <option value="Industrial">Industrial</option>
                <option value="Lifestyle">Lifestyle</option>
                <option value="Medical">Medical</option>
                <option value="Pets and Animals">Pets and Animals</option>
              </Dropdown>
            </Category>
            <BodyLocation>
              <label htmlFor="bodylocation">WHERE:</label>
              <Dropdown
                onChange={(ev) => toggleBodyLocation(ev)}
                defaultValue={activeBodyLocation}
                id="bodylocation"
                name="bodylocation"
              >
                <option value="All">Show All</option>
                <option value="Arms">Arms</option>
                <option value="Chest">Chest</option>
                <option value="Feet">Feet</option>
                <option value="Hands">Hands</option>
                <option value="Head">Head</option>
                <option value="Neck">Neck</option>
                <option value="Waist">Waist</option>
                <option value="Wrist">Wrist</option>
              </Dropdown>
            </BodyLocation>
          </FilterDiv>
        </SpacerDiv>
        <ShopDiv>
          {status && status === "loading" ? (
            <Loading />
          ) : (
            <>
              <>
                <Display>
                  <Pagination style={itemsPerPageDisplay}>
                    <NumItems>
                      show
                      <Dropdown
                        onChange={(ev) => toggleNumItemsPerPage(ev)}
                        defaultValue={maxNumItemsPerPage}
                        id="numItemsPerPage"
                        name="numItemsPerPage"
                      >
                        <option value={15}>15</option>
                        <option value={30}>30</option>
                        <option value={45}>45</option>
                        <option value={60}>60</option>
                        <option value={mapShopItemsArray.length}>all</option>
                      </Dropdown>
                      items per page
                    </NumItems>
                  </Pagination>
                  {mapShopItemsArray.length === 0 ? (
                    <SorryMessage>
                      Sorry, we couldn't find any products that match your
                      selection.
                    </SorryMessage>
                  ) : (
                    <>
                      <ItemList>
                        {currentPageArray.map((item) => {
                          //console.log(item.category);
                          return (
                            <div key={item.id}>
                              {/* <Link to={`/items/${item.id}`}> */}
                              <ShopItem item={item} />
                              {/* </Link> */}
                            </div>
                          );
                        })}
                      </ItemList>
                      <Pagination>
                        {mapShopItemsArray.length > maxNumItemsPerPage && (
                          <>
                            <PagesList>
                              <PageNav
                                onClick={() => {
                                  currentPage > 1 && goToPage(currentPage - 1);
                                }}
                              >
                                PREV
                              </PageNav>
                              {pagesArray.map((pageNum) => {
                                return (
                                  <PageNav
                                    style={{
                                      backgroundColor:
                                        currentPage === pageNum
                                          ? "#006666"
                                          : "#28bbbd",
                                    }}
                                    key={pageNum}
                                    onClick={() => goToPage(pageNum)}
                                  >
                                    {pageNum}
                                  </PageNav>
                                );
                              })}
                              <PageNav
                                onClick={() => {
                                  currentPage < pagesArray.length &&
                                    goToPage(currentPage + 1);
                                }}
                              >
                                NEXT
                              </PageNav>
                            </PagesList>
                          </>
                        )}
                      </Pagination>
                    </>
                  )}
                </Display>
              </>
            </>
          )}
        </ShopDiv>
        <Cart />
        <PurchaseModal />
      </ShopPageAll>
    </>
  );
};

const Pagination = styled.div`
  padding: 5px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NumItems = styled.div`
  color: #006666;
`;
const PageNav = styled.li`
  padding: 5px;
  &:hover {
    cursor: pointer;
    border: 1px solid #006666;
  }
`;
const Display = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const PagesList = styled.ul`
  background: #28bbbd;
  display: flex;
  justify-content: space-between;
`;
const SpacerDiv = styled.div`
  height: calc(100vh-120px);
  flex: 1;
`;

const ShopDiv = styled.div`
  height: calc(100vh - 140px);
  flex: 3;
  display: flex;
  justify-content: center;
`;

const Title = styled.h1`
  color: white;
  font-family: sans-serif;
`;

const FilterDiv = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  flex: 2;
`;

const Category = styled.div`
  margin: 10px;
  padding: 10px;
  font-family: "Spartan";
  color: #006666;
`;

const BodyLocation = styled.div`
  margin: 10px;
  padding: 10px;
  font-family: "Spartan";
  color: #006666;
`;

const Company = styled.div`
  margin: 10px;
  padding: 10px;
  font-family: sans-serif;
  color: #006666;
`;

const Dropdown = styled.select`
  font-family: "Spartan";
  padding: 5px;
  margin: 10px;
  background-color: #006666;
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
  margin: 0;
  padding: 0;
`;

const SorryMessage = styled.div`
  color: #006666;
`;

export default Shop;
