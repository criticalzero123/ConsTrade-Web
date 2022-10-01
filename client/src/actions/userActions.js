import axios from "axios";

export const socialMediaMethod = (data) => (dispatch) => {
  dispatch({ type: "USER_SOCIAL_MEDIA_AUTH_REQUEST" });

  axios
    .post("/api/users/socialmediaauth", data)
    .then((res) => {
      dispatch({ type: "USER_SOCIAL_MEDIA_AUTH_SUCCESS" });
    })
    .catch((err) => {
      dispatch({ type: "USER_SOCIAL_MEDIA_AUTH_FAILED" });
      console.log(err);
    });
};
