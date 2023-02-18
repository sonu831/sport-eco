import { endpoints } from "./utils/endpoints";
import axios from "./utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { storeDataInStorage } from "../utils/storage";
import { StorageKeys } from "../constants/storageKeys";

export const registerUser = createAsyncThunk(
  "registerUser",
  async (
    { phNum }: { phNum: string },
    { rejectWithValue, fulfillWithValue }
  ) => {
    return axios
      .get(endpoints.userCreation, {
        headers: {
          contact_no: phNum,
        },
      })
      .then((res) => fulfillWithValue(res.data))
      .catch((err) => {
        rejectWithValue(err);
      });
  }
);

export const validateOtp = createAsyncThunk(
  "validateOtp",
  async (
    request: { [key: string]: string },
    { rejectWithValue, fulfillWithValue }
  ) => {
    return axios
      .post(endpoints.validateOtp, request)
      .then((res) => {
        if (res?.headers?.token)
          storeDataInStorage(
            StorageKeys.tokenKey,
            JSON.stringify(res?.headers?.token)
          );
        return fulfillWithValue(res.data);
      })
      .catch((err) => {
        rejectWithValue(err);
      });
  }
);

type updateUserProfileProps = {
  data: { [key: string]: any };
  token: string;
};

export const updateUserProfile = createAsyncThunk(
  "updateUserProfile",
  async (request: updateUserProfileProps, { rejectWithValue }) => {
    const { data, token } = request;
    return axios
      .post(endpoints.updateUserProfile, data, {
        headers: {
          token,
        },
      })
      .then((res) => res.data)
      .catch((err) => {
        rejectWithValue(err);
      });
  }
);

export const fetchUserById = createAsyncThunk(
  "fetchUserById",
  async ({ token }: { token: string }, { rejectWithValue }) => {
    return axios
      .get(endpoints.fetchUserById, { headers: { token } })
      .then((res) => res.data)
      .catch((err) => {
        rejectWithValue(err);
      });
  }
);
