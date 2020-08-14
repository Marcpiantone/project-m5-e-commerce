export const receiveItems = (items) => ({
  type: "RECEIVE_ITEMS",
  items,
});

export const receiveCompanies = (companies) => ({
  type: "RECEIVE_COMPANIES",
  companies,
});

export const receiveCompany = (company) => ({
  type: "RECEIVE_COMPANY",
  company,
});

export const requestItem = () => ({
  type: "REQUEST_ITEM",
});

export const receiveItem = (item) => ({
  type: "RECEIVE_ITEM",
  item,
});

export const updateCategory = (category) => ({
  type: "UPDATE_CATEGORY",
  category,
});

export const updateBodyLocation = (bodyLocation) => ({
  type: "UPDATE_BODYLOCATION",
  bodyLocation,
});

export const updateCompany = (company) => ({
  type: "UPDATE_COMPANY",
  company,
});

export const addCart = (item) => ({
  type: "ADD_ITEM",
  item,
});

export const removeCart = (item) => ({
  type: "REMOVE_ITEM",
  item,
});

export const updateQuantity = (item) => ({
  type: "UPDATE_QUANTITY",
  item,
});

export const beginPurchaseProcess = (data) => ({
  type: "BEGIN-PURCHASE-PROCESS",
  data,
});

export const cancelPurchaseProcess = () => ({
  type: "CANCEL-PURCHASE-PROCESS",
});

export const purchaseItemsFailure = (data) => ({
  type: "PURCHASE-ITEMS-FAILURE",
  data,
});

export const purchaseItemsSuccess = (data) => ({
  type: "PURCHASE-ITEMS-SUCCESS",
  data,
});

export const NumInStockUpdateSuccess = () => ({
  type: "NUM-IN-STOCK-UPDATE-SUCCESS",
});

export const clearCart = () => ({
  type: "CLEAR_CART",
});

export const closeCart = () => ({ type: "CLOSE_CART" });

export const requestOrder = () => ({ type: "REQUEST_ORDER" });

export const receiveOrder = (order) => ({ type: "RECEIVE_ORDER", order });

export const receiveOrderError = () => ({ type: "RECEIVE_ORDER_ERROR" });
