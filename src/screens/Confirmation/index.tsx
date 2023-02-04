import { Entypo } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";
import { RootStackScreenProps } from "../Navigation/types";
import VerifiedIcon from "../../assets/images/account_verified.png";

const Confirmation = ({ route }: RootStackScreenProps<"Confirmation">) => {
  const label = route.params?.label || "";
  const onPress = route.params?.onPress;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.containerView}>
          <TouchableOpacity style={styles.backButton} onPress={onPress}>
            <Entypo name="chevron-left" size={20} color={Colors.darkGray} />
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <Text style={styles.label}>{label}</Text>
          <Image source={VerifiedIcon} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Confirmation;
