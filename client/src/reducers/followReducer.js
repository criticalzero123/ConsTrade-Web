export const addFollowUser = (state = {}, action) => {
  switch (action.type) {
    case "ADD_FOLLOW_USER_REQUEST":
      return { loading: true };

    case "ADD_FOLLOW_USER_SUCCESS":
      return { ...state, loading: false, success: true };

    case "ADD_FOLLOW_USER_FAILED":
      return { ...state, loading: false, error: true };

    default:
      return state;
  }
};

export const isFollowingUserReducer = (state = {}, action) => {
  switch (action.type) {
    case "IS_FOLLOWING_USER_REQUEST":
      return { loading: true };

    case "IS_FOLLOWING_USER_SUCCESS":
      return { payload: action.payload, loading: false };

    case "IS_FOLLOWING_USER_FAILED":
      return { ...state, loading: false, error: true };

    default:
      return state;
  }
};

export const unFollowUserReducer = (state = {}, action) => {
  switch (action.type) {
    case "UNFOLLOW_USER_REQUEST":
      return { loading: true };

    case "UNFOLLOW_USER_SUCCESS":
      return { payload: action.payload, loading: false, success: true };

    case "UNFOLLOW_USER_FAILED":
      return { ...state, loading: false, error: true };

    default:
      return state;
  }
};

export const getFollowersReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_FOLLOWERS_REQUEST":
      return { loading: true };

    case "GET_FOLLOWERS_SUCCESS":
      return { followers: action.payload, loading: false };

    case "GET_FOLLOWERS_FAILED":
      return { loading: false, error: true };

    default:
      return state;
  }
};
