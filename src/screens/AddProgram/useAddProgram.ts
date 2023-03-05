import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPrograms } from "../../services/programs";
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

  const handleSave = () => {
    const { description, programName } = state;

    const request = {
      program_name: programName,
      description: description,
      sessions: sessions.map((session) => ({
        sesionname: session.name,
        sessiondesc: session.description,
        sessionduration: session.duration,
      })),
    };

    dispatch(addPrograms({ data: request })).then(() =>
      navigation.navigate("CommonScreen", {
        title: "Programs",
        shouldRefresh: true,
      })
    );
  };

  const handleDeleteSession = (id: any) => {
    console.log("id", id);
    dispatch(removeSession(id));
  };

  return {
    state,
    updateState,
    handleSave,
    handleGoBack,
    sessions,
    handleDeleteSession,
  };
};

export default useAddProgram;
