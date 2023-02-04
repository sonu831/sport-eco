import {createSelector} from '@reduxjs/toolkit';
import {PlayerSlice} from './reducers';

const player$ = (s: any) => s[PlayerSlice.name];

export const players$ = createSelector([player$], players => players.players);

export const playerDetails$ = createSelector(
  [player$],
  players => players.playerDetails,
);
