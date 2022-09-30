export const googleAuthReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_GOOGLE_AUTH_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "USER_GOOGLE_AUTH_SUCCESS":
      return {
        ...state,
        loading: false,
        success: true,
      };

    case "USER_GOOGLE_AUTH_FAILED":
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return { ...state };
  }
};
