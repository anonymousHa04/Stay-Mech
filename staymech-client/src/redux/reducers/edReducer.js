import {
  ADD_EDUCATION,
  EDUCATION_ERROR,
  FETCH_ED_DETAILS_BEGIN,
  FETCH_ED_DETAILS_SUCCESS,
  FETCH_ED_DETAILS_FAILURE,
  EDUCATION_DELETE,
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  details: [],
  loading: false,
  data: false,
  error: null,
};

const edReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_EDUCATION:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
      };

    case FETCH_ED_DETAILS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_ED_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: true,
        details: action.payload.details,
      };
    case FETCH_ED_DETAILS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        details: [],
      };
    case EDUCATION_ERROR:
      return {
        ...state,
      };

    case EDUCATION_DELETE:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

export default edReducer;
