import { createSlice } from "@reduxjs/toolkit";
import { SessionDefinition } from "../../types/session";

type InitialState = {
  sessions: SessionDefinition[];
};

const initialState: InitialState = {
  sessions: [],
};

export const ProgramSlice = createSlice({
  name: "Programs",
  initialState,
  reducers: {
    addSession: (s, a) => {
      s.sessions = [...s.sessions, { ...a.payload, id: s.sessions.length + 1 }];
    },
    removeSession: (s, a) => {
      s.sessions = s.sessions.filter((e) => e.id !== a.payload);
    },
  },
});

export const { addSession, removeSession } = ProgramSlice.actions;
