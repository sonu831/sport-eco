import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import locationIcon from "../../assets/images/location.png";

const RenderVenueList = ({
  data,
  handleClick,
}: {
  data: any[];
  handleClick: any;
}) => {
  return (
    <View style={[styles.playerListContainer]}>
      {data?.map((venue: any, venueIndex) => (
        <TouchableOpacity
          key={venueIndex}
          style={[
            styles.playerListItem,
            venueIndex !== data.length - 1 && styles.pb60,
          ]}
          onPress={() => handleClick(venue)}
        >
          <Image source={locationIcon} />
          <Text style={styles.playerName}>{venue?.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default RenderVenueList;
