import axios from "axios";
import jwt_decode from "jwt-decode";
import { GET_ERRORS } from "./types";
import { SET_CURRENT_USER } from "./types";

import { setAuthToken } from "../utils/setAuthToken";

// Register User
export const registerUser = (userData, history) => dispatch => {
  // Create new user
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Login User
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      const user = jwt_decode(token);
      dispatch(setCurrentUser(user));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const setCurrentUser = userData => {
  return {
    type: SET_CURRENT_USER,
    payload: userData
  };
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};
