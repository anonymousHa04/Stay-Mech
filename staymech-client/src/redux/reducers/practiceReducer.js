import {
  FETCH_PRACTICE_BEGIN,
  FETCH_PRACTICE_SUCCESS,
  FETCH_PRACTICE_FAILURE,
  PRACTICE_ERROR,
} from "../actions/types";

const initialState = {
  practice: [],
  loading: false,
  error: null,
};

const practiceReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRACTICE_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_PRACTICE_SUCCESS:
      return {
        ...state,
        loading: false,
        practice: action.payload.practice,
      };

    case FETCH_PRACTICE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        practice: [],
      };

    case PRACTICE_ERROR:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default practiceReducer;
