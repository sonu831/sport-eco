import { UserSlice } from "./users/reducers";
import { combineReducers } from "@reduxjs/toolkit";
import { PlayerSlice } from "./players/reducers";
import { CommonSlice } from "./common/reducers";
import { BatchSlice } from "./batches/reducers";

const rootReducer = combineReducers({
  [UserSlice.name]: UserSlice.reducer,
  [PlayerSlice.name]: PlayerSlice.reducer,
  [CommonSlice.name]: CommonSlice.reducer,
  [BatchSlice.name]: BatchSlice.reducer,
});

export default rootReducer;
