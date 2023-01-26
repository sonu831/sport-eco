import ProfileScreen from "../screens/ProfilePage";
import AddPlayerScreen from "../screens/AddPlayer";
import MainScreen from "../screens/MainScreen";
import homeIcon from "../assets/images/home.png";
import calendarIcon from "../assets/images/calender.png";
import messageIcon from "../assets/images/message.png";
import profileIcon from "../assets/images/profile.png";

export const BottomTabBar = [
  {
    name: "Main",
    component: MainScreen,
    title: "",
    tabBarIcon: homeIcon,
  },
  {
    name: "Calendar",
    component: AddPlayerScreen,
    title: "",
    tabBarIcon: calendarIcon,
  },
  {
    name: "Message",
    component: ProfileScreen,
    title: "",
    tabBarIcon: messageIcon,
  },
  {
    name: "Profile",
    component: ProfileScreen,
    title: "",
    tabBarIcon: profileIcon,
  },
];
