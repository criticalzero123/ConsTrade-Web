export const soldItemTransactionReducer = (state = {}, action) => {
  switch (action.type) {
    case "SOLD_TRANSACTION_REQUEST":
      return {
        loading: true,
      };
    case "SOLD_TRANSACTION_SUCCESS":
      return {
        loading: false,
        success: true,
      };
    case "SOLD_TRANSACTION_FAILED":
      return {
        loading: false,
        error: true,
      };

    default:
      return state;
  }
};
