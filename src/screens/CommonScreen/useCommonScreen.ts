import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../Navigation/types";
import { RouteProp } from "@react-navigation/native";
import { AppDispatch } from "../../store";
import { fetchPlayers } from "../../services/players";
import { fetchBatches } from "../../services/batches";
import { players$ } from "../../store/players/selectors";
import { batches$ } from "../../store/batches/selectors";
import { setSelectedBatch } from "../../store/batches/reducers";
import { fetchFromStorage } from "../../utils/storage";
import { StorageKeys } from "../../constants/storageKeys";

const useCommonScreen = ({
  navigation,
  route,
}: {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    keyof RootStackParamList,
    undefined
  >;
  route: RouteProp<RootStackParamList, "CommonScreen">;
}) => {
  const { title, shouldRefresh = false } = route.params;
  const dispatch = useDispatch<AppDispatch>();
  const players: any[] = useSelector(players$);
  const batchList: any[] = useSelector(batches$);

  const showPlayers = title.toLowerCase() === "players";
  const showBatches = title.toLowerCase() === "batches";

  const handleGoBack = () => navigation.goBack();

  const handleClickOnProfile = (playerId: string) => {
    const navigateToScreen = showPlayers ? "Profile" : "BatchScreen";

    dispatch(setSelectedBatch(playerId));

    navigation.navigate(navigateToScreen, {
      playerId,
    });
  };

  const dataToShow = showPlayers ? players : batchList;

  useEffect(() => {
    if (showPlayers)
      fetchFromStorage(StorageKeys.tokenKey).then((token) => {
        if (!!token) {
          dispatch(fetchPlayers({ token: JSON.parse(token) }));
        }
      });
    else if (showBatches) dispatch(fetchBatches());
  }, [dispatch, shouldRefresh]);

  return {
    handleGoBack,
    players,
    title,
    handleClickOnProfile,
    showPlayers,
    showBatches,
    dataToShow,
  };
};

export default useCommonScreen;
