import axios from "axios";

export const googleAuth = (data) => (dispatch) => {
  dispatch({ type: "USER_GOOGLE_AUTH_REQUEST" });

  axios
    .post("/api/users/googleauth", data)
    .then((res) => {
      dispatch({ type: "USER_GOOGLE_AUTH_SUCCESS" });
    })
    .catch((err) => {
      dispatch({ type: "USER_GOOGLE_AUTH_FAILED" });
      console.log(err);
    });
};
