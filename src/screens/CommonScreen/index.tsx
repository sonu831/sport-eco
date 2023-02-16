import React from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import SearchBar from "../../components/SearchBar";
import { styles } from "./styles";
import noPlayer from "../../assets/images/no-player.png";
import addIcon from "../../assets/images/floating-icon-add.png";
import { RootStackScreenProps } from "../Navigation/types";
import useCommonScreen from "./useCommonScreen";
import { Colors } from "../../constants/Colors";
import RenderPlayerList from "./RenderPlayerList";
import RenderBatchList from "./RenderbatchList";

const Players = ({
  navigation,
  route,
}: RootStackScreenProps<"CommonScreen">) => {
  const {
    title,
    players = [],
    handleGoBack,
    handleClickOnProfile,
    showPlayers,
    dataToShow,
    showBatches,
  } = useCommonScreen({ navigation, route });

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
        {dataToShow?.length > 0 ? (
          Array.isArray(dataToShow) &&
          (showPlayers ? (
            <RenderPlayerList
              data={dataToShow}
              handleClickOnProfile={handleClickOnProfile}
            />
          ) : showBatches ? (
            <RenderBatchList
              data={dataToShow}
              handleClickOnProfile={handleClickOnProfile}
            />
          ) : null)
        ) : (
          <View style={styles.noPlayerContainer}>
            <Image source={noPlayer} />
            <Text style={styles.noPlayerText}>
              No {title.toLowerCase()} displayed
            </Text>
          </View>
        )}
      </ScrollView>

      <TouchableOpacity
        style={styles.floatingBtn}
        onPress={() => {
          const route = showPlayers ? "EditProfile" : "AddBatch";
          const option = showPlayers
            ? {
                isAddPlayer: true,
              }
            : {};
          navigation.navigate(route, option);
        }}
      >
        <Image source={addIcon} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Players;
