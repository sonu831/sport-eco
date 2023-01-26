import React from "react";
import { Entypo } from "@expo/vector-icons";
import {
  Text,
  View,
  SafeAreaView,
  Pressable,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Colors } from "../../constants/Colors";
import { styles } from "./styles";
import {
  locations,
  mockUser,
  UserDetailsFields,
} from "../../constants/Profile";
import useProfilePage from "./useProfilePage";

const ProfileScreen = () => {
  const { userDetails } = useProfilePage();
  const userFields = UserDetailsFields(userDetails);
  const userLocationFields = locations(userDetails);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.containerView}>
          <Pressable
            style={styles.backButton}
            // onPress={() =>
            //   props.navigation.navigate(accountVerified ? "Home" : "Landing")
            // }
          >
            <Entypo name="chevron-left" size={20} color={Colors.darkGray} />
          </Pressable>
          <View style={styles.headerContainer}>
            <Image source={{ uri: mockUser.image }} style={styles.avatar} />
            <Text style={styles.username}>
              {`${userDetails?.name}, ${userDetails?.age}`}
            </Text>
            <TouchableOpacity style={styles.editBtn}>
              <View style={styles.flexRow}>
                <Text style={styles.btnText}>Edit Profile</Text>
                <Entypo name="chevron-right" size={16} color={Colors.white} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.containerView}>
          {userFields.map((detail, detailIndex) => (
            <View style={styles.listItem} key={detailIndex}>
              <View style={styles.listItemImage}>
                <Image source={detail.icon} />
              </View>
              <Text style={styles.listItemText}>{detail.title}</Text>
              <Text numberOfLines={1} style={styles.listItemTextValue}>
                {detail.value}
              </Text>
            </View>
          ))}
        </View>
        <View style={[styles.divider, styles.dividerHeading]}>
          <Text>Location</Text>
        </View>
        <View style={styles.containerView}>
          {userLocationFields.map((location, locationIndex) => (
            <View style={styles.listItem} key={locationIndex}>
              <View style={styles.listItemLocationImage}>
                <Image source={location.icon} />
              </View>
              <Text>{location.value}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
