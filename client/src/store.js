import {
  getAllProductsReducer,
  getProductByIdReducer,
  addProductReducer,
  getProductByUserIdReducer,
  deleteProductReducer,
  commentListProductReducer,
  getAllProductByCategoryReducer,
  getAllProductByPlatformReducer,
  getAllProductByGenreReducer,
} from "./reducers/productReducer";

import { getTransactionByUserIdReducer } from "./reducers/transactionReducer";

import {
  isFollowingUserReducer,
  getFollowersReducer,
} from "./reducers/followReducer";

import {
  socalMediaAuthReducer,
  emailPasswordRegisterReducer,
  userInfoReducer,
  emailPasswordLoginReducer,
  favoriteReducer,
  getUserByIdReducer,
  getAllUserByCountPostReducer,
  searchUserReducer,
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
  getProductByUserIdReducer,
  deleteProductReducer,
  userInfoReducer,
  commentListProductReducer,
  favoriteReducer,
  getUserByIdReducer,
  getAllProductByCategoryReducer,
  getTransactionByUserIdReducer,
  getAllUserByCountPostReducer,
  searchUserReducer,
  isFollowingUserReducer,
  getFollowersReducer,
  getAllProductByPlatformReducer,
  getAllProductByGenreReducer,
});

const currentUser = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser"))
  : null;

const initialState = {
  userInfoReducer: { currentUser: currentUser },
};

const composeEnhancers = composeWithDevTools({
  // Specify here name, actionsBlacklist, actionsCreators and other options
});

const store = createStore(
  finalReducer,
  initialState,
  composeEnhancers(
    applyMiddleware(thunk)
    // other store enhancers if any
  )
);

export default store;
