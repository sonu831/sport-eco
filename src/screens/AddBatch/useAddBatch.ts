import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBatch, fetchBatches } from "../../services/batches";
import { AppDispatch } from "../../store";
import { deletePlayer } from "../../store/batches/reducers";
import { selectedPlayers$ } from "../../store/batches/selectors";
import { RootStackParamList, RootStackScreenProps } from "../Navigation/types";

type InitialState = {
  batchName: string | undefined;
  description: string | undefined;
};

const initialState = {
  batchName: "",
  description: "",
};

const useAddBatch = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    keyof RootStackParamList,
    undefined
  >;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [state, setState] = useState<Partial<InitialState>>(initialState);
  const selectedPlayers = useSelector(selectedPlayers$);

  const handleGoBack = () => navigation.goBack();

  const updateState = (request: any) => {
    if (Array.isArray(request)) {
      request.forEach(({ key, value }) =>
        setState((preState) => ({ ...preState, [key]: value }))
      );
    } else {
      const { key, value } = request;
      setState((preState) => ({ ...preState, [key]: value }));
    }
  };

  const removeSelectedPlayer = (player: any) => {
    dispatch(deletePlayer(player));
  };

  const handleSaveBatches = () => {
    const request = {
      name: state.batchName,
      ...(state.description && { description: state.description }),
      playerIds: selectedPlayers?.map((item) => item.id),
    };
    dispatch(addBatch(request)).then((res) => {
      if (!!res.payload) {
        dispatch(fetchBatches()).then((res) => res.payload && handleGoBack());
      }
    });
  };

  return {
    state,
    updateState,
    removeSelectedPlayer,
    selectedPlayers,
    handleSaveBatches,
    handleGoBack,
  };
};

export default useAddBatch;
