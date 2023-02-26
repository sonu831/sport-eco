import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addVenue, fetchVenueList } from "../../services/venue";
import { AppDispatch } from "../../store";
import { UpdateStateRequest } from "../../types/UpdateState";
import { RootStackParamList } from "../Navigation/types";

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

const useAddVenue = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    keyof RootStackParamList,
    undefined
  >;
}) => {
  const dispatch = useDispatch<AppDispatch>();
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

  const handleGoBack = () => navigation.goBack();

  const handleSave = () => {
    const { address, city, courtName, name, sport, state: venueState } = state;

    const request = {
      venue_name: name,
      court_name: courtName,
      sport: sport,
      address: address,
      state: venueState,
      city: city,
    };

    dispatch(addVenue({ data: request })).then((res) => {
      console.log("res.payload", res.payload);

      dispatch(fetchVenueList()).then(handleGoBack);
    });
  };

  return {
    state,
    updateState,
    handleSave,
  };
};

export default useAddVenue;
