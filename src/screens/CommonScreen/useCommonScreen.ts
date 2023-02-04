import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../Navigation/types";
import { RouteProp } from "@react-navigation/native";
import { AppDispatch } from "../../store";
import { fetchPlayers } from "../../services/players";
import { players$ } from "../../store/players/selectors";

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

  const showPlayers = title.toLowerCase() === "players";

  const handleGoBack = () => navigation.goBack();

  const handleClickOnProfile = (playerId: string) =>
    navigation.navigate("Profile", {
      playerId,
    });

  useEffect(() => {
    dispatch(fetchPlayers());
  }, [dispatch, shouldRefresh]);

  return { handleGoBack, players, title, handleClickOnProfile, showPlayers };
};

export default useCommonScreen;
