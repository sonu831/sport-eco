import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import moment, { Moment } from "moment";
import { useState } from "react";
import { UpdateStateRequest } from "../../types/UpdateState";
import { RootStackParamList } from "../Navigation/types";

type InitialState = {
  title: string;
  calenderOption: string;
  date: Moment;
};

const initialState = {
  title: "",
  calenderOption: "Today",
  date: moment(),
};

const useAddEvent = ({
  navigation,
  route,
}: {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    "AddEvents",
    undefined
  >;
  route: RouteProp<RootStackParamList, "AddEvents">;
}) => {
  const [state, setState] = useState(initialState);

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

  return {
    state,
    updateState,
    handleGoBack,
  };
};

export default useAddEvent;
