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
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
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
    fontFamily: "Avenir-Regular",
    fontWeight: "700",
    fontSize: 14,
  },
  mxAuto: {
    marginLeft: "auto",
    marginRight: "auto",
  },
  fieldRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 25,
  },
  fieldRowLabel: {
    fontFamily: "Avenir-Regular",
    fontSize: 14,
    marginLeft: 8,
  },
  required: {
    color: Colors.red,
  },
  w195: { width: 195 },
  h104: { height: 104 },
  alignCenter: { alignItems: "center" },
  m42: { marginTop: 42 },
  saveBtn: {
    backgroundColor: Colors.orange,
    width: 64,
    height: 35,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  saveBtnText: {
    fontFamily: "Avenir-Regular",
    fontWeight: "700",
    color: Colors.white,
  },
  opacity50: { opacity: 0.5 },
  mt85: {
    marginTop: 85,
  },
  timeInputContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.gray1,
    padding: 10,
    borderRadius: 10,
  },
});
