import { Entypo } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import React, { useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";
import { RootStackScreenProps } from "../Navigation/types";
import VerifiedIcon from "../../assets/images/account_verified.png";
import { setIsLoginVerified } from "../../store/users/reducers";
import { useDispatch } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";

const Confirmation = ({
  route,
  navigation,
}: RootStackScreenProps<"Confirmation">) => {
  const dispatch = useDispatch();
  const label = route.params?.label || "";
  const navigateTo = route.params?.navigateTo;
  const navigateOption = route.params?.navigateOption;
  const isLogin = label === "Account verified!";

  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = () => {
        if (isLogin) dispatch(setIsLoginVerified(false));
      };

      return () => unsubscribe();
    }, [isLogin])
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.containerView}>
          <TouchableOpacity
            style={[styles.backButton, isLogin && styles.bgBlue]}
            onPress={() => {
              if (navigateTo) {
                navigation.navigate(navigateTo, navigateOption);
              }
            }}
          >
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
