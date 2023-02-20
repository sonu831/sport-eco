import axios from "./utils/axios";
import { endpoints } from "./utils/endpoints";
import { createAsyncThunk } from "@reduxjs/toolkit";

type AddPlayerProps = {
  data: { [key: string]: any };
  token: string;
};

export const addPlayer = createAsyncThunk(
  "addPlayer",
  async (request: AddPlayerProps, { rejectWithValue }) => {
    const { data, token } = request;

    return axios
      .post(endpoints.addPlayer, data, {
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

export const fetchPlayers = createAsyncThunk(
  "fetchPlayers",
  async (_, { rejectWithValue }) => {
    return axios
      .get(endpoints.fetchPlayers)
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
