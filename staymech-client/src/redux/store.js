import { createStore, applyMiddleware } from "redux";

import thunk from "redux-thunk";

import combineReducers from "./root-reducer";

const middleware = [thunk];

const store = createStore(combineReducers, applyMiddleware(...middleware));

export default store;
