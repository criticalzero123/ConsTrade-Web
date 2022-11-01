import Swal from "sweetalert2";

import { soldItemTransaction } from "../actions/transactionActions";
// With buyer
export const markAstransactedPopUpWithBuyerInApp = (
  product_Id,
  otherUser_Id,
  productUserId,
  dispatch
) => {
  Swal.fire({
    title: "Transaction Completed?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes",
    allowOutsideClick: false,
    allowEscapeKey: false,
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Hooray! One more step,",
        text: "Were you able to get your desired item or cash?",
        showDenyButton: true,
        confirmButtonText: "Yes",
        denyButtonText: `No`,
        icon: "success",
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Thank you!", "", "success");
          dispatch(
            soldItemTransaction(
              product_Id,
              otherUser_Id,
              productUserId,
              "Yes",
              true
            )
          );
        } else if (result.isDenied) {
          dispatch(
            soldItemTransaction(
              product_Id,
              otherUser_Id,
              productUserId,
              "No",
              true
            )
          );
        } else if (result.isDismissed) {
          dispatch(
            soldItemTransaction(
              product_Id,
              otherUser_Id,
              productUserId,
              "Not provided",
              true
            )
          );
        }
      });
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      Swal.fire("Cancelled", "Transaction Cancelled.", "error");
    }
  });
};

export const markAstransactedPopUpNotApp = (
  product_Id,
  productUserId,
  dispatch
) => {
  Swal.fire({
    title: "Transaction Completed?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes",
    allowOutsideClick: false,
    allowEscapeKey: false,
  }).then((result) => {
    if (result.isConfirmed) {
      dispatch(
        soldItemTransaction(
          product_Id,
          "none",
          productUserId,
          "Not provided",
          false
        )
      );
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      Swal.fire("Cancelled", "Transaction Cancelled.", "error");
    }
  });
};
