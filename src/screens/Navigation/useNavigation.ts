import { fetchUserById } from "./../../services/users";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { StorageKeys } from "./../../constants/storageKeys";
import { useEffect } from "react";
import { fetchFromStorage } from "./../../utils/storage";
import { userDetails$ } from "../../store/users/selectors";
import { AppDispatch } from "../../store";
import { isLoading$ } from "../../store/common/selectors";
import * as SplashScreen from "expo-splash-screen";

type UserDataProps = {
  phNum: string;
  id: string;
  fName: string;
  lName: string;
  mName: string;
  email: string;
  gender: string;
  category: string;
  state: string;
  city: string;
  dob: string;
  imageURl: string;
};

SplashScreen.preventAutoHideAsync();

const useNavigation = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [appReady, isAppReady] = useState(false);
  const [userData, setUserData] = useState<Partial<UserDataProps>>();
  const userDetails = useSelector(userDetails$);
  const isLoading = useSelector(isLoading$);

  useEffect(() => {
    fetchFromStorage(StorageKeys.userDetails).then((user) => {
      if (!!user) {
        const value = JSON.parse(user);
        dispatch(fetchUserById(value)).then(() => isAppReady(true));
      } else {
        isAppReady(true);
      }
    });
  }, []);

  useEffect(() => {
    setUserData(userDetails);
  }, [userDetails]);

  useEffect(() => {
    const hideSplashScreen = async () => {
      await SplashScreen.hideAsync();
    };

    if (appReady) hideSplashScreen();
  }, [appReady]);

  return {
    userData,
    isLoading,
    appReady,
  };
};

export default useNavigation;
