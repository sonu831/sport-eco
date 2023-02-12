import { endpoints } from "./utils/endpoints";
import axios from "./utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const registerUser = createAsyncThunk(
  "registerUser",
  async (
    request: { [key: string]: any },
    { rejectWithValue, fulfillWithValue }
  ) => {
    return axios
      .post(endpoints.addUser, request)
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
      .put(endpoints.fetchUserById(request?.id), request)
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
