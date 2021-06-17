import { combineReducers } from "redux";
import { remainderReducer } from "./remainderReducer";

export const AppReducer = combineReducers({
  remainders: remainderReducer
});

export default AppReducer;
