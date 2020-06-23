import axios from "axios";

import { tokenConfig } from "./authAction";
// import { returnErrors } from "./errorAction";

import {
  ADD_WORK,
  FETCH_WORK_DETAILS_BEGIN,
  FETCH_WORK_DETAILS_SUCCESS,
  FETCH_WORK_DETAILS_FAILURE,
  WORK_DELETE,
} from "./types";

//adding work details

export const work = ({ company, role, callback }) => (dispatch, getState) => {
  const body = JSON.stringify({ company, role });

  axios.post("api/profile/work", body, tokenConfig(getState)).then((res) => {
    dispatch({
      type: ADD_WORK,
      payload: res.data,
    });
    callback();
  });
  // .catch((err) => {
  //   dispatch(
  //     returnErrors(err.response.data, err.response.status, "WORK_ERROR")
  //   );
  //   dispatch({
  //     type: WORK_ERROR,
  //   });
  // });
};

// getting work details

export const fetchWorkBegins = () => ({
  type: FETCH_WORK_DETAILS_BEGIN,
});

export const fetchWorkSuccess = (details) => ({
  type: FETCH_WORK_DETAILS_SUCCESS,
  payload: { details },
});

export const fetchWorkFailure = (error) => ({
  type: FETCH_WORK_DETAILS_FAILURE,
  payload: { error },
});

export function loadWorkDetails() {
  return (dispatch) => {
    dispatch(fetchWorkBegins);
    return fetch("/api/profile/work")
      .then(handleErrors)
      .then((res) => res.json())
      .then((json) => {
        dispatch(fetchWorkSuccess(json));
        return json;
      })
      .catch((error) => dispatch(fetchWorkFailure(error)));
  };
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

//deleting work details
export const workDelete = ({ id, callback }) => (dispatch) => {
  axios.delete(`/api/profile/work/${id}`).then((res) => {
    dispatch({
      type: WORK_DELETE,
      payload: res.data,
    });
    callback();
  });
};
