import {
  Text,
  Pressable,
  SafeAreaView,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Entypo } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import PhoneInput from "react-native-phone-input";
import imageBg from "../../assets/images/image_bg.png";
import enterNumberImage from "../../assets/images/enter_number.png";
import accountVerifiedImage from "../../assets/images/account_verified.png";
import enterCodeImage from "../../assets/images/enter_code.png";
import { CodeField, Cursor } from "react-native-confirmation-code-field";
import { useVerificationScreen } from "./useVerificationScreen";

const CELL_COUNT = 4;

const VerificationScreen = (props: any) => {
  const {
    accountVerified,
    codeSent,
    getCellOnLayoutHandler,
    phoneInput,
    codeProps,
    setAccountVerified,
    setCodeSent,
    setCountryCode,
    setValidationCode,
    setPhNum,
    styles,
    validCodeRef,
    validationCode,
    phNum,
  } = useVerificationScreen();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerView}>
        <Pressable
          style={styles.backButton}
          onPress={() =>
            props.navigation.navigate(accountVerified ? "Home" : "Landing")
          }
        >
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
                    <Text style={styles.num}>{phNum}</Text>
                  </View>
                  {/* <View style={styles.numContainer}>
                    <Text style={styles.incorrect}>Incorrect code!</Text>
                    <Text style={styles.send}>Please try again</Text>
                  </View> */}
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
                  {...codeProps}
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
                {/* <View style={[styles.numContainer, styles.mt43]}>
                  <Text style={styles.send}>OR</Text>
                </View> */}
                <TouchableOpacity
                  style={[
                    styles.createBtn,
                    validationCode.length !== 4 && styles.disabledBtn,
                  ]}
                  onPress={() => setAccountVerified((preState) => !preState)}
                >
                  <Text style={styles.buttonText}>
                    Verify and create account
                  </Text>
                </TouchableOpacity>
                {/* <TouchableOpacity
                  style={styles.createBtn}
                  onPress={() => setAccountVerified((preState) => !preState)}
                >
                  <Text style={styles.buttonText}>Resend Code</Text>
                </TouchableOpacity> */}
              </View>
            ) : (
              <View style={styles.bottomContainer}>
                <View style={styles.fieldContainer}>
                  <Text style={styles.fieldLabel}>Enter your phone number</Text>
                  <PhoneInput
                    ref={phoneInput}
                    initialValue={phNum}
                    initialCountry="in"
                    onChangePhoneNumber={(phNum, iso) => {
                      setPhNum(phNum);
                      setCountryCode(iso);
                    }}
                    flagStyle={{ display: "none" }}
                  />
                </View>
                <TouchableOpacity
                  style={[styles.button, !phNum && styles.disabledBtn]}
                  onPress={() => setCodeSent((preState) => !preState)}
                  disabled={!phNum}
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
};

export default VerificationScreen;
