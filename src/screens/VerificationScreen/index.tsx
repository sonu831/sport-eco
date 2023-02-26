import {
  Text,
  Pressable,
  SafeAreaView,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import { Colors } from "../../constants/Colors";
import { Input } from "react-native-elements";
import imageBg from "../../assets/images/image_bg.png";
import enterNumberImage from "../../assets/images/enter_number.png";
// import accountVerifiedImage from "../../assets/images/account_verified.png";
import enterCodeImage from "../../assets/images/enter_code.png";
import { CodeField, Cursor } from "react-native-confirmation-code-field";
import { useVerificationScreen } from "./useVerificationScreen";
import { RootStackScreenProps } from "../Navigation/types";
import SafeArea from "../../components/SafeArea";

const CELL_COUNT = 4;

const VerificationScreen = ({
  navigation,
}: RootStackScreenProps<"Verification">) => {
  const {
    getCellOnLayoutHandler,
    phoneInput,
    codeProps,
    setValidationCode,
    styles,
    validCodeRef,
    validationCode,
    isPhNumValid,
    handleCreateAccount,
    state,
    handleOTPValidation,
    updateState,
  } = useVerificationScreen({ navigation });

  const { accountVerified, codeSent, invalidCode, phNum } = state;

  return (
    <SafeArea classNames={styles.container}>
      <View style={styles.containerView}>
        <Pressable
          style={styles.backButton}
          onPress={() =>
            navigation.navigate(accountVerified ? "Home" : "Landing")
          }
        >
          <Entypo name="chevron-left" size={20} color={Colors.darkGray} />
        </Pressable>
        <View>
          <View style={styles.logo}>
            <ImageBackground source={imageBg} style={styles.imageBg}>
              <Image source={codeSent ? enterCodeImage : enterNumberImage} />
            </ImageBackground>
            {codeSent ? (
              <View>
                {invalidCode ? (
                  <View style={styles.numContainer}>
                    <Text style={styles.incorrect}>Incorrect code!</Text>
                    <Text style={styles.send}>Please try again</Text>
                  </View>
                ) : (
                  <View style={styles.numContainer}>
                    <Text style={styles.send}>Code sent to</Text>
                    <Text style={styles.num}>{phNum}</Text>
                  </View>
                )}
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
              {invalidCode ? (
                <View style={[styles.numContainer, styles.mt43]}>
                  <Text style={styles.send}>OR</Text>
                </View>
              ) : (
                <View style={[styles.numContainer, styles.mt43]}>
                  <Text style={styles.send}>Didn't receive code ?</Text>
                  <Text style={styles.num}>Resend</Text>
                </View>
              )}
              {invalidCode ? (
                <TouchableOpacity
                  style={styles.createBtn}
                  onPress={() =>
                    updateState({
                      key: "invalidCode",
                      value: false,
                    })
                  }
                >
                  <Text style={styles.buttonText}>Resend Code</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={[
                    styles.createBtn,
                    validationCode.length !== 4 && styles.disabledBtn,
                  ]}
                  onPress={handleOTPValidation}
                >
                  <Text style={styles.buttonText}>
                    Verify and create account
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          ) : (
            <View style={styles.bottomContainer}>
              <View style={styles.fieldContainer}>
                <Input
                  ref={phoneInput}
                  keyboardType="number-pad"
                  onChangeText={(phone: string) => {
                    updateState({
                      key: "phNum",
                      value: phone,
                    });
                  }}
                  value={phNum}
                  containerStyle={styles.mt15}
                  inputContainerStyle={styles.fieldInputContainer}
                  inputStyle={styles.fieldInput}
                  label="Enter your phone number"
                  labelStyle={styles.fieldLabel}
                />
              </View>
              <TouchableOpacity
                style={[styles.button, !isPhNumValid() && styles.disabledBtn]}
                onPress={handleCreateAccount}
                disabled={!phNum}
              >
                <Text style={styles.buttonText}>Continue</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </SafeArea>
  );
};

export default VerificationScreen;
