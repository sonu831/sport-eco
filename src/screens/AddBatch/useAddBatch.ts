import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBatch, fetchBatches, updateBatch } from "../../services/batches";
import { AppDispatch } from "../../store";
import { deletePlayer, setSelectedPlayers } from "../../store/batches/reducers";
import { batchDetails$, selectedPlayers$ } from "../../store/batches/selectors";
import { batchDefinition } from "../../types/batch";
import { PlayerDefinition } from "../../types/player";
import { RootStackParamList } from "../Navigation/types";

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
  route,
}: {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    keyof RootStackParamList,
    undefined
  >;
  route: RouteProp<RootStackParamList, "AddBatch">;
}) => {
  const isEdit = route.params?.isEdit;
  const dispatch = useDispatch<AppDispatch>();
  const [state, setState] = useState<Partial<InitialState>>(initialState);
  const selectedPlayers = useSelector(selectedPlayers$);
  const selectedBatch: Partial<batchDefinition> = useSelector(batchDetails$);

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
    if (isEdit) {
      const request = {
        ...selectedBatch,
        name: state.batchName,
        ...(state.description && { description: state.description }),
        playerIds: selectedPlayers?.map((item: PlayerDefinition) => item.id),
      };

      if (request?.players) delete request.players;

      dispatch(updateBatch(request)).then((res) => {
        if (!!res.payload) {
          navigation.navigate("CommonScreen", {
            title: "Batches",
            shouldRefresh: true,
          });
          // dispatch(fetchBatches()).then((res) => res.payload && handleGoBack());
        }
      });
    } else {
      const request = {
        name: state.batchName,
        ...(state.description && { description: state.description }),
        playerIds: selectedPlayers?.map((item: PlayerDefinition) => item.id),
      };

      dispatch(addBatch(request)).then((res) => {
        if (!!res.payload) {
          dispatch(fetchBatches()).then((res) => res.payload && handleGoBack());
        }
      });
    }
  };

  useEffect(() => {
    setState((preState) => ({
      ...preState,
      batchName: selectedBatch?.name,
      description: selectedBatch?.description,
    }));

    dispatch(setSelectedPlayers(selectedBatch?.players));
  }, [selectedBatch]);

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
