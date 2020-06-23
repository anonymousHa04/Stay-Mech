import {
  FETCH_PRACTICE_BEGIN,
  FETCH_PRACTICE_SUCCESS,
  FETCH_PRACTICE_FAILURE,
} from "./types";
import { Error } from "mongoose";

//getting practice contest

export const fetchPracticeBegin = () => ({
  type: FETCH_PRACTICE_BEGIN,
});

export const fetchPracticeSuccess = (practice) => ({
  type: FETCH_PRACTICE_SUCCESS,
  payload: { practice },
});

export const fetchPracticeFailure = (error) => ({
  type: FETCH_PRACTICE_FAILURE,
  payload: { error },
});

export function loadPractice() {
  return (dispatch) => {
    dispatch(fetchPracticeBegin);
    return fetch("/api/practice")
      .then(handleErrors)
      .then((res) => res.json())
      .then((json) => {
        dispatch(fetchPracticeSuccess(json));
        return json;
      })
      .catch((error) => dispatch(fetchPracticeFailure(error)));
  };
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
