import axios from "axios";

import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  CREATE_PROFILE,
  GET_ERRORS
} from "../actions/types";

export const loadingProfile = () => {
  return {
    type: PROFILE_LOADING
  };
};

export const getCurrentProfile = () => dispatch => {
  dispatch(loadingProfile());
  axios
    .get("/api/profiles")
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_PROFILE,
        payload: {}
      });
    });
};

export const createProfile = (profile, history) => dispatch => {
  dispatch(loadingProfile());
  axios
    .post("/api/profiles", profile)
    .then(res => {
      dispatch({
        type: CREATE_PROFILE,
        payload: res.data
      });
      history.push("/dashboard");
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const clearCurrentProfile = () => dispatch => {
  dispatch({
    type: CLEAR_CURRENT_PROFILE
  });
};
