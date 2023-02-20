import { createSlice } from "@reduxjs/toolkit";
import { mockVenue } from "../../constants";

type InitialState = {
  venues: any[];
  selectedVenue: any;
};

const initialState: InitialState = {
  venues: mockVenue,
  selectedVenue: {},
};

export const VenueSlice = createSlice({
  name: "Venues",
  initialState,
  reducers: {
    setSelectedVenue: (s, a) => {
      s.selectedVenue = a.payload;
    },
  },
});

export const { setSelectedVenue } = VenueSlice.actions;
