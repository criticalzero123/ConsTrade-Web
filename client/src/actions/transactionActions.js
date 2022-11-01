import axios from "axios";

export const soldItemTransaction =
  (productId, userId, sellerId, getWant, inAppTransac) => (dispatch) => {
    dispatch({ type: "SOLD_TRANSACTION_REQUEST" });

    axios
      .post("/api/transactions/soldProduct", {
        productId,
        userId,
        sellerId,
        getWant,
        inAppTransac,
      })
      .then((res) => {
        dispatch({ type: "SOLD_TRANSACTION_SUCCESS" });
        window.location.href = `/product/item/${res.data._id}`;
      })
      .catch((err) => {
        dispatch({ type: "SOLD_TRANSACTION_FAILED" });
        console.log(err);
      });
  };

export const getTransactionByUserId = (userId) => (dispatch) => {
  dispatch({ type: "USER_TRANSACTION_REQUEST" });

  axios
    .post("/api/transactions/getTransactionById", { userId })
    .then((res) => {
      dispatch({ type: "USER_TRANSACTION_SUCCESS", payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: "USER_TRANSACTION_FAILED" });
    });
};
