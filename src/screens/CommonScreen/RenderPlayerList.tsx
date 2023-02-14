import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

const RenderPlayerList = ({
  data,
  handleClickOnProfile,
}: {
  data: any[];
  handleClickOnProfile: any;
}) => {
  return (
    <View style={[styles.playerListContainer]}>
      {data?.map((player: any, playerIndex) => (
        <TouchableOpacity
          key={playerIndex}
          style={[
            styles.playerListItem,
            playerIndex !== data.length - 1 && styles.pb60,
          ]}
          onPress={() => handleClickOnProfile(player.id)}
        >
          <Image
            source={{
              uri: "https://pinnacle.works/wp-content/uploads/2022/06/dummy-image.jpg",
            }}
            style={styles.playerAvatar}
          />
          <Text
            style={styles.playerName}
          >{`${player?.fName} ${player?.lName}`}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default RenderPlayerList;
