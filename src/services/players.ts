import axios from "./utils/axios";
import { endpoints } from "./utils/endpoints";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const addPlayer = createAsyncThunk(
  "addPlayer",
  async (request: { [key: string]: any }, { rejectWithValue }) => {
    return axios
      .post(endpoints.addPlayer, request)
      .then((res) => res.data)
      .catch((err) => {
        rejectWithValue(err);
      });
  }
);

export const fetchPlayers = createAsyncThunk(
  "fetchPlayers",
  async (_, { rejectWithValue }) => {
    return axios
      .get(endpoints.addPlayer)
      .then((res) => {
        console.log("res.data", res.data);
        return res.data;
      })
      .catch((err) => {
        rejectWithValue(err);
      });
  }
);

export const fetchPlayerById = createAsyncThunk(
  "fetchPlayerById",
  async (id: string, { rejectWithValue }) => {
    return axios
      .get(endpoints.fetchPlayerById(id))
      .then((res) => res.data)
      .catch((err) => {
        rejectWithValue(err);
      });
  }
);

export const deletePlayer = createAsyncThunk(
  "deletePlayer",
  async (id: string, { rejectWithValue }) => {
    return axios
      .delete(endpoints.fetchPlayerById(id))
      .then((res) => res.data)
      .catch((err) => {
        rejectWithValue(err);
      });
  }
);
