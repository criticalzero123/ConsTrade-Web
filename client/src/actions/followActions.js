import axios from "axios";

export const followUser = (currentUser, user) => (dispatch) => {
  dispatch({ type: "ADD_FOLLOW_USER_REQUEST" });
  dispatch({ type: "IS_FOLLOWING_USER_REQUEST" });
  axios
    .post("/api/follows/followUser", { currentUser, user })
    .then((res) => {
      dispatch({ type: "ADD_FOLLOW_USER_SUCCESS" });
      dispatch({ type: "IS_FOLLOWING_USER_SUCCESS", payload: res.data });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: "ADD_FOLLOW_USER_FAILED", payload: err });
    });
};

export const isFollowingUser = (userId, otherUserId) => (dispatch) => {
  dispatch({ type: "IS_FOLLOWING_USER_REQUEST" });

  axios
    .post("/api/follows/followingUser", { userId, otherUserId })
    .then((res) => {
      dispatch({ type: "IS_FOLLOWING_USER_SUCCESS", payload: res.data });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: "IS_FOLLOWING_USER_FAILED", payload: err });
    });
};

export const unFollowUser = (userId, otherUserId) => (dispatch) => {
  dispatch({ type: "UNFOLLOW_USER_REQUEST" });
  dispatch({ type: "IS_FOLLOWING_USER_REQUEST" });
  axios
    .post("/api/follows/unFollowUser", { userId, otherUserId })
    .then((res) => {
      dispatch({ type: "UNFOLLOW_USER_SUCCESS" });
      dispatch({ type: "IS_FOLLOWING_USER_SUCCESS", payload: res.data });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: "UNFOLLOW_USER_FAILED", payload: err });
    });
};

export const getFollowers = (userId) => (dispatch) => {
  dispatch({ type: "GET_FOLLOWERS_REQUEST" });

  axios
    .post("/api/follows/getFollowers", { userId })
    .then((res) => {
      dispatch({ type: "GET_FOLLOWERS_SUCCESS", payload: res.data });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: "GET_FOLLOWERS_FAILED", payload: err });
    });
};
