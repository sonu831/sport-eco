import { StorageKeys } from "./../../constants/storageKeys";
import { storeDataInStorage } from "./../../utils/storage";
import { registerUser, fetchUserById } from "./../../services/users";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  error: "",
};

export const UserSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    setUser: (s, a) => {
      s.user = a.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (s, a) => {
        s.user = a.payload;
        storeDataInStorage(
          StorageKeys.userDetails,
          JSON.stringify(a.payload.id)
        );
      })
      .addCase(fetchUserById.fulfilled, (s, a) => {
        console.log("a", a);
        s.user = a.payload;
        storeDataInStorage(
          StorageKeys.userDetails,
          JSON.stringify(a.payload.id)
        );
      })
      .addCase(registerUser.rejected, (s, a) => {
        s.error = JSON.stringify(a.payload);
      });
  },
});

export const { setUser } = UserSlice.actions;
