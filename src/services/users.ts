import { endpoints } from "./utils/endpoints";
import axios from "./utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

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
      .then((res) => fulfillWithValue(res.data))
      .catch((err) => {
        rejectWithValue(err);
      });
  }
);

export const updateUserProfile = createAsyncThunk(
  "updateUserProfile",
  async (request: { [key: string]: any }, { rejectWithValue }) => {
    return axios
      .put(endpoints.updateUserProfile, request)
      .then((res) => res.data)
      .catch((err) => {
        rejectWithValue(err);
      });
  }
);

export const fetchUserById = createAsyncThunk(
  "fetchUserById",
  async (id: string, { rejectWithValue }) => {
    return axios
      .get(endpoints.fetchUserById(id))
      .then((res) => res.data)
      .catch((err) => {
        rejectWithValue(err);
      });
  }
);
