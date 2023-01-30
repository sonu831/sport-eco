import React from "react";
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { styles } from "./styles";
import useMainScreen from "./useMainScreen";
import { Colors } from "../../constants/Colors";
import SearchBar from "../../components/SearchBar";
import moment from "moment";
import { tabs, dummyEvent } from "../../constants/MainScreen";

const MainScreen = () => {
  const { updateState } = useMainScreen();
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.mainContainer}>
        <TouchableOpacity style={styles.menuIconContainer}>
          <MaterialIcons name="menu" size={30} color="black" />
        </TouchableOpacity>
        <SearchBar
          onChange={(searchString: string) =>
            updateState({ key: "searchedText", value: searchString })
          }
        />
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>Upcoming Events</Text>
          <View style={styles.viewMore}>
            <Text style={styles.viewMoreText}>View All Events</Text>
            <AntDesign name="eyeo" size={16} color={Colors.lightOrange1} />
          </View>
        </View>

        <ScrollView
          horizontal={true}
          contentContainerStyle={styles.scrollView}
          showsHorizontalScrollIndicator={false}
        >
          {dummyEvent.map((event, eventIndex) => (
            <View key={eventIndex} style={styles.eventContainer}>
              <Text style={styles.eventHeading}>{event.title}</Text>
              <Text style={styles.eventDateTime}>
                {moment(event.startTime).format("DD MMM, dddd")}
              </Text>
              <Text style={[styles.eventDateTime, styles.mt11]}>{`${moment(
                event.startTime
              ).format("HH:MM A")} - ${moment(event.endTime).format(
                "HH:MM A"
              )}`}</Text>
            </View>
          ))}
        </ScrollView>
        <View style={styles.navigator}>
          {tabs.map((tab, tabIndex) => (
            <TouchableOpacity
              key={tabIndex}
              style={[styles.navigatorItem, tabIndex % 2 === 0 && styles.mr42]}
            >
              <Image source={tab.icon} />
              <Text style={styles.navigatorItemText}>{tab.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MainScreen;