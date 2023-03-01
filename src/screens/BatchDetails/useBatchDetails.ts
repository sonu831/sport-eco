import { useDispatch, useSelector } from "react-redux";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../Navigation/types";
import { RouteProp } from "@react-navigation/native";
import { AppDispatch } from "../../store";
import { batchDetails$ } from "../../store/batches/selectors";
import { batchDefinition } from "../../types/batch";
import { deleteBatch, fetchBatchById } from "../../services/batches";
import { useEffect } from "react";

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

  const handleBatchDeletion = () => {
    if (batchDetails._id)
      dispatch(deleteBatch(batchDetails._id)).then((res) => {
        if (!!res)
          navigation.navigate("Confirmation", {
            label: "Deleted !",
            navigateTo: "CommonScreen",
            navigateOption: {
              title: "Batches",
              shouldRefresh: true,
            },
          });
      });
  };

  return {
    batchDetails,
    handleGoBack,
    handleBatchDeletion,
  };
};

export default useBatchPage;
