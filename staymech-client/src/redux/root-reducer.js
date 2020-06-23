import { combineReducers } from "redux";

import authReducer from "./reducers/authReducer";
import errorReducer from "./reducers/errorReducer";
import edReducer from "./reducers/edReducer";
import workReducer from "./reducers/workReducer";
import practiceReducer from "./reducers/practiceReducer";

export default combineReducers({
  auth: authReducer,
  error: errorReducer,
  edDetails: edReducer,
  workDetails: workReducer,
  practice: practiceReducer,
});
