import { View, Text } from "react-native";
import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../Navigation/types";
import { RouteProp } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectedProgramDetails$ } from "../../store/programs/selectors";

const useProgramDetails = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    keyof RootStackParamList,
    undefined
  >;
  route: RouteProp<RootStackParamList, "ProgramDetails">;
}) => {
  const programDetails = useSelector(selectedProgramDetails$);

  const handleGoBack = () => navigation.goBack();

  const handleDeleteProgram = () => {};

  return { programDetails, handleGoBack };
};

export default useProgramDetails;
