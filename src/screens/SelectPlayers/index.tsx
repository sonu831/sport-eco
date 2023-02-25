import { Entypo } from "@expo/vector-icons";
import React from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import SearchBar from "../../components/SearchBar";
import { Colors } from "../../constants/Colors";
import { RootStackScreenProps } from "../Navigation/types";
import { styles } from "./styles";
import useSelectPlayer from "./useSelectPlayer";
import dummyUserIcon from "../../assets/images/dummy-user.png";
import CustomCheckbox from "../../components/Checkbox";

const SelectPlayer = ({ navigation }: RootStackScreenProps<"SelectPlayer">) => {
  const {
    handleGoBack,
    players,
    handleSelectPlayer,
    isPlayerSelected,
    saveSelectedPlayers,
    selectedPlayers,
  } = useSelectPlayer({ navigation });

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.mainContainer}>
        <TouchableOpacity
          style={styles.menuIconContainer}
          onPress={handleGoBack}
        >
          <Entypo name="chevron-left" size={20} color={Colors.darkGray} />
        </TouchableOpacity>
        <View style={styles.mx40}>
          <SearchBar
            onChange={
              (searchString: string) =>
                console.log("searchString", searchString)
              // updateState({ key: "searchedText", value: searchString })
            }
          />
        </View>
        <View style={styles.alignCenter}>
          <Text style={styles.headingText}>Select Player</Text>
        </View>
        <View style={[styles.mx40, styles.playerList]}>
          {Array.isArray(players) &&
            players?.map((player, i) => {
              const isSelected = isPlayerSelected(player);

              return (
                <View
                  key={i}
                  style={[
                    styles.listItem,
                    i !== players.length - 1 && styles.mb30,
                  ]}
                >
                  <Image
                    source={player.imageURl || dummyUserIcon}
                    style={styles.playerImage}
                  />
                  <Text style={styles.listItemText}>
                    {`${player?.first_name} ${player?.last_name}`}
                  </Text>
                  <View style={styles.mlAuto}>
                    <CustomCheckbox
                      checked={isSelected}
                      onChange={() => handleSelectPlayer(player)}
                    />
                  </View>
                </View>
              );
            })}
        </View>
        <View style={[styles.alignCenter, styles.mt85]}>
          <TouchableOpacity
            style={[
              styles.saveBtn,
              selectedPlayers.length === 0 && styles.opacity50,
            ]}
            onPress={saveSelectedPlayers}
            disabled={selectedPlayers.length === 0}
          >
            <Text style={styles.saveBtnText}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SelectPlayer;
