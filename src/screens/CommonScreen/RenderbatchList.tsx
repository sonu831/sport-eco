import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import batchIcon from "../../assets/images/batches.png";

const RenderBatchList = ({
  data,
  handleClickOnProfile,
}: {
  data: any[];
  handleClickOnProfile: any;
}) => {
  return (
    <View style={[styles.playerListContainer]}>
      {data?.map((batch: any, batchIndex) => (
        <TouchableOpacity
          key={batchIndex}
          style={[
            styles.playerListItem,
            batchIndex !== data.length - 1 && styles.pb60,
          ]}
          onPress={() => handleClickOnProfile(batch)}
        >
          <Image source={batchIcon} style={styles.playerAvatar} />
          <Text style={styles.playerName}>{batch?.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default RenderBatchList;
