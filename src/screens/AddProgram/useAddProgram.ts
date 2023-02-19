import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import { removeSession } from "../../store/programs/reducers";
import { sessions$ } from "../../store/programs/selectors";
import { RootStackParamList } from "../Navigation/types";

type InitialState = {
  programName: string | undefined;
  description: string | undefined;
};

const initialState = {
  programName: "",
  description: "",
};

const useAddProgram = ({
  navigation,
  route,
}: {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    keyof RootStackParamList,
    undefined
  >;
  route: RouteProp<RootStackParamList, "AddProgram">;
}) => {
  const isEdit = route.params?.isEdit;
  const dispatch = useDispatch<AppDispatch>();
  const [state, setState] = useState<Partial<InitialState>>(initialState);
  const sessions = useSelector(sessions$);

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

  const handleSaveBatches = () => {
    if (isEdit) {
      //   const request = {
      //     ...selectedBatch,
      //     name: state.batchName,
      //     ...(state.description && { description: state.description }),
      //     playerIds: selectedPlayers?.map((item: PlayerDefinition) => item.id),
      //   };
      //   if (request?.players) delete request.players;
      //   dispatch(updateBatch(request)).then((res) => {
      //     if (!!res.payload) {
      //       navigation.navigate("CommonScreen", {
      //         title: "Batches",
      //         shouldRefresh: true,
      //       });
      //       // dispatch(fetchBatches()).then((res) => res.payload && handleGoBack());
      //     }
      //   });
    } else {
      //   const request = {
      //     name: state.batchName,
      //     ...(state.description && { description: state.description }),
      //     playerIds: selectedPlayers?.map((item: PlayerDefinition) => item.id),
      //   };
      //   dispatch(addBatch(request)).then((res) => {
      //     if (!!res.payload) {
      //       dispatch(fetchBatches()).then((res) => res.payload && handleGoBack());
      //     }
      //   });
    }
  };

  const handleDeleteSession = (id: any) => {
    console.log("id", id);
    dispatch(removeSession(id));
  };

  return {
    state,
    updateState,
    handleSaveBatches,
    handleGoBack,
    sessions,
    handleDeleteSession,
  };
};

export default useAddProgram;
