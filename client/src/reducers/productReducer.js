export const getAllProductsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case "GET_PRODUCTS_REQUEST":
      return {
        loading: true,
      };
    case "GET_PRODUCTS_SUCCESS":
      return {
        products: action.payload,
        loading: false,
      };
    case "GET_PRODUCTS_FAILED":
      return {
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export const getProductByIdReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case "GET_PRODUCT_BY_ID_REQUEST":
      return {
        loading: true,
      };
    case "GET_PRODUCT_BY_ID_SUCCESS":
      return {
        product: action.payload,
        loading: false,
      };
    case "GET_PRODUCT_BY_ID_FAILED":
      return {
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export const getProductByUserIdReducer = (state = { product: [] }, action) => {
  switch (action.type) {
    case "GET_PRODUCT_BY_USER_ID_REQUEST":
      return {
        loading: true,
      };
    case "GET_PRODUCT_BY_USER_ID_SUCCESS":
      return {
        products: action.payload,
        loading: false,
      };
    case "GET_PRODUCT_BY_USER_ID_FAILED":
      return {
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export const addProductReducer = (state = {}, action) => {
  switch (action.type) {
    case "ADD_PRODUCT_REQUEST":
      return {
        loading: true,
      };
    case "ADD_PRODUCT_SUCCESS":
      return {
        ...state,
        loading: false,
        success: true,
      };
    case "ADD_PRODUCT_FAILED":
      return {
        ...state,
        loading: false,
        error: true,
      };

    default:
      return state;
  }
};

export const deleteProductReducer = (state = {}, action) => {
  switch (action.type) {
    case "DELETE_PRODUCT_REQUEST":
      return {
        loading: true,
      };
    case "DELETE_PRODUCT_SUCCESS":
      return {
        ...state,
        loading: false,
        success: true,
      };
    case "DELETE_PRODUCT_FAILED":
      return {
        ...state,
        loading: false,
        error: true,
      };

    default:
      return state;
  }
};
