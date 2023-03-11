import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import React from "react";
import SafeArea from "../../components/SafeArea";
import Entypo from "react-native-vector-icons/Entypo";
import { styles } from "./styles";
import { Colors } from "../../constants/Colors";
import useAddEvent from "./useAddEvent";
import { RootStackScreenProps } from "../Navigation/types";
import TextField from "../../components/TextField";
import calendarIcon from "../../assets/images/calendar-grey.png";
import arrowIcon from "../../assets/images/arrow.png";
import allDayIcon from "../../assets/images/all_day.png";
import clockIcon from "../../assets/images/clock.png";
import { CalendarOptions, REPEAT_OPTIONS } from "../../constants/events";
import DateTimePicker from "../../components/DateTimePicker";
import CustomDropdown from "../../components/Dropdown";
import moment from "moment";
import CustomSwitch from "../../components/Switch";
import { Calendar } from "react-native-calendars";
import Layout from "../../constants/Layout";
import CustomCalendar from "../../components/Calendar";

const { window } = Layout;

const AddEvents = ({
  navigation,
  route,
}: RootStackScreenProps<"AddEvents">) => {
  const { handleGoBack, state, updateState } = useAddEvent({
    navigation,
    route,
  });

  const {
    title,
    calenderOption,
    date,
    endTime,
    startTime,
    repeatOption,
    allDay,
    customEmail,
    participant,
    description,
    program,
    venue,
    calendarDate,
  } = state;

  const diffInMinutes = endTime.diff(startTime, "minutes");
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInMinutesRemainder = diffInMinutes % 60;
  const minutesToShow = !!diffInMinutesRemainder ? diffInMinutesRemainder : "";

  const markedDates = {
    [calendarDate.format("YYYY-MM-DD")]: {
      selected: true,
    },
  };

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
          <View style={styles.fieldRow}>
            <CustomCalendar
              value={calendarDate}
              onChange={(day) =>
                updateState({
                  key: "calendarDate",
                  value: moment(day.dateString),
                })
              }
            />
          </View>
          <View style={[styles.flex, styles.py16, styles.px25]}>
            <Image source={clockIcon} />
            <DateTimePicker
              type="time"
              value={startTime}
              onChange={(value: any) =>
                updateState({
                  key: "startTime",
                  value: moment(value),
                })
              }
              formatToShow="HH:mm"
              classNames={styles.timeField}
            />
            <DateTimePicker
              type="time"
              value={endTime}
              onChange={(value: any) =>
                updateState({
                  key: "endTime",
                  value: moment(value),
                })
              }
              formatToShow="HH:mm"
              classNames={[styles.timeField, styles.ml10]}
            />
            <Image source={arrowIcon} style={styles.arrow} />
            <Text>{`${diffInHours}${
              minutesToShow ? `.${minutesToShow}` : ""
            } hrs`}</Text>

            <CustomDropdown
              options={REPEAT_OPTIONS}
              value={repeatOption}
              onChange={(item) => {
                updateState({ key: "repeatOption", value: item.value });
              }}
              containerStyle={[styles.w94, styles.mlAuto]}
              placeholder="Repeat"
            />
          </View>
          <View style={[styles.fieldRow, styles.py16]}>
            <View style={styles.flex}>
              <Image source={allDayIcon} />
              <Text style={styles.ml10}>All Day</Text>
            </View>

            <CustomSwitch
              value={allDay}
              onChange={(val) => {
                updateState({
                  key: "allDay",
                  value: val,
                });
              }}
            />
          </View>
          <View style={[styles.borderBottom, styles.mt24]} />

          <View style={[styles.fieldRow, styles.py16]}>
            <Text>Add Participant</Text>
            <CustomDropdown
              options={REPEAT_OPTIONS}
              value={participant}
              onChange={(item) => {
                updateState({ key: "participant", value: item.value });
              }}
              isPlaceholderHidden={true}
            />
          </View>
          <View style={[styles.fieldRow, styles.justifyCenter]}>
            <Text>OR</Text>
          </View>
          <View style={[styles.fieldRow, styles.py16]}>
            <Text>Custom Email</Text>
            <TextInput
              value={customEmail}
              onChangeText={(newName) =>
                updateState({ key: "customEmail", value: newName })
              }
              style={[styles.fieldInput, styles.w195]}
            />
          </View>
          <View style={[styles.fieldRow, styles.py16]}>
            <Text>Add Program</Text>
            <CustomDropdown
              options={REPEAT_OPTIONS}
              value={program}
              onChange={(item) => {
                updateState({ key: "program", value: item.value });
              }}
              isPlaceholderHidden={true}
            />
          </View>
          <View style={[styles.fieldRow, styles.py16]}>
            <Text>Venue Name</Text>
            <CustomDropdown
              options={REPEAT_OPTIONS}
              value={venue}
              onChange={(item) => {
                updateState({ key: "venue", value: item.value });
              }}
              isPlaceholderHidden={true}
            />
          </View>
          <View style={[styles.fieldRow, styles.py16]}>
            <Text style={styles.fieldRowLabel}>Description</Text>
            <TextField
              value={description}
              onChangeText={(newDesc) =>
                updateState({
                  key: "description",
                  value: newDesc,
                })
              }
              classNames={[styles.w195, styles.h104]}
              isMultiline={true}
            />
          </View>

          <View style={[styles.fieldRow, styles.justifyCenter, styles.mv20]}>
            <TouchableOpacity style={styles.saveBtn}>
              <Text style={styles.saveBtnText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeArea>
  );
};

export default AddEvents;
