import { StyleSheet } from "react-native";
import { Colors } from "../../constants/Colors";
import Layout from "../../constants/Layout";

const { window } = Layout;

export const styles = StyleSheet.create({
  safeView: {
    backgroundColor: Colors.white,
    height: window.height,
  },
  containerView: {
    paddingHorizontal: 16,
    backgroundColor: Colors.white,
  },
  py16: { paddingVertical: 16 },
  flex: { display: "flex", flexDirection: "row", alignItems: "center" },
  backButton: {
    backgroundColor: Colors.lightOrange,
    width: 46,
    height: 40,
    borderRadius: 10,
    marginLeft: 24,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  headingText: {
    fontWeight: "700",
    fontFamily: "Avenir-Regular",
    fontSize: 14,
    marginLeft: 40,
  },

  fieldRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 25,
  },
  justifyCenter: { justifyContent: "center" },
  fieldColumn: { flexDirection: "column", paddingHorizontal: 25 },
  fieldRowLabel: {
    fontSize: 14,
    fontFamily: "Avenir-Regular",
    marginLeft: 8,
  },
  required: {
    color: Colors.red,
  },
  fieldInput: {
    backgroundColor: Colors.gray1,
    width: 95,
    height: 35,
    padding: 10,
    borderRadius: 10,
  },
  w195: { width: 195 },
  mr10: { marginRight: 10 },
  h104: { height: 104 },
  mv20: { marginVertical: 20 },
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
    fontFamily: "Avenir-Regular",
  },
});
