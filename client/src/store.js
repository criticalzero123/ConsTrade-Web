import {
  getAllProductsReducer,
  getProductByIdReducer,
  addProductReducer,
} from "./reducers/productReducer";

import {
  socalMediaAuthReducer,
  emailPasswordRegisterReducer,
  emailPasswordLoginReducer,
} from "./reducers/userReducer";
import { combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

const finalReducer = combineReducers({
  getAllProductsReducer,
  getProductByIdReducer,
  socalMediaAuthReducer,
  emailPasswordRegisterReducer,
  emailPasswordLoginReducer,
  addProductReducer,
});

const composeEnhancers = composeWithDevTools({
  // Specify here name, actionsBlacklist, actionsCreators and other options
});

const store = createStore(
  finalReducer,
  composeEnhancers(
    applyMiddleware(thunk)
    // other store enhancers if any
  )
);

export default store;
