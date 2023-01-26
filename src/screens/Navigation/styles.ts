import { bottomNavigationHeight } from "./../../constants/index";
import { Colors } from "./../../constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: Colors.orange,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 30,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: bottomNavigationHeight,
  },
});
