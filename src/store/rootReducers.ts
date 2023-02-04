import { UserSlice } from "./users/reducers";
import { combineReducers } from "@reduxjs/toolkit";
import { PlayerSlice } from "./players/reducers";
import { CommonSlice } from "./common/reducers";

const rootReducer = combineReducers({
  [UserSlice.name]: UserSlice.reducer,
  [PlayerSlice.name]: PlayerSlice.reducer,
  [CommonSlice.name]: CommonSlice.reducer,
});

export default rootReducer;
