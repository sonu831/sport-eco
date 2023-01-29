import { UserSlice } from "./users/reducers";
import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  [UserSlice.name]: UserSlice.reducer,
});

export default rootReducer;
