import { StyleProp, Text, TouchableOpacity, ViewStyle } from "react-native";
import React from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import useDateTimePicker from "./useDateTimePicker";
import { Moment } from "moment";
import { styles } from "./styles";

type DateTimePickerProps = {
  type: "date" | "time" | "datetime";
  value: Moment;
  onChange: any;
  formatToShow: string;
  classNames?: StyleProp<ViewStyle>;
};

const DateTimePicker = ({
  type = "date",
  value,
  onChange,
  formatToShow,
  classNames,
}: DateTimePickerProps) => {
  const { state, handleConfirm, handleShowDatePicker, hideDatePicker } =
    useDateTimePicker({ value, onChange });
  const { date, showDatePicker } = state;

  return (
    <>
      <TouchableOpacity
        style={[styles.w195, styles.timeInputContainer, classNames]}
        onPress={handleShowDatePicker}
      >
        <Text>{date?.format(formatToShow)}</Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={showDatePicker}
        mode={type}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        date={date?.toDate()}
      />
    </>
  );
};

export default DateTimePicker;
