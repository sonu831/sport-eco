import { Text, View, Pressable, Image } from "react-native";
import logo from "../../assets/images/logo.png";
import soccerIcon from "../../assets/images/soccer.png";
import prizeIcon from "../../assets/images/prize.png";
import footballIcon from "../../assets/images/football.png";
import badmintonIcon from "../../assets/images/badminton.png";
import { styles } from "./styles";

const LandingScreen = (props: any) => {
  return (
    <View style={styles.container}>
      <Image source={footballIcon} style={styles.footballIcon} />
      <Image source={soccerIcon} style={styles.soccerIcon} />
      <Image source={prizeIcon} style={styles.prizeIcon} />
      <Image source={badmintonIcon} style={styles.badmintonIcon} />
      <Image source={logo} style={styles.logo} />
      <View style={styles.headingContainer}>
        <Text style={styles.title}>India's Largest</Text>
        <Text style={styles.title}>Sports Community</Text>
      </View>
      <Pressable
        style={styles.button}
        onPress={() => props.navigation.navigate("Verification")}
      >
        <Text style={styles.buttonText}>Lets Go</Text>
      </Pressable>
    </View>
  );
};

export default LandingScreen;
