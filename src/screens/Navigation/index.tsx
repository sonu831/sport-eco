import React from "react";
import { Text, View, SafeAreaView } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { styles } from "./styles";
import ProfileScreen from "../ProfilePage";
import AddPlayerScreen from "../AddPlayer";
import { NavigationContainer } from "@react-navigation/native";
import LandingScreen from "../LandingScreen";
import VerificationScreen from "../VerificationScreen";

const BottomTab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Landing" component={LandingScreen} />
        <Stack.Screen name="Verification" component={VerificationScreen} />
        <Stack.Screen name="Home" component={BottomTabNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const BottomTabNavigation = () => {
  return (
    <BottomTab.Navigator
      initialRouteName="Profile"
      screenOptions={{ headerShown: false }}
    >
      <BottomTab.Screen name="Profile" component={ProfileScreen} />
      <BottomTab.Screen name="AddPlayer" component={AddPlayerScreen} />
    </BottomTab.Navigator>
  );
};

export default Navigation;
