import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import moment, { Moment } from "moment";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { addSession } from "../../store/programs/reducers";
import { UpdateStateRequest } from "../../types/UpdateState";
import { RootStackParamList } from "../Navigation/types";

type InitialState = {
  sessionName: string | undefined;
  description: string | undefined;
  sessionDuration: Moment | undefined;
};

const initialState = {
  programName: "",
  description: "",
  sessionDuration: moment(),
};

const useAddSession = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    keyof RootStackParamList,
    undefined
  >;
  route: RouteProp<RootStackParamList, "AddSession">;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [state, setState] = useState<Partial<InitialState>>(initialState);

  const handleGoBack = () => navigation.goBack();

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

  const handleSaveSession = () => {
    const { description, sessionDuration, sessionName } = state;
    const request = {
      name: sessionName,
      description,
      duration: moment(sessionDuration).format("HH:mm:ss"),
    };

    dispatch(addSession(request));
    handleGoBack();
  };

  return {
    state,
    updateState,
    handleGoBack,
    handleSaveSession,
  };
};

export default useAddSession;
