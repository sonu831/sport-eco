import React from "react";
import Entypo from "react-native-vector-icons/Entypo";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../../constants/Colors";
import programIcon from "../../assets/images/clock-large.png";
import { styles } from "./styles";
import TextField from "../../components/TextField";
import useAddSession from "./useAddSession";
import { RootStackScreenProps } from "../Navigation/types";
import DateTimePicker from "../../components/DateTimePicker";
import moment from "moment";
import SafeArea from "../../components/SafeArea";

const AddSession = ({
  navigation,
  route,
}: RootStackScreenProps<"AddSession">) => {
  const { state, updateState, handleGoBack, handleSaveSession } = useAddSession(
    {
      navigation,
      route,
    }
  );

  const { description = "", sessionDuration, sessionName } = state;

  return (
    <SafeArea classNames={styles.safeView}>
      <ScrollView>
        <View style={[styles.containerView, styles.flex]}>
          <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
            <Entypo name="chevron-left" size={20} color={Colors.darkGray} />
          </TouchableOpacity>
          <View style={styles.mxAuto}>
            <Text style={styles.headingText}>Sessions</Text>
          </View>
        </View>
        <View style={styles.imageContainer}>
          <Image source={programIcon} />
        </View>
        <View style={[styles.containerView, styles.m42]}>
          <View style={[styles.fieldRow, styles.py16]}>
            <View style={styles.flex}>
              <Text style={styles.fieldRowLabel}>Session Name</Text>
              <Text style={styles.required}>*</Text>
            </View>
            <TextField
              value={sessionName}
              onChangeText={(sessionName) =>
                updateState({
                  key: "sessionName",
                  value: sessionName,
                })
              }
              classNames={styles.w195}
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
          <View style={[styles.fieldRow, styles.py16]}>
            <View style={styles.flex}>
              <Text style={styles.fieldRowLabel}>Session Duration</Text>
            </View>
            <DateTimePicker
              type="time"
              value={moment(sessionDuration)}
              onChange={(value: any) =>
                updateState({
                  key: "sessionDuration",
                  value: moment(value),
                })
              }
              formatToShow="HH:mm:ss"
            />
          </View>
          <View style={[styles.alignCenter, styles.mt85]}>
            <TouchableOpacity
              style={styles.saveBtn}
              onPress={handleSaveSession}
            >
              <Text style={styles.saveBtnText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeArea>
  );
};

export default AddSession;
