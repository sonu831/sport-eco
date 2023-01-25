import { useRef, useState } from "react";
import {
  Text,
  Pressable,
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Colors } from "../constants/Colors";
import PhoneInput from "react-native-phone-input";
import imageBg from "../assets/images/image_bg.png";
import enterNumberImage from "../assets/images/enter_number.png";

export default function VerificationScreen() {
  const [value, setValue] = useState("");
  const [code, setCode] = useState("+91");
  const phoneInput = useRef<PhoneInput>(null);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerView}>
        <Pressable style={styles.backButton}>
          <Entypo name="chevron-left" size={20} color={Colors.darkGray} />
        </Pressable>
        <View style={styles.logo}>
          <ImageBackground source={imageBg} style={styles.imageBg}>
            <Image source={enterNumberImage} />
          </ImageBackground>
          <Text style={styles.title}>
            You'll receive a 4-digit code for verification
          </Text>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Enter your phone number</Text>
            <PhoneInput
              ref={phoneInput}
              initialValue={value}
              initialCountry="in"
              onChangePhoneNumber={(phNum, iso) => {
                setValue(phNum);
                setCode(iso);
              }}
              flagStyle={{ display: "none" }}
            />
          </View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  containerView: {
    paddingHorizontal: 16,
    backgroundColor: Colors.white,
  },
  logo: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 11,
  },
  imageBg: {
    width: 265,
    height: 270,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    width: 284,
    height: 19,
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 17,
    color: Colors.darkGray,
    marginTop: 24,
    marginBottom: 75,
  },
  backButton: {
    backgroundColor: Colors.lightGray,
    width: 46,
    height: 40,
    borderRadius: 10,
    marginLeft: 24,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  fieldContainer: {
    width: 150,
  },
  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.lightGray,
    width: 342,
    height: 72,
    borderRadius: 10,
    padding: 20,
    marginLeft: 10,
  },
  fieldLabel: {
    fontSize: 12,
    color: Colors.darkGray,
    marginBottom: 8,
  },
  fieldInput: {
    fontSize: 12,
    width: 114,
    height: 21,
    borderWidth: 1,
  },
  button: {
    backgroundColor: Colors.darkGray,
    fontSize: 14,
    width: 115,
    height: 48,
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: Colors.white,
  },
});
