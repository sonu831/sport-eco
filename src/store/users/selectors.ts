import { createSelector } from "@reduxjs/toolkit";
import { UserSlice } from "./reducers";

const users$ = (s: any) => s[UserSlice.name];

export const userDetails$ = createSelector([users$], (users) => users.user);
