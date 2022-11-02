import axios from "axios";

export const followUser = (currentUserId, user) => (dispatch) => {
  dispatch({ type: "ADD_FOLLOW_USER_REQUEST" });

  axios
    .post("/api/follows/followUser", { currentUserId, user })
    .then((res) => {
      dispatch({ type: "ADD_FOLLOW_USER_SUCCESS", payload: res.data });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: "ADD_FOLLOW_USER_FAILED", payload: err });
    });
};

export const isFollowingUser = (userId, otherUserId) => (dispatch) => {
  dispatch({ type: "FOLLOWING_USER_REQUEST" });

  axios
    .post("/api/follows/followingUser", { userId, otherUserId })
    .then((res) => {
      dispatch({ type: "FOLLOWING_USER_SUCCESS", payload: res.data });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: "FOLLOWING_USER_FAILED", payload: err });
    });
};
