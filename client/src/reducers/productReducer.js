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

export const getAllProductByCategoryReducer = (
  state = { products: [] },
  action
) => {
  switch (action.type) {
    case "GET_PRODUCTS_BY_CATEGORY_REQUEST":
      return {
        loading: true,
      };

    case "GET_PRODUCTS_BY_CATEGORY_SUCCESS":
      return {
        loading: false,
        products: action.payload,
      };

    case "GET_PRODUCTS_BY_CATEGORY_FAILED":
      return {
        loading: false,
        error: true,
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

export const editProductReducer = (state = {}, action) => {
  switch (action.type) {
    case "EDIT_PRODUCT_REQUEST":
      return {
        loading: true,
      };
    case "EDIT_PRODUCT_SUCCESS":
      return {
        ...state,
        loading: false,
        success: true,
      };
    case "EDIT_PRODUCT_FAILED":
      return {
        ...state,
        loading: false,
        error: true,
      };

    default:
      return state;
  }
};

export const addCommentProductReducer = (state = {}, action) => {
  switch (action.type) {
    case "ADD_COMMENT_PRODUCT_REQUEST":
      return {
        loading: true,
      };
    case "ADD_COMMENT_PRODUCT_SUCCESS":
      return {
        loading: false,
        success: true,
      };
    case "ADD_COMMENT_PRODUCT_FAILED":
      return {
        loading: false,
        error: true,
      };

    default:
      return state;
  }
};

export const commentListProductReducer = (state = { comments: [] }, action) => {
  switch (action.type) {
    case "COMMENT_LIST":
      return {
        comments: action.payload,
      };

    default:
      return state;
  }
};

export const deleteCommentProductReducer = (state = {}, action) => {
  switch (action.type) {
    case "DELETE_COMMENT_PRODUCT_REQUEST":
      return {
        loading: true,
      };
    case "DELETE_COMMENT_PRODUCT_SUCCESS":
      return {
        loading: false,
        success: true,
      };
    case "DELETE_COMMENT_PRODUCT_FAILED":
      return {
        loading: false,
        error: true,
      };

    default:
      return state;
  }
};
