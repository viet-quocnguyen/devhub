import axios from "axios";

import { logoutUser } from "./authActions";

import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  CREATE_PROFILE,
  GET_ERRORS,
  CLEAR_ERRORS,
  SET_CURRENT_USER,
  GET_PROFILES
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
  axios
    .post("/api/profiles", profile)
    .then(res => {
      dispatch({
        type: CREATE_PROFILE,
        payload: res.data
      });
      history.push("/dashboard");
      dispatch({
        type: CLEAR_ERRORS
      });
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

export const getProfiles = () => dispatch => {
  axios
    .get("/api/profiles/all")
    .then(res => {
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_PROFILES,
        payload: null
      });
    });
};

export const getProfileByHandle = handle => dispatch => {
  dispatch(loadingProfile());
  axios
    .get(`/api/profiles/handle/${handle}`)
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_PROFILE,
        payload: null
      });
    });
};

export const deleteAccount = history => dispatch => {
  axios
    .delete("/api/profiles")
    .then(res => {
      dispatch({
        type: SET_CURRENT_USER,
        payload: {}
      });
      dispatch(clearCurrentProfile());
      dispatch(logoutUser());
      history.push("/login");
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
