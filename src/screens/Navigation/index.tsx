import React from "react";
import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import LandingScreen from "../LandingScreen";
import VerificationScreen from "../VerificationScreen";
import { BottomTabBar } from "../../constants/BottomTabBar";
import { styles } from "./styles";

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
      initialRouteName="Main"
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBarStyle,
      }}
    >
      {BottomTabBar.map((tab, tabIndex) => {
        return (
          <BottomTab.Screen
            key={tabIndex}
            name={tab.name}
            component={tab.component}
            options={() => ({
              title: tab.title,
              tabBarIcon: () => <Image source={tab.tabBarIcon} />,
            })}
          />
        );
      })}
    </BottomTab.Navigator>
  );
};

export default Navigation;
