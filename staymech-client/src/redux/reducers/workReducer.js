import {
  ADD_WORK,
  WORK_ERROR,
  FETCH_WORK_DETAILS_BEGIN,
  FETCH_WORK_DETAILS_SUCCESS,
  FETCH_WORK_DETAILS_FAILURE,
  WORK_DELETE,
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  work: [],
  loading: false,
  data: false,
  error: null,
};

const workReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_WORK:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
      };

    case FETCH_WORK_DETAILS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_WORK_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: true,
        work: action.payload.details,
      };

    case FETCH_WORK_DETAILS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        work: [],
      };

    case WORK_ERROR:
      return {
        ...state,
      };

    case WORK_DELETE:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

export default workReducer;
