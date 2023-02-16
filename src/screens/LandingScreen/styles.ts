import { StyleSheet } from "react-native";
import { Colors } from "../../constants/Colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white,
  },
  logo: {
    marginBottom: 29,
  },
  title: {
    fontSize: 24,
    lineHeight: 29,
    fontFamily: "Avenir-Regular",
    fontWeight: "400",
  },
  button: {
    backgroundColor: Colors.darkGray,
    fontSize: 14,
    width: 248,
    height: 48,
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 120,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 14,
    lineHeight: 17,
    fontFamily: "Avenir-Regular",
    fontWeight: "400",
  },
});
