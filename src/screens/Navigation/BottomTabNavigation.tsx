import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomTabBar } from "../../constants/BottomTabBar";
import { styles } from "./styles";

const BottomTab = createBottomTabNavigator();

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

export default BottomTabNavigation;
