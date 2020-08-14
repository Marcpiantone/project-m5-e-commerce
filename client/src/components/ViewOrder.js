import React from "react";
import CartItem from "./CartItem";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { getCartItemArray } from "./reducers/cart.reducer";
import { beginPurchaseProcess, receiveOrder, requestOrder } from "../actions";
import { getOrder } from "./reducers/order.reducer";
// const { requestOrder } = require("../actions");

const ViewOrder = () => {
  const dispatch = useDispatch();

  const yourOrder = useSelector(getOrder).order;
  let yourOrderItems = [];
  if (yourOrder) {
    yourOrderItems = yourOrder.order;
  }
  console.log(yourOrder);
  console.log(yourOrderItems);

  let total = 0;
  let numCartItems = 0;

  yourOrderItems.forEach((item) => {
    console.log(item.price);
    console.log(item.quantity);
    total = total + Number(item.price.slice(1)) * Number(item.quantity);
    numCartItems = Number(numCartItems) + Number(item.quantity);
  });

  const [orderNumber, setOrderNumber] = React.useState("");

  const handleOrderById = (id) => {
    console.log("inside handleOrderById" + id);
    dispatch(requestOrder());
    fetch(`/orders/${id}`)
      .then((res) => res.json())
      .then((json) => {
        dispatch(receiveOrder(json));
      })
      .catch((err) => console.error(err));
  };

  return (
    <PageDiv>
      <DivBlock>
        <InputForm>
          <InputDiv>
            <label htmlFor="orderNumber">Please enter your order number:</label>
            <OrderNumberInput
              type="text"
              id="orderNumber"
              name="orderNumber"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
            ></OrderNumberInput>
          </InputDiv>
          <SubmitButton
            onClick={(ev) => {
              ev.preventDefault();
              handleOrderById(orderNumber);
              setOrderNumber("");
            }}
          >
            SUBMIT
          </SubmitButton>
        </InputForm>
        {yourOrderItems.length > 0 && (
          <>
            <CartDiv>
              <CartTitle>
                <h3> Order Number {yourOrder.id}</h3>
                <p>
                  for {yourOrder.firstName} {yourOrder.lastName}
                </p>
                <p>{numCartItems} item(s):</p>
              </CartTitle>
              <ListDiv>
                {yourOrder.order.map((item) => {
                  return (
                    <ItemDiv key={item.id}>
                      <CartItemDiv>
                        <ItemName>
                          <div>{item.name}</div>
                        </ItemName>
                        <QuantityDiv>
                          <p>Quantity:{item.quantity}</p>
                        </QuantityDiv>
                      </CartItemDiv>
                    </ItemDiv>
                  );
                })}
              </ListDiv>
              <BottomPart>
                <Total>Total: ${total.toFixed(2)}</Total>
              </BottomPart>
            </CartDiv>
          </>
        )}
      </DivBlock>
    </PageDiv>
  );
};

const InputForm = styled.form`
  display: flex;
  padding: 10px;
  height: 40px;
  align-items: center;
`;

const CartItemDiv = styled.div``;

const QuantityDiv = styled.div`
  display: flex;
  align-items: center;
`;

const ItemName = styled.div`
  display: flex;
`;

const OrderNumberInput = styled.input`
  margin: 0 20px;
  width: 200px;
`;

const InputDiv = styled.div`
  color: black;
`;

const SubmitButton = styled.button`
  background-color: #006666;
  color: white;
  font-family: "Spartan";
  border: none;
  outline: none;
  padding: 5px;
  &:hover {
    cursor: pointer;
    background-color: #28bbbd;
  }
`;

const PageDiv = styled.div`
  width: 100vw;
  height: calc(100vh - 140px);
  display: flex;
  flex-direction: column;
`;

const DivBlock = styled.div`
  display: flex;
  justify-content: center;
  background-image: linear-gradient(to right, #52d7e0, #0036b3);
  flex: 3;
`;

const CartDiv = styled.div`
  /* flex: 3; */
  margin-top: 20px;
  position: fixed;
  top: 140px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 60%;
  padding: 30px;
  height: calc(100vh - 140px);
`;

const CartTitle = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;

const ListDiv = styled.div`
  overflow-y: scroll;
`;
const ItemDiv = styled.div`
  border: 1px dashed white;
  padding: 10px;
`;

const BottomPart = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  margin-top: 20px;
`;

const Total = styled.div`
  color: white;
`;

export default ViewOrder;
