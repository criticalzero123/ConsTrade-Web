export const socalMediaAuthReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_SOCIAL_MEDIA_AUTH_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "USER_SOCIAL_MEDIA_AUTH_SUCCESS":
      return {
        ...state,
        loading: false,
        success: true,
      };

    case "USER_SOCIAL_MEDIA_AUTH_FAILED":
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return { ...state };
  }
};

export const emailPasswordRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_EMAIL_PASSWORD_REGISTER_AUTH_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "USER_EMAIL_PASSWORD_REGISTER_AUTH_SUCCESS":
      return {
        ...state,
        loading: false,
        success: true,
      };

    case "USER_EMAIL_PASSWORD_REGISTER_AUTH_FAILED":
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return { ...state };
  }
};

export const userInfoReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_INFO_SUCCESS":
      return {
        currentUser: action.payload,
      };

    default:
      return { ...state };
  }
};

export const emailPasswordLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_EMAIL_PASSWORD_LOGIN_AUTH_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "USER_EMAIL_PASSWORD_LOGIN_AUTH_SUCCESS":
      return {
        ...state,
        loading: false,
        success: true,
      };

    case "USER_EMAIL_PASSWORD_LOGIN_AUTH_FAILED":
      return {
        ...state,
        loading: false,
        error: true,
      };
    case "USER_LOGOUT":
      return {
        ...state,
      };
    default:
      return { ...state };
  }
};

export const getUserByIdReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_USER_BY_ID_REQUEST":
      return {
        loading: true,
      };
    case "GET_USER_BY_ID_SUCCESS":
      return {
        loading: false,
        user: action.payload,
      };

    case "GET_USER_BY_ID_FAILED":
      return {
        loading: false,
        error: true,
      };
    default:
      return { ...state };
  }
};

export const favoriteReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_FAVORITE_REQUEST":
      return {
        loading: true,
      };

    case "USER_FAVORITE_SUCCESS":
      return {
        loading: false,
        success: true,
        favorite: action.payload.favorites,
        message: action.payload.message,
      };

    case "USER_FAVORITE_FAILED":
      return {
        loading: false,
        error: true,
      };

    default:
      return state;
  }
};
