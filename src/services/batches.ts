import { createAsyncThunk } from "@reduxjs/toolkit";
import { endpoints } from "./utils/endpoints";
import axios from "./utils/axios";

export const addBatch = createAsyncThunk(
  "addBatch",
  async (request: { [key: string]: any }, { rejectWithValue }) => {
    return axios
      .post(endpoints.addBatch, request)
      .then((res) => res.data)
      .catch((err) => {
        rejectWithValue(err);
      });
  }
);

export const fetchBatches = createAsyncThunk(
  "fetchBatches",
  async (_, { rejectWithValue }) => {
    return axios
      .get(endpoints.addBatch)
      .then((res) => res.data)
      .catch((err) => {
        rejectWithValue(err);
      });
  }
);

export const fetchBatchById = createAsyncThunk(
  "fetchBatchById",
  async (id: string, { rejectWithValue }) => {
    return axios
      .get(endpoints.fetchBatchById(id))
      .then((res) => res.data)
      .catch((err) => {
        rejectWithValue(err);
      });
  }
);
