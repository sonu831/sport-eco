import { View, Text } from "react-native";
import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../Navigation/types";
import { RouteProp } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectedProgramDetails$ } from "../../store/programs/selectors";
import { AppDispatch } from "../../store";
import { deleteProgram } from "../../services/programs";

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
  const dispatch = useDispatch<AppDispatch>();
  const programDetails = useSelector(selectedProgramDetails$);

  const handleGoBack = () => navigation.goBack();

  const handleDeleteProgram = () => {
    dispatch(deleteProgram({ programId: programDetails?._id })).then((res) => {
      navigation.navigate("CommonScreen", {
        title: "Programs",
        shouldRefresh: true,
      });
    });
  };

  return { programDetails, handleGoBack, handleDeleteProgram };
};

export default useProgramDetails;
