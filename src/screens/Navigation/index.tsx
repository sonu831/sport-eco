import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import LandingScreen from "../LandingScreen";
import VerificationScreen from "../VerificationScreen";
import BottomTabNavigation from "./BottomTabNavigation";
import useNavigation from "./useNavigation";
import EditProfile from "../EditProfile";
import CommonScreen from "../CommonScreen";
import { RootStackParamList } from "./types";
import MainScreen from "../MainScreen";
import ProfileScreen from "../ProfilePage";
import Confirmation from "../Confirmation";
import Spinner from "react-native-loading-spinner-overlay";

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation = () => {
  const { userData, isLoading } = useNavigation();

  return (
    <NavigationContainer>
      <Spinner visible={isLoading} />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!!userData?.phNum ? (
          <Stack.Group>
            {/* <Stack.Screen name="Home" component={BottomTabNavigation} /> */}
            <Stack.Screen name="Main" component={MainScreen} />
            <Stack.Screen name="Calendar" component={ProfileScreen} />
            <Stack.Screen name="Message" component={ProfileScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
            <Stack.Screen name="CommonScreen" component={CommonScreen} />
            <Stack.Screen name="Confirmation" component={Confirmation} />
          </Stack.Group>
        ) : (
          <Stack.Group>
            <Stack.Screen name="Landing" component={LandingScreen} />
            <Stack.Screen name="Verification" component={VerificationScreen} />
          </Stack.Group>
        )}
      </Stack.Navigator>

      {!!userData?.phNum && <BottomTabNavigation />}
    </NavigationContainer>
  );
};

export default Navigation;
