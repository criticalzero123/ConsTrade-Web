import axios from "axios";

export const getAllProducts = () => (dispatch) => {
  dispatch({ type: "GET_PRODUCTS_REQUEST" });

  axios
    .get("/api/products/getallproducts")
    .then((res) => {
      dispatch({ type: "GET_PRODUCTS_SUCCESS", payload: res.data });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: "GET_PRODUCTS_FAILED", payload: err });
    });
};

export const getProductById = (id) => (dispatch) => {
  dispatch({ type: "GET_PRODUCT_BY_ID_REQUEST" });

  axios
    .post("/api/products/getproductbyid", { id })
    .then((res) => {
      dispatch({ type: "GET_PRODUCT_BY_ID_SUCCESS", payload: res.data });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: "GET_PRODUCT_BY_ID_FAILED", payload: err });
    });
};

export const getProductByUserId = (id) => (dispatch) => {
  dispatch({ type: "GET_PRODUCT_BY_USER_ID_REQUEST" });

  axios
    .post("/api/products/getProductByUserId", { id })
    .then((res) => {
      dispatch({ type: "GET_PRODUCT_BY_USER_ID_SUCCESS", payload: res.data });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: "GET_PRODUCT_BY_USER_ID_FAILED", payload: err });
    });
};

export const addProduct = (data) => (dispatch) => {
  dispatch({ type: "ADD_PRODUCT_REQUEST" });

  axios
    .post("/api/products/addProduct", { data })
    .then((res) => {
      dispatch({ type: "ADD_PRODUCT_SUCCESS", payload: res.data });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: "ADD_PRODUCT_FAILED", payload: err });
    });
};

export const deleteProduct = (productid) => (dispatch) => {
  dispatch({ type: "DELETE_PRODUCT_REQUEST" });

  axios
    .post("/api/products/deleteProduct", { productid })
    .then((res) => {
      dispatch({ type: "DELETE_PRODUCT_SUCCESS", payload: res.data });
      window.location.reload();
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: "DELETE_PRODUCT_FAILED", payload: err });
    });
};
