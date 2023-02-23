import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../Navigation/types";
import { AppDispatch } from "../../store";
import { fetchPlayers } from "../../services/players";
import { setSelectedPlayers } from "../../store/batches/reducers";
import { players$ } from "../../store/players/selectors";

type Player = {
  category: string;
  city: string;
  dob: Date;
  email: string;
  fName: string;
  gender: string;
  _id: string;
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
  const players = useSelector(players$);
  const [selectedPlayers, setSelPlayers] = useState<Player[]>([]);

  const handleGoBack = () => navigation.goBack();

  const isPlayerSelected = (player: Player) =>
    selectedPlayers.some((item) => item._id === player._id);

  const handleSelectPlayer = (player: Player) => {
    const isSelected = isPlayerSelected(player);

    if (isSelected) {
      setSelPlayers((preState) => preState.filter((e) => e._id !== player._id));
    } else {
      setSelPlayers((preState) => [...preState, player]);
    }
  };

  const saveSelectedPlayers = () => {
    dispatch(setSelectedPlayers(selectedPlayers));

    handleGoBack();
  };

  useEffect(() => {
    dispatch(fetchPlayers());
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
