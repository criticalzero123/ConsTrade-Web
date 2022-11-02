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
    case "FOLLOWING_USER_REQUEST":
      return { loading: true };

    case "FOLLOWING_USER_SUCCESS":
      return { payload: action.payload, loading: false, success: true };

    case "FOLLOWING_USER_FAILED":
      return { ...state, loading: false, error: true };

    default:
      return state;
  }
};
