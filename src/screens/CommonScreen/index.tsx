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
import RenderVenueList from "./RenderVenueList";
import SafeArea from "../../components/SafeArea";
import RenderProgramList from "./RenderProgramList";

const Players = ({
  navigation,
  route,
}: RootStackScreenProps<"CommonScreen">) => {
  const {
    title,
    handleGoBack,
    handleClickOnProfile,
    showPlayers,
    dataToShow,
    showBatches,
    showPrograms,
    handleAddIcon,
    showVenues,
    handleVenueListItemClick,
    handleProgramListItemClick,
  } = useCommonScreen({ navigation, route });

  return (
    <SafeArea classNames={styles.safeArea}>
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
          ) : showVenues ? (
            <RenderVenueList
              data={dataToShow}
              handleClick={handleVenueListItemClick}
            />
          ) : showPrograms ? (
            <RenderProgramList
              data={dataToShow}
              handleClick={handleProgramListItemClick}
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

      <TouchableOpacity style={styles.floatingBtn} onPress={handleAddIcon}>
        <Image source={addIcon} />
      </TouchableOpacity>
    </SafeArea>
  );
};

export default Players;
