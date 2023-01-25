import { useRef, useState } from "react";
import PhoneInput from "react-native-phone-input";
import {
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { customStyle } from "./style";
import Layout from "../../constants/Layout";

const CELL_COUNT = 4;
const { window } = Layout;

export const useVerificationScreen = () => {
  const styles = customStyle({ window });
  const [phNum, setPhNum] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [codeSent, setCodeSent] = useState(false);
  const [accountVerified, setAccountVerified] = useState(false);
  const phoneInput = useRef<PhoneInput>(null);
  const [validationCode, setValidationCode] = useState("");
  const validCodeRef = useBlurOnFulfill({
    value: validationCode,
    cellCount: CELL_COUNT,
  });
  const [codeProps, getCellOnLayoutHandler] = useClearByFocusCell({
    value: validationCode,
    setValue: setValidationCode,
  });

  return {
    validCodeRef,
    codeProps,
    getCellOnLayoutHandler,
    validationCode,
    setValidationCode,
    accountVerified,
    setAccountVerified,
    phoneInput,
    codeSent,
    setCodeSent,
    countryCode,
    setCountryCode,
    phNum,
    setPhNum,
    styles,
  };
};
