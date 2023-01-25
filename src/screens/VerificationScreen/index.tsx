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
import { Colors } from "../../constants/Colors";
import PhoneInput from "react-native-phone-input";
import imageBg from "../../assets/images/image_bg.png";
import enterNumberImage from "../../assets/images/enter_number.png";
import accountVerifiedImage from "../../assets/images/account_verified.png";
import enterCodeImage from "../../assets/images/enter_code.png";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import Layout from "../../constants/Layout";
import { customStyle } from "./style";

const CELL_COUNT = 4;
const { window } = Layout;

export default function VerificationScreen() {
  const styles = customStyle({ window });
  const [value, setValue] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [codeSent, setCodeSent] = useState(false);
  const [accountVerified, setAccountVerified] = useState(false);
  const phoneInput = useRef<PhoneInput>(null);
  const [validationCode, setValidationCode] = useState("");
  const validCodeRef = useBlurOnFulfill({
    value: validationCode,
    cellCount: CELL_COUNT,
  });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: validationCode,
    setValue: setValidationCode,
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerView}>
        <Pressable style={styles.backButton}>
          <Entypo name="chevron-left" size={20} color={Colors.darkGray} />
        </Pressable>
        {accountVerified ? (
          <View style={styles.verifiedContainer}>
            <Text style={styles.verifiedContainerHeading}>
              Account verified!
            </Text>
            <Image source={accountVerifiedImage} />
          </View>
        ) : (
          <View>
            <View style={styles.logo}>
              <ImageBackground source={imageBg} style={styles.imageBg}>
                <Image source={codeSent ? enterCodeImage : enterNumberImage} />
              </ImageBackground>
              {codeSent ? (
                <View>
                  <View style={styles.numContainer}>
                    <Text style={styles.send}>Code sent to</Text>
                    <Text style={styles.num}>{value}</Text>
                  </View>
                  <View style={styles.numContainer}>
                    <Text style={styles.incorrect}>Incorrect code!</Text>
                    <Text style={styles.send}>Please try again</Text>
                  </View>
                </View>
              ) : (
                <Text style={styles.title}>
                  You'll receive a 4-digit code for verification
                </Text>
              )}
            </View>
            {codeSent ? (
              <View style={styles.centerContainer}>
                <CodeField
                  ref={validCodeRef}
                  {...props}
                  value={validationCode}
                  onChangeText={setValidationCode}
                  cellCount={CELL_COUNT}
                  rootStyle={styles.codeFiledRoot}
                  keyboardType="number-pad"
                  textContentType="oneTimeCode"
                  renderCell={({ index, symbol, isFocused }) => (
                    <Text
                      key={index}
                      style={[styles.cell]}
                      onLayout={getCellOnLayoutHandler(index)}
                    >
                      {symbol || (isFocused ? <Cursor /> : null)}
                    </Text>
                  )}
                />
                <View style={[styles.numContainer, styles.mt43]}>
                  <Text style={styles.send}>Didn't receive code ?</Text>
                  <Text style={styles.num}>Resend</Text>
                </View>
                <View style={[styles.numContainer, styles.mt43]}>
                  <Text style={styles.send}>OR</Text>
                </View>
                <TouchableOpacity style={styles.createBtn}>
                  <Text style={styles.buttonText}>
                    Verify and create account
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.createBtn}
                  onPress={() => setAccountVerified((preState) => !preState)}
                >
                  <Text style={styles.buttonText}>Resend Code</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.bottomContainer}>
                <View style={styles.fieldContainer}>
                  <Text style={styles.fieldLabel}>Enter your phone number</Text>
                  <PhoneInput
                    ref={phoneInput}
                    initialValue={value}
                    initialCountry="in"
                    onChangePhoneNumber={(phNum, iso) => {
                      setValue(phNum);
                      setCountryCode(iso);
                    }}
                    flagStyle={{ display: "none" }}
                  />
                </View>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => setCodeSent((preState) => !preState)}
                >
                  <Text style={styles.buttonText}>Continue</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
