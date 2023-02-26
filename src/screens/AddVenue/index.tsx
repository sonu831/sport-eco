import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import CustomDropdown from "../../components/Dropdown";
import SafeArea from "../../components/SafeArea";
import TextField from "../../components/TextField";
import { Colors } from "../../constants/Colors";
import { CITY_OPTIONS, STATE_OPTIONS } from "../../constants/EditProfile";
import { RootStackScreenProps } from "../Navigation/types";
import { styles } from "./styles";
import useAddVenue from "./useAddVenue";

const AddVenue = ({ navigation, route }: RootStackScreenProps<"AddVenue">) => {
  const { state, updateState, handleSave, handleGoBack } = useAddVenue({
    navigation,
    route,
  });
  const { name, courtName, sport, address, city, state: userState } = state;

  return (
    <SafeArea classNames={styles.safeView}>
      <ScrollView>
        <View style={[styles.containerView, styles.flex]}>
          <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
            <Entypo name="chevron-left" size={20} color={Colors.darkGray} />
          </TouchableOpacity>
          <View>
            <Text style={styles.headingText}>Add Venue</Text>
          </View>
        </View>
        <View style={styles.containerView}>
          <View style={[styles.fieldRow, styles.py16]}>
            <View style={styles.flex}>
              <Text style={styles.fieldRowLabel}>Venue Name</Text>
              <Text style={styles.required}>*</Text>
            </View>
            <TextInput
              value={name}
              onChangeText={(newName) =>
                updateState({ key: "name", value: newName })
              }
              style={[styles.fieldInput, styles.w195]}
            />
          </View>
          <View style={[styles.fieldRow, styles.py16]}>
            <View style={styles.flex}>
              <Text style={styles.fieldRowLabel}>Court Name</Text>
            </View>
            <TextInput
              value={courtName}
              onChangeText={(newName) =>
                updateState({ key: "courtName", value: newName })
              }
              style={[styles.fieldInput, styles.w195]}
            />
          </View>
          <View style={[styles.fieldRow, styles.py16]}>
            <View style={styles.flex}>
              <Text style={styles.fieldRowLabel}>Sport</Text>
              <Text style={styles.required}>*</Text>
            </View>
            <TextInput
              value={sport}
              onChangeText={(newSport) =>
                updateState({ key: "sport", value: newSport })
              }
              style={[styles.fieldInput, styles.w195]}
            />
          </View>
          <View style={[styles.fieldRow, styles.py16]}>
            <View style={styles.flex}>
              <Text style={styles.fieldRowLabel}>Address</Text>
              <Text style={styles.required}>*</Text>
            </View>
            <TextField
              value={address}
              onChangeText={(newAddress) =>
                updateState({
                  key: "address",
                  value: newAddress,
                })
              }
              classNames={[styles.w195, styles.h104]}
              isMultiline={true}
            />
          </View>
          <View style={[styles.fieldRow, styles.py16]}>
            <View style={styles.flex}>
              <Text style={styles.fieldRowLabel}>City</Text>
              <Text style={styles.required}>*</Text>
            </View>
            <CustomDropdown
              options={CITY_OPTIONS}
              value={city}
              onChange={(item) => {
                updateState({ key: "city", value: item.value });
              }}
            />
          </View>
          <View style={[styles.fieldRow, styles.py16]}>
            <View style={styles.flex}>
              <Text style={styles.fieldRowLabel}>State</Text>
              <Text style={styles.required}>*</Text>
            </View>
            <CustomDropdown
              options={STATE_OPTIONS}
              value={userState}
              onChange={(item) => {
                updateState({ key: "state", value: item.value });
              }}
            />
          </View>
          {/* <View style={[styles.fieldRow, styles.py16]}>
            <View style={styles.flex}>
              <Text style={styles.fieldRowLabel}>Map</Text>
            </View>
          </View> */}

          <View style={[styles.fieldRow, styles.justifyCenter, styles.mv20]}>
            <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
              <Text style={styles.saveBtnText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeArea>
  );
};

export default AddVenue;
