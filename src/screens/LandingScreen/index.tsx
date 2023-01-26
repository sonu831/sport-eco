import { Text, View, Pressable, Image } from "react-native";
import logo from "../../assets/images/logo.png";
import { styles } from "./styles";

const LandingScreen = (props: any) => {
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.title}>India's Largest</Text>
      <Text style={styles.title}>Sports Community</Text>
      <Pressable
        style={styles.button}
        onPress={() => props.navigation.navigate("Verification")}
      >
        <Text style={styles.buttonText}>Create Account</Text>
      </Pressable>
    </View>
  );
};

export default LandingScreen;
