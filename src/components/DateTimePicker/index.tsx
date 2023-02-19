import { Text, TouchableOpacity } from "react-native";
import React from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import useDateTimePicker from "./useDateTimePicker";
import { Moment } from "moment";
import { styles } from "./styles";

type DateTimePickerProps = {
  type: "date" | "time" | "datetime";
  value: Moment;
  onChange: any;
};

const DateTimePicker = ({
  type = "date",
  value,
  onChange,
}: DateTimePickerProps) => {
  const { state, handleConfirm, handleShowDatePicker, hideDatePicker } =
    useDateTimePicker({ value, onChange });
  const { date, showDatePicker } = state;

  return (
    <>
      <TouchableOpacity
        style={[styles.w195, styles.timeInputContainer]}
        onPress={handleShowDatePicker}
      >
        <Text>{date?.format("HH:mm:ss")}</Text>
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
