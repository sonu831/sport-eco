import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";
import SafeArea from "../../components/SafeArea";
import Entypo from "react-native-vector-icons/Entypo";
import { styles } from "./styles";
import { Colors } from "../../constants/Colors";
import useAddEvent from "./useAddEvent";
import { RootStackScreenProps } from "../Navigation/types";
import TextField from "../../components/TextField";
import calendarIcon from "../../assets/images/calendar-grey.png";
import { CalendarOptions } from "../../constants/events";
import DateTimePicker from "../../components/DateTimePicker";
import moment from "moment";

const AddEvents = ({
  navigation,
  route,
}: RootStackScreenProps<"AddEvents">) => {
  const { handleGoBack, state, updateState } = useAddEvent({
    navigation,
    route,
  });

  const { title, calenderOption, date } = state;

  return (
    <SafeArea classNames={styles.safeView}>
      <ScrollView>
        <View style={[styles.containerView, styles.flex]}>
          <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
            <Entypo name="chevron-left" size={20} color={Colors.darkGray} />
          </TouchableOpacity>
          <View style={styles.mxAuto}>
            <Text style={styles.headingText}>Add Event</Text>
          </View>
        </View>
        <View style={[styles.containerView, styles.m42]}>
          <View style={[styles.fieldRow, styles.py16]}>
            <View style={styles.flex}>
              <Text style={styles.fieldRowLabel}>Title</Text>
              <Text style={styles.required}>*</Text>
            </View>
            <TextField
              value={title}
              onChangeText={(newTitle) =>
                updateState({
                  key: "title",
                  value: newTitle,
                })
              }
              classNames={styles.w195}
            />
          </View>
          <View style={[styles.fieldRow, styles.py16]}>
            <View style={styles.flex}>
              {CalendarOptions.map((option, optionIndex) => (
                <TouchableOpacity
                  key={optionIndex}
                  style={[
                    styles.calendarOption,
                    calenderOption === option && styles.selected,
                    optionIndex !== 0 && styles.ml5,
                  ]}
                  onPress={() =>
                    updateState({
                      key: "calenderOption",
                      value: option,
                    })
                  }
                >
                  <Text
                    style={calenderOption === option && styles.selectedText}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <Image source={calendarIcon} />
          </View>
          <DateTimePicker
            type="date"
            value={date}
            onChange={(value: any) =>
              updateState({
                key: "date",
                value: moment(value),
              })
            }
            formatToShow="DD-MM-YYYY"
          />
        </View>
      </ScrollView>
    </SafeArea>
  );
};

export default AddEvents;
