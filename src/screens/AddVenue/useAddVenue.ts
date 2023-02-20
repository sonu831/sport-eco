import React, { useState } from "react";
import { UpdateStateRequest } from "../../types/UpdateState";

type InitialState = {
  name: string;
  courtName: string;
  sport: string;
  address: string;
  city: string;
  state: string;
};

const initialState = {
  name: "",
  courtName: "",
  sport: "",
  address: "",
  city: "",
  state: "",
};

const useAddVenue = () => {
  const [state, setState] = useState<InitialState>(initialState);

  const updateState = (request: UpdateStateRequest<keyof InitialState>) => {
    if (Array.isArray(request)) {
      request.forEach(({ key, value }) =>
        setState((preState) => ({ ...preState, [key]: value }))
      );
    } else {
      const { key, value } = request;
      setState((preState) => ({ ...preState, [key]: value }));
    }
  };

  return {
    state,
    updateState,
  };
};

export default useAddVenue;
