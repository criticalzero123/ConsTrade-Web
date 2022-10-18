import axios from "axios";

export const soldItemTransaction =
  (productId, userId, sellerId) => (dispatch) => {
    dispatch({ type: "SOLD_TRANSACTION_REQUEST" });

    axios
      .post("/api/transactions/soldProduct", { productId, userId, sellerId })
      .then((res) => {
        dispatch({ type: "SOLD_TRANSACTION_SUCCESS" });
        window.location.href = `/product/item/${res.data._id}`;
      })
      .catch((err) => {
        dispatch({ type: "SOLD_TRANSACTION_FAILED" });
        console.log(err);
      });
  };
