import { useDispatch, useSelector } from "react-redux";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../Navigation/types";
import { RouteProp } from "@react-navigation/native";
import { AppDispatch } from "../../store";
import { batchDetails$ } from "../../store/batches/selectors";
import { batchDefinition } from "../../types/batch";

const useBatchPage = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    keyof RootStackParamList,
    undefined
  >;
  route: RouteProp<RootStackParamList, "BatchScreen">;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const batchDetails: Partial<batchDefinition> = useSelector(batchDetails$);

  const handleGoBack = () => navigation.goBack();

  const handlePlayerDeletion = () => {
    // dispatch(deletePlayer(playerId)).then((res) => {
    //   if (!!res)
    //     navigation.navigate("Confirmation", {
    //       label: "Deleted !",
    //       onPress: () =>
    //         navigation.navigate("CommonScreen", {
    //           title: "Players",
    //           shouldRefresh: true,
    //         }),
    //     });
    // });
  };

  return {
    batchDetails,
    handleGoBack,
    handlePlayerDeletion,
  };
};

export default useBatchPage;
