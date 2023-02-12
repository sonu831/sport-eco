import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../Navigation/types";
import { AppDispatch } from "../../store";
import { fetchPlayers } from "../../services/players";
import { setSelectedPlayers } from "../../store/batches/reducers";

type Player = {
  category: string;
  city: string;
  dob: Date;
  email: string;
  fName: string;
  gender: string;
  id: number;
  imageURl: string;
  lName: string;
  mName: string;
  phNum: string;
  state: string;
};

const useSelectPlayer = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    keyof RootStackParamList,
    undefined
  >;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedPlayers, setSelPlayers] = useState<Player[]>([]);

  const handleGoBack = () => navigation.goBack();

  const isPlayerSelected = (player: Player) =>
    selectedPlayers.some((item) => item.id === player.id);

  const handleSelectPlayer = (player: Player) => {
    const isSelected = isPlayerSelected(player);

    if (isSelected) {
      setSelPlayers((preState) => preState.filter((e) => e.id !== player.id));
    } else {
      setSelPlayers((preState) => [...preState, player]);
    }
  };

  const saveSelectedPlayers = () => {
    dispatch(setSelectedPlayers(selectedPlayers));

    handleGoBack();
  };

  useEffect(() => {
    dispatch(fetchPlayers()).then((res) => {
      setPlayers(res.payload);
    });
  }, [dispatch]);

  return {
    handleGoBack,
    players,
    selectedPlayers,
    isPlayerSelected,
    handleSelectPlayer,
    saveSelectedPlayers,
  };
};

export default useSelectPlayer;
