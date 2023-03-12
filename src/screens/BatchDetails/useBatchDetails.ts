import { useDispatch, useSelector } from "react-redux";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../Navigation/types";
import { RouteProp } from "@react-navigation/native";
import { AppDispatch } from "../../store";
import { batchDetails$ } from "../../store/batches/selectors";
import { batchDefinition } from "../../types/batch";
import { deleteBatch, fetchBatchById } from "../../services/batches";
import { useEffect, useState } from "react";
import { UpdateStateRequest } from "../../types/UpdateState";

type InitialState = {
  showConfirmation: boolean;
};

const initialState = {
  showConfirmation: false,
};

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
  const [state, setState] = useState<Partial<InitialState>>(initialState);
  const batchDetails: Partial<batchDefinition> = useSelector(batchDetails$);

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
    state,
    updateState,
    batchDetails,
    handleGoBack,
    handleBatchDeletion,
  };
};

export default useBatchPage;
