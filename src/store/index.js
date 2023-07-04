import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const { combineReducers, createStore, applyMiddleware } = require("redux");
const { default: Reducers } = require("./reducers");

const RootReducer = combineReducers(Reducers);
export const store = createStore(RootReducer, composeWithDevTools(applyMiddleware(thunk)))
