import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "./utils/axios";
import { endpoints } from "./utils/endpoints";

export const fetchVenueList = createAsyncThunk(
  "fetchVenueList",
  async (_, { rejectWithValue }) => {
    return axios
      .get(endpoints.listOfVenue)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        rejectWithValue(err);
      });
  }
);

type AddVenueProps = {
  data: { [key: string]: any };
};

export const addVenue = createAsyncThunk(
  "addVenue",
  async (request: AddVenueProps, { rejectWithValue }) => {
    const { data } = request;

    return axios
      .post(endpoints.addVenue, data)
      .then((res) => res.data)
      .catch((err) => {
        rejectWithValue(err);
      });
  }
);
