import axios from "axios";
import { signOutEmailPassword } from "../firebase/authEmailAndPassword";

export const socialMediaMethod = (data) => (dispatch) => {
  dispatch({ type: "USER_SOCIAL_MEDIA_AUTH_REQUEST" });

  axios
    .post("/api/users/socialMediaAuth", data)
    .then((res) => {
      dispatch({ type: "USER_SOCIAL_MEDIA_AUTH_SUCCESS" });
      if (res.status === 201) {
        window.location.href = "/signin";
      }

      if (res.status === 200) {
        localStorage.setItem("currentUser", JSON.stringify(res.data));

        dispatch({ type: "USER_INFO_SUCCESS" });
        // window.location.href = "/home";
        console.log(res);
      }
    })
    .catch((err) => {
      dispatch({ type: "USER_SOCIAL_MEDIA_AUTH_FAILED" });
      alert(err.response.data.message);
    });
};

export const emailAndPasswordLogin = (data) => (dispatch) => {
  dispatch({ type: "USER_EMAIL_PASSWORD_LOGIN_AUTH_REQUEST" });

  axios
    .post("/api/users/emailPasswordLogin", data)
    .then((res) => {
      dispatch({ type: "USER_EMAIL_PASSWORD_LOGIN_AUTH_SUCCESS" });

      localStorage.setItem("currentUser", JSON.stringify(res.data));

      window.location.href = "/home";
    })
    .catch((err) => {
      dispatch({ type: "USER_EMAIL_PASSWORD_LOGIN_AUTH_FAILED" });
      alert(err.response.data.message);
    });
};

export const emailAndPasswordRegister = (data) => (dispatch) => {
  dispatch({ type: "USER_EMAIL_PASSWORD_REGISTER_AUTH_REQUEST" });

  axios
    .post("/api/users/emailPasswordRegister", data)
    .then((res) => {
      dispatch({ type: "USER_EMAIL_PASSWORD_REGISTER_AUTH_SUCCESS" });

      window.location.href = "/signin";
    })
    .catch((err) => {
      dispatch({ type: "USER_EMAIL_PASSWORD_REGISTER_AUTH_FAILED" });
      alert(err.response.data.message);
    });
};

// TODO:Make a update for the lastActive in the mongodb of the specific user
export const logoutUser = () => (dispatch) => {
  //localStorage.removeItem("cartItems")

  dispatch({ type: "USER_LOGOUT" });
  signOutEmailPassword(removeAndRedirect);
};

const removeAndRedirect = () => {
  localStorage.removeItem("currentUser");
  window.location.href = "/signin";
};
