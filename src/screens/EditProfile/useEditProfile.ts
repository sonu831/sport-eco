import { useCallback, useEffect, useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { userDetails$ } from "../../store/users/selectors";
import { updateUserProfile } from "../../services/users";
import { RootStackParamList } from "../Navigation/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppDispatch } from "../../store";
import { RouteProp } from "@react-navigation/native";
import { FileUploadResponse } from "../../types/FileUpload";
import { User } from "../../types/User";
import { UpdateStateRequest } from "../../types/UpdateState";

type InitialState = {
  fName: string;
  lName: string;
  mName: string;
  email: string;
  dobMonth: string;
  dobDate: string;
  dobYear: string;
  gender: string;
  city: string;
  state: string;
  role: string[];
  image: string;
  idProof?: FileUploadResponse;
};

const initialState = {
  fName: "",
  lName: "",
  mName: "",
  email: "",
  dobMonth: "",
  dobDate: "",
  dobYear: "",
  gender: "",
  city: "",
  state: "",
  role: [],
  image: "",
  idProof: undefined,
};

const useEditProfile = ({
  navigation,
  route,
}: {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    "EditProfile",
    undefined
  >;
  route: RouteProp<RootStackParamList, "EditProfile">;
}) => {
  const isAddPlayer = route?.params?.isAddPlayer || false;

  const dispatch = useDispatch<AppDispatch>();
  const [response, setResponse] = useState<any>(null);
  const userDetails: Partial<User> = useSelector(userDetails$);
  const [state, setState] = useState<InitialState>(initialState);

  const handleGoBack = () => navigation.goBack();

  const updateState = (request: UpdateStateRequest<keyof InitialState>) => {
    if (Array.isArray(request)) {
      request.forEach(({ key, value }) =>
        setState((preState) => ({ ...preState, [key]: value }))
      );
    } else {
      const { key, value } = request;
      setState((preState) => ({ ...preState, [key]: value }));
    }
  };

  const uploadImage = useCallback((image: string) => {
    updateState({
      key: "image",
      value: image,
    });
  }, []);

  const handleUploadID = useCallback((file: any) => {
    console.log("file", file);
    updateState({
      key: "idProof",
      value: file,
    });
  }, []);

  useEffect(() => {
    if (!isAddPlayer && !!userDetails?._id) {
      const {
        email,
        gender,
        role,
        state,
        city,
        first_name,
        last_name,
        middle_name,
      } = userDetails;

      updateState([
        { key: "email", value: email || "" },
        { key: "fName", value: first_name || "" },
        { key: "lName", value: last_name || "" },
        { key: "mName", value: middle_name || "" },
        { key: "gender", value: gender || "" },
        { key: "role", value: role || [] },
        { key: "state", value: state || "" },
        { key: "city", value: city || "" },
        // { key: "dobMonth", value: dob ? moment(dob).format("MMM") : "" },
        // { key: "dobDate", value: dob ? moment(dob).format("DD") : "" },
        // { key: "dobYear", value: dob ? moment(dob).format("YYYY") : "" },
      ]);
    }
  }, [userDetails]);

  const handleSave = () => {
    const {
      email,
      fName,
      lName,
      mName,
      gender,
      role,
      state: userState,
      city,
      dobMonth,
      dobDate,
      dobYear,
    } = state;

    const request = {
      first_name: fName,
      last_name: lName,
      middle_name: mName,
      DOB: {
        date: dobDate,
        month: dobMonth,
        year: dobYear,
      },
      email: email?.toLowerCase(),
      gender: gender,
      city: city,
      state: userState,
      role: role,
    };

    dispatch(
      updateUserProfile({
        data: request,
      })
    ).then(() => navigation.navigate("Main"));
  };

  return {
    uploadImage,
    userDetails,
    updateState,
    state,
    handleSave,
    response,
    handleGoBack,
    handleUploadID,
  };
};

export default useEditProfile;
