const initialState = {
  item: null,
  status: "loading",
};

export default function itemReducer(state = initialState, action) {
  switch (action.type) {
    // case "REQUEST_ITEMS": {
    //   return { ...state, status: "loading" };
    // }
    case "RECEIVE_ITEM": {
      return { ...state, item: action.item, status: "idle" };
    }
    default: {
      return state;
    }
  }
}

export const getStoreItem = (state) => {
  return state.item.item;
};
