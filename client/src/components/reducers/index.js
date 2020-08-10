import { combineReducers } from "redux";

import items from "./items.reducer";
import item from "./item.reducer";
import companies from "./companies.reducer";

export default combineReducers({ items, companies, item });
