import axios from "axios";

export const socialMediaMethod = (data) => (dispatch) => {
  dispatch({ type: "USER_SOCIAL_MEDIA_AUTH_REQUEST" });

  axios
    .post("/api/users/socialMediaAuth", data)
    .then((res) => {
      dispatch({ type: "USER_SOCIAL_MEDIA_AUTH_SUCCESS" });
    })
    .catch((err) => {
      dispatch({ type: "USER_SOCIAL_MEDIA_AUTH_FAILED" });
      console.log(err);
    });
};

export const emailAndPasswordRegister = (data) => (dispatch) => {
  dispatch({ type: "USER_EMAIL_PASSWORD_REGISTER_AUTH_REQUEST" });

  axios
    .post("/api/users/emailPasswordRegister", data)
    .then((res) => {
      dispatch({ type: "USER_EMAIL_PASSWORD_REGISTER_AUTH_SUCCESS" });
    })
    .catch((err) => {
      dispatch({ type: "USER_EMAIL_PASSWORD_REGISTER_AUTH_FAILED" });
      console.log(err);
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
      console.log(err);
    });
};
