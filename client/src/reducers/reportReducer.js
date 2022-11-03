export const submitBugReducer = (state = {}, action) => {
  switch (action.type) {
    case "SUBMIT_BUG_REQUEST":
      return {
        loading: true,
      };
    case "SUBMIT_BUG_SUCCESS":
      return {
        loading: false,
        success: action.payload,
      };
    case "SUBMIT_BUG_FAILED":
      return {
        ...state,
        loading: false,
        error: true,
      };

    default:
      return state;
  }
};

export const submitSuggestionReducer = (state = {}, action) => {
  switch (action.type) {
    case "SUBMIT_SUGGESTION_REQUEST":
      return {
        loading: true,
      };
    case "SUBMIT_SUGGESTION_SUCCESS":
      return {
        loading: false,
        success: action.payload,
      };
    case "SUBMIT_SUGGESTION_FAILED":
      return {
        ...state,
        loading: false,
        error: true,
      };

    default:
      return state;
  }
};
