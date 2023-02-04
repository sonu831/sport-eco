import {UserSlice} from './users/reducers';
import {combineReducers} from '@reduxjs/toolkit';
import {PlayerSlice} from './players/reducers';

const rootReducer = combineReducers({
  [UserSlice.name]: UserSlice.reducer,
  [PlayerSlice.name]: PlayerSlice.reducer,
});

export default rootReducer;
