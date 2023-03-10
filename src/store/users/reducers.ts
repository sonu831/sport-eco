import { StorageKeys } from "./../../constants/storageKeys";
import { storeDataInStorage } from "./../../utils/storage";
import {
  registerUser,
  fetchUserById,
  updateUserProfile,
} from "./../../services/users";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  error: "",
  isNewUser: false,
  isVerified: false,
  isLoginVerified: false,
};

export const UserSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    setUser: (s, a) => {
      s.user = a.payload;
    },
    setIsVerified: (s, a) => {
      s.isVerified = a.payload;
    },
    setIsLoginVerified: (s, a) => {
      s.isLoginVerified = a.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (s, a) => {
        s.user = a.payload?.data;
      })
      .addCase(updateUserProfile.fulfilled, (s, a) => {
        s.user = a.payload;
      })
      .addCase(fetchUserById.fulfilled, (s, a) => {
        s.user = a.payload;
      })
      .addCase(registerUser.rejected, (s, a) => {
        s.error = JSON.stringify(a.payload);
      });
  },
});

export const { setUser, setIsVerified, setIsLoginVerified } = UserSlice.actions;
