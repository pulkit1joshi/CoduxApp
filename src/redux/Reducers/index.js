import { combineReducers } from "redux";
import userReducer from "./userReducer.js";
//import contestReducer from "./cfReducer.js";

export default combineReducers({
  //contest: contestReducer,
  user: userReducer
});
