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
import deleteIcon from "../../assets/images/delete.png";
import dummyUserIcon from "../../assets/images/dummy-user.png";
import { styles } from "./styles";
import TextField from "../../components/TextField";
import useAddBatch from "./useAddBatch";
import { RootStackScreenProps } from "../Navigation/types";
import { PlayerDefinition } from "../../types/player";

const AddBatch = ({ navigation, route }: RootStackScreenProps<"AddBatch">) => {
  const {
    state,
    updateState,
    removeSelectedPlayer,
    selectedPlayers,
    handleGoBack,
    handleSaveBatches,
  } = useAddBatch({ navigation, route });

  const { batchName = "", description = "" } = state;

  return (
    <SafeAreaView style={styles.safeView}>
      <ScrollView>
        <View style={[styles.containerView, styles.flex]}>
          <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
            <Entypo name="chevron-left" size={20} color={Colors.darkGray} />
          </TouchableOpacity>
          <View style={styles.mxAuto}>
            <Text style={styles.headingText}>Batches</Text>
          </View>
        </View>
        <View style={[styles.containerView, styles.m42]}>
          <View style={[styles.fieldRow, styles.py16]}>
            <View style={styles.flex}>
              <Text style={styles.fieldRowLabel}>Batch Name</Text>
              <Text style={styles.required}>*</Text>
            </View>
            <TextField
              value={batchName}
              onChangeText={(batchName) =>
                updateState({
                  key: "batchName",
                  value: batchName,
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
          <View style={[styles.alignCenter, styles.m42]}>
            <TouchableOpacity
              style={styles.addPlayerBtn}
              onPress={() => navigation.navigate("SelectPlayer")}
            >
              <Text style={styles.addPlayerBtnText}>Add Players</Text>
              <Entypo name="circle-with-plus" size={12} color={Colors.white} />
            </TouchableOpacity>
          </View>
          <View style={styles.m42}>
            {selectedPlayers.map((player: PlayerDefinition, i) => {
              return (
                <View
                  key={i}
                  style={[
                    styles.listItem,
                    i !== selectedPlayers.length - 1 && styles.mb30,
                  ]}
                >
                  <Image source={dummyUserIcon} style={styles.playerImage} />
                  <Text style={styles.listItemText}>{player.fName}</Text>
                  <TouchableOpacity
                    style={[styles.mlAuto, styles.mr30]}
                    onPress={() => removeSelectedPlayer(player)}
                  >
                    <Image source={deleteIcon} />
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
          <View style={[styles.alignCenter, styles.mt85]}>
            <TouchableOpacity
              style={[
                styles.saveBtn,
                selectedPlayers.length === 0 && styles.opacity50,
              ]}
              onPress={handleSaveBatches}
              disabled={selectedPlayers.length === 0}
            >
              <Text style={styles.saveBtnText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddBatch;
