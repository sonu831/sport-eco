import { createSelector } from "@reduxjs/toolkit";
import { CommonSlice } from "./reducers";

const common$ = (s: any) => s[CommonSlice.name];

export const isLoading$ = createSelector(
  [common$],
  (common) => common.isLoading
);
