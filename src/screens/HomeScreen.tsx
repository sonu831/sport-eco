import { Text, View, Pressable, StyleSheet, Image } from "react-native";
import logo from "../assets/images/logo.png";
import { Colors } from "../constants/Colors";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.title}>India's Largest</Text>
      <Text style={styles.title}>Sports Community</Text>
      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Create Account</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
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
    fontWeight: "400",
  },
});
