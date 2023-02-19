import { createSelector } from "@reduxjs/toolkit";
import { ProgramSlice } from "./reducers";
import { RootState } from "../index";

const programs$ = (s: RootState) => s[ProgramSlice.name];

export const sessions$ = createSelector(
  [programs$],
  (programs) => programs.sessions
);
