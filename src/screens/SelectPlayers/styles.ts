import { StyleSheet } from "react-native";
import { bottomNavigationHeight } from "../../constants";
import { Colors } from "../../constants/Colors";
import Layout from "../../constants/Layout";

const { window } = Layout;

export const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: Colors.white,
    height: window.height - bottomNavigationHeight,
    paddingBottom: 10,
  },
  mainContainer: {
    marginTop: 20,
    height: window.height - bottomNavigationHeight,
  },
  menuIconContainer: {
    borderRadius: 10,
    backgroundColor: Colors.lightOrange,
    width: 57,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 21,
    marginHorizontal: 40,
  },
  mx40: { marginHorizontal: 40 },
  alignCenter: { alignItems: "center" },
  headingText: {
    color: Colors.darkGray,
    fontSize: 12,
    fontWeight: "700",
    lineHeight: 14,
  },
  playerList: {
    backgroundColor: Colors.gray1,
    paddingHorizontal: 10,
    paddingVertical: 40,
    marginTop: 27,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  listItemText: {
    color: Colors.darkGray,
    fontSize: 12,
    lineHeight: 14,
    marginLeft: 21,
  },
  mb30: {
    marginBottom: 30,
  },
  mlAuto: {
    marginLeft: "auto",
  },
  mt85: {
    marginTop: 85,
  },
  saveBtn: {
    backgroundColor: Colors.orange,
    width: 64,
    height: 35,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  saveBtnText: {
    fontWeight: "700",
    color: Colors.white,
  },
  opacity50: { opacity: 0.5 },
  playerImage: { width: 50, height: 50, borderRadius: 50 },
});
