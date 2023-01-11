import { combineReducers, createStore, applyMiddleware } from "redux";

import thunk from "redux-thunk";
import { personsListReducer } from "./reducers/personsreducers";

const reducers = combineReducers({
  personsReducer: personsListReducer,
});
const initialstate = {};
const middleware = [thunk];

const store = createStore(
  reducers,
  initialstate,
  applyMiddleware(...middleware)
);

export default store;
