import { createStore, applyMiddleware } from "redux";
// import { composeWithDevTools } from "redux-devtools-extension";
// import logger from 'redux-logger'
import thunk from "redux-thunk";

import rootReducer from "./Reducers";

const middlewares = [thunk];
const initialState = {};

const store = createStore(
    rootReducer,
    initialState,
    (applyMiddleware(...middlewares))
);
export default store;
