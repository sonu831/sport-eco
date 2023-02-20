import { registerUser, validateOtp } from "./../../services/users";
import { phNumRegex, mockCode } from "./../../constants/index";
import { useRef, useState } from "react";
import {
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { customStyle } from "./style";
import Layout from "../../constants/Layout";
import { useDispatch, useSelector } from "react-redux";
import { userDetails$ } from "../../store/users/selectors";
import { AppDispatch } from "../../store";
import { UpdateStateRequest } from "../../types/UpdateState";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../Navigation/types";
import { setIsVerified } from "../../store/users/reducers";

const CELL_COUNT = 4;
const { window } = Layout;

type InitialStateType = {
  phNum: string;
  codeSent: boolean;
  accountVerified: boolean;
  invalidCode: boolean;
  codeToValidate: string;
};

const initialState = {
  phNum: "",
  codeSent: false,
  accountVerified: false,
  invalidCode: false,
  codeToValidate: "",
};

export const useVerificationScreen = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    keyof RootStackParamList,
    undefined
  >;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const styles = customStyle({ window });
  const [state, setState] = useState<InitialStateType>(initialState);
  const phoneInput = useRef(null);
  const [validationCode, setValidationCode] = useState("");
  const validCodeRef = useBlurOnFulfill({
    value: validationCode,
    cellCount: CELL_COUNT,
  });
  const [codeProps, getCellOnLayoutHandler] = useClearByFocusCell({
    value: validationCode,
    setValue: setValidationCode,
  });
  const { phNum, codeToValidate } = state;

  const updateState = (request: UpdateStateRequest<keyof InitialStateType>) => {
    if (Array.isArray(request)) {
      request.forEach(({ key, value }) =>
        setState((preState) => ({ ...preState, [key]: value }))
      );
    } else {
      const { key, value } = request;
      setState((preState) => ({ ...preState, [key]: value }));
    }
  };

  const isPhNumValid = () => phNumRegex.test(phNum);

  const isEnterCodeValid = () => validationCode.toString() === codeToValidate;
  const handleCreateAccount = () => {
    const request = {
      phNum,
    };
    dispatch(registerUser(request)).then((res) => {
      const { data = {} } = res.payload;
      console.log("data", data);
      if (!!data.otp)
        updateState([
          {
            key: "codeToValidate",
            value: data.otp,
          },
          {
            key: "codeSent",
            value: true,
          },
        ]);
    });
  };

  const handleOTPValidation = () => {
    const isValid = isEnterCodeValid();

    if (isEnterCodeValid()) {
      const request = {
        contact_no: phNum,
        otp: codeToValidate,
      };
      dispatch(validateOtp(request)).then((res) => {
        dispatch(setIsVerified(true));
        navigation.navigate("Confirmation", {
          label: "Account verified!",
          navigateTo: "EditProfile",
          isNewUser: !res.payload.redirecttodashboard,
        });
      });
    } else {
      updateState({
        key: "invalidCode",
        value: true,
      });
      setValidationCode("");
    }
  };

  return {
    validCodeRef,
    codeProps,
    getCellOnLayoutHandler,
    validationCode,
    setValidationCode,
    phoneInput,
    styles,
    isPhNumValid,
    isEnterCodeValid,
    handleCreateAccount,
    updateState,
    state,
    handleOTPValidation,
  };
};
