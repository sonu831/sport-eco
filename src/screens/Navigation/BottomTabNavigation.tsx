import {Image, TouchableOpacity, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BottomTabBar} from '../../constants/BottomTabBar';
import {useNavigation} from '@react-navigation/native';
import {styles} from './styles';
import {RootStackParamList} from './types';
import {useEffect, useState} from 'react';

const BottomTab = createBottomTabNavigator();

// const BottomTabNavigation = () => {
//   return (
//     <BottomTab.Navigator
//       initialRouteName="Main"
//       screenOptions={{
//         headerShown: false,
//         tabBarStyle: styles.tabBarStyle,
//       }}
//     >
//       {BottomTabBar.map((tab, tabIndex) => {
//         return (
//           <BottomTab.Screen
//             key={tabIndex}
//             name={tab.name}
//             component={tab.component}
//             options={() => ({
//               title: tab.title,
//               tabBarIcon: () => <Image source={tab.tabBarIcon} />,
//             })}
//           />
//         );
//       })}
//     </BottomTab.Navigator>
//   );
// };

const BottomTabNavigation = () => {
  const navigation = useNavigation();
  const [showTabBar, setShowTabBar] = useState(false);

  console.log('nagiation', navigation.getParent());

  // useEffect(() => {
  //   navigation.getParent()?.setOptions({
  //     tabBarStyle: {
  //       display: 'none',
  //     },
  //   });
  //   return () =>
  //     navigation.getParent()?.setOptions({
  //       tabBarStyle: undefined,
  //     });
  // }, [navigation]);

  return (
    <View style={styles.tabBarStyle}>
      {BottomTabBar({navigation}).map((tab, tabIndex) => {
        return (
          <TouchableOpacity key={tabIndex} onPress={tab.onPress}>
            <Image source={tab.tabBarIcon} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default BottomTabNavigation;
