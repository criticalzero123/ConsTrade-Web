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

        dispatch({ type: "USER_INFO_SUCCESS", currentUser: res.data });
        window.location.href = "/home";
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

export const getUserById = (id) => (dispatch) => {
  dispatch({ type: "GET_USER_BY_ID_REQUEST" });

  axios
    .post("/api/users/getUserById", { id })
    .then((res) => {
      dispatch({ type: "GET_USER_BY_ID_SUCCESS", payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: "GET_USER_BY_ID_FAILED" });
      console.log(err);
    });
};

export const addToFavorite = (productId) => (dispatch, getState) => {
  dispatch({ type: "USER_FAVORITE_REQUEST" });

  const userInfo = getState().userInfoReducer.currentUser;

  axios
    .post("/api/users/addFavorite", { productId, userInfo })
    .then((res) => {
      dispatch({ type: "USER_FAVORITE_SUCCESS", payload: res.data });

      dispatch({ type: "USER_INFO_SUCCESS", payload: res.data });
      // Updating the favorite product
      localStorage.setItem("currentUser", JSON.stringify(res.data));
    })
    .catch((err) => {
      dispatch({ type: "USER_FAVORITE_FAILED" });
    });
};

// TODO:Make a update for the lastActive in the mongodb of the specific user
export const logoutUser = () => (dispatch) => {
  dispatch({ type: "USER_LOGOUT" });
  signOutEmailPassword(removeAndRedirect);
};

const removeAndRedirect = () => {
  localStorage.removeItem("currentUser");
  window.location.href = "/signin";
};
