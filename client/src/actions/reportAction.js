import axios from "axios";

export const submitBug = (bug) => (dispatch) => {
  dispatch({ type: "SUBMIT_BUG_REQUEST" });

  axios
    .post("/api/reports/submitBugReport", { bug })
    .then((res) => {
      dispatch({ type: "SUBMIT_BUG_SUCCESS", payload: res.data });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: "SUBMIT_BUG_FAILED", payload: err });
    });
};

export const submitSuggestion = (suggestion) => (dispatch) => {
  dispatch({ type: "SUBMIT_SUGGESTION_REQUEST" });

  axios
    .post("/api/reports/submitSuggestion", { suggestion })
    .then((res) => {
      dispatch({ type: "SUBMIT_SUGGESTION_SUCCESS", payload: res.data });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: "SUBMIT_SUGGESTION_FAILED", payload: err });
    });
};
