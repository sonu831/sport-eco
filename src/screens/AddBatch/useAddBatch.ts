import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addBatch,
  addPlayersInBatch,
  deletePlayerFromBatch,
  fetchBatchById,
  fetchBatches,
  updateBatch,
} from "../../services/batches";
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
    dispatch(
      deletePlayerFromBatch({
        id: selectedBatch?._id,
        player_id: player.playerid,
      })
    ).then(() => {
      dispatch(deletePlayer(player));
    });
  };

  const handleSaveBatches = () => {
    if (isEdit) {
      const request = {
        batch_name: state.batchName,
        ...(state.description && { description: state.description }),
        players: selectedPlayers?.map((item: PlayerDefinition) => ({
          playerid: item._id,
          name: item.name,
        })),
      };

      const playersPayload = {
        batch_id: selectedBatch?._id,
        players: selectedPlayers?.map((item: PlayerDefinition) => ({
          playerid: item._id,
          name: item.name || `${item.first_name} ${item.last_name}`,
        })),
      };

      dispatch(updateBatch({ data: request, id: selectedBatch?._id })).then(
        (res) => {
          if (!!res.payload) {
            dispatch(addPlayersInBatch(playersPayload)).then(() =>
              navigation.navigate("CommonScreen", {
                title: "Batches",
                shouldRefresh: true,
              })
            );
          }
        }
      );
    } else {
      const request = {
        batch_name: state.batchName,
        ...(state.description && { batch_desc: state.description }),
        players: selectedPlayers?.map((item: PlayerDefinition) => ({
          playerid: item._id,
          name: item.first_name + " " + item.last_name,
        })),
      };

      dispatch(addBatch(request)).then((res) => {
        if (!!res.payload) {
          dispatch(fetchBatches()).then(() => handleGoBack());
        }
      });
    }
  };

  useEffect(() => {
    if (!!selectedBatch._id) {
      setState((preState) => ({
        ...preState,
        batchName: selectedBatch?.batch_name,
        description: selectedBatch?.description,
      }));

      dispatch(setSelectedPlayers(selectedBatch?.players));
    }
  }, [selectedBatch]);

  return {
    state,
    updateState,
    removeSelectedPlayer,
    selectedPlayers,
    handleSaveBatches,
    handleGoBack,
    isEdit,
  };
};

export default useAddBatch;
