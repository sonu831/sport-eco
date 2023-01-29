import { endpoints } from "./utils/endpoints";
import axios from "./utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const registerUser = createAsyncThunk(
  "registerUser",
  async (request: { [key: string]: any }, { rejectWithValue }) => {
    return axios
      .post(endpoints.addUser, request)
      .then((res) => res.data)
      .catch((err) => {
        console.log("Unable to register user --> ", JSON.stringify(err));
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
        console.log("Unable to fetch user --> ", JSON.stringify(err));
        rejectWithValue(err);
      });
  }
);
