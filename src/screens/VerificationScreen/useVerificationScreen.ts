import { StorageKeys } from "./../../constants/storageKeys";
import { storeDataInStorage } from "./../../utils/storage";
import { registerUser } from "./../../services/users";
import { phNumRegex, mockCode } from "./../../constants/index";
import { useRef, useState } from "react";
import PhoneInput from "react-native-phone-input";
import {
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { customStyle } from "./style";
import Layout from "../../constants/Layout";
import { useDispatch, useSelector } from "react-redux";
import { userDetails$ } from "../../store/users/selectors";

const CELL_COUNT = 4;
const { window } = Layout;

export const useVerificationScreen = () => {
  const dispatch = useDispatch();
  const styles = customStyle({ window });
  const userDetails = useSelector(userDetails$);
  const [phNum, setPhNum] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [codeSent, setCodeSent] = useState(false);
  const [accountVerified, setAccountVerified] = useState(false);
  const [invalidCode, setInvalidCode] = useState(false);
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

  const isPhNumValid = () => phNumRegex.test(phNum);

  const isEnterCodeValid = () => validationCode === mockCode;

  const handleCreateAccount = () => {
    if (isEnterCodeValid()) {
      const request = {
        phNum,
      };
      dispatch(registerUser(request));
    } else {
      setInvalidCode(true);
      setValidationCode("");
    }
  };

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
    isPhNumValid,
    isEnterCodeValid,
    handleCreateAccount,
    invalidCode,
    setInvalidCode,
  };
};
