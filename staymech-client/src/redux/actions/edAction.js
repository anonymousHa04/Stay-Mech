import axios from "axios";

import { tokenConfig } from "./authAction";
import { returnErrors } from "./errorAction";
import {
  ADD_EDUCATION,
  EDUCATION_ERROR,
  FETCH_ED_DETAILS_BEGIN,
  FETCH_ED_DETAILS_SUCCESS,
  FETCH_ED_DETAILS_FAILURE,
  EDUCATION_DELETE,
} from "./types";

//adding education details
export const education = ({ college, program, degree, callback }) => (
  dispatch,
  getState
) => {
  const body = JSON.stringify({ college, program, degree });

  axios
    .post("/api/profile/education", body, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: ADD_EDUCATION,
        payload: res.data,
      });
      callback();
    })
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "EDUCATION_ERROR")
      );
      dispatch({
        type: EDUCATION_ERROR,
      });
    });
};

//getting user details
export const fetchEdBegin = () => ({
  type: FETCH_ED_DETAILS_BEGIN,
});
export const fetchEdSuccess = (details) => ({
  type: FETCH_ED_DETAILS_SUCCESS,
  payload: { details },
});
export const fetchEdFailure = (error) => ({
  type: FETCH_ED_DETAILS_FAILURE,
  payload: { error },
});

export function loadEdDetails() {
  return (dispatch) => {
    dispatch(fetchEdBegin);
    return fetch("/api/profile/education")
      .then(handleErrors)
      .then((res) => res.json())
      .then((json) => {
        dispatch(fetchEdSuccess(json));
        return json;
      })
      .catch((error) => dispatch(fetchEdFailure(error)));
  };
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

export const educationDelete = ({ id, callback }) => (dispatch) => {
  axios.delete(`/api/profile/education/${id}`).then((res) => {
    dispatch({
      type: EDUCATION_DELETE,
      payload: res.data,
    });
    callback();
  });
};
