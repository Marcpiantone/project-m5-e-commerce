const initialState = {
  order: null,
  status: "loading",
};

export default function orderReducer(state = initialState, action) {
  switch (action.type) {
    case "REQUEST_ORDER": {
      return { ...state, status: "loading" };
    }
    case "RECEIVE_ORDER": {
      return { ...state, order: action.order, status: "idle" };
    }
    case "RECEIVE_ORDER_ERROR": {
      return { ...state, order: action.order, status: "error" };
    }
    default: {
      return state;
    }
  }
}

export const getOrder = (state) => {
  return state.order;
};
