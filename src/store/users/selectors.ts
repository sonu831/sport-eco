import { createSelector } from "@reduxjs/toolkit";
import { UserSlice } from "./reducers";
import { RootState } from "../index";

const users$ = (s: RootState) => s[UserSlice.name];

export const userDetails$ = createSelector(
  [users$],
  (users) => users.user?.data || {}
);

export const isAccountVerified$ = createSelector(
  [users$],
  (users) => users.isVerified
);

export const isLoginVerified$ = createSelector(
  [users$],
  (users) => users.isLoginVerified
);
