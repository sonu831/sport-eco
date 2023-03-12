import React from "react";
import Entypo from "react-native-vector-icons/Entypo";
import {
  Text,
  View,
  SafeAreaView,
  Pressable,
  Image,
  ScrollView,
} from "react-native";
import { Colors } from "../../constants/Colors";
import { styles } from "./styles";
import useBatchPage from "./useBatchDetails";
import { RootStackScreenProps } from "../Navigation/types";
import Button from "../../components/Button";
import TextField from "../../components/TextField";
import SafeArea from "../../components/SafeArea";
import ConfirmationModal from "../../components/ConfirmationModal";

const BatchScreen = ({
  navigation,
  route,
}: RootStackScreenProps<"BatchScreen">) => {
  const {
    handleGoBack,
    handleBatchDeletion,
    batchDetails,
    state,
    updateState,
  } = useBatchPage({
    navigation,
    route,
  });

  const { showConfirmation } = state;

  const players = batchDetails?.players;

  return (
    <SafeArea classNames={styles.container}>
      <ScrollView>
        <View style={styles.containerView}>
          <View style={styles.flexDirRow}>
            <Pressable style={styles.backButton} onPress={handleGoBack}>
              <Entypo name="chevron-left" size={20} color={Colors.darkGray} />
            </Pressable>
            <Text style={styles.username}>{batchDetails?.batch_name}</Text>
          </View>
          <View style={[styles.headerContainer, styles.py16]}>
            <View style={styles.flexRow}>
              <Button
                label="Edit Batch"
                icon="chevron-right"
                onPress={() =>
                  navigation.navigate("AddBatch", {
                    isEdit: true,
                  })
                }
              />
              <Button
                type="cancel"
                label="Delete Batch"
                icon="chevron-right"
                iconColor={Colors.orange}
                onPress={() =>
                  updateState({
                    key: "showConfirmation",
                    value: !showConfirmation,
                  })
                }
                style={styles.ml10}
              />
            </View>
          </View>
          <View style={[styles.fieldRow, styles.py16]}>
            <View style={styles.flex}>
              <Text style={styles.fieldRowLabel}>Batch Name</Text>
              <Text style={styles.required}>*</Text>
            </View>
            <TextField
              value={batchDetails?.batch_name}
              isEditable={false}
              classNames={styles.w195}
            />
          </View>
          <View style={[styles.fieldRow, styles.py16]}>
            <Text style={styles.fieldRowLabel}>Description</Text>
            <TextField
              value={batchDetails?.description}
              classNames={[styles.w195, styles.h104]}
              isMultiline={true}
              isEditable={false}
            />
          </View>
          <View style={styles.playerListContainer}>
            {Array.isArray(players) &&
              players?.length > 0 &&
              players.map((player, playerIndex) => (
                <View
                  style={[
                    styles.playerListItem,
                    playerIndex !== players.length - 1 && styles.pb60,
                  ]}
                  key={playerIndex}
                >
                  <Image
                    source={{
                      uri: "https://pinnacle.works/wp-content/uploads/2022/06/dummy-image.jpg",
                    }}
                    style={styles.playerAvatar}
                  />
                  <Text style={styles.playerName}>{player?.name}</Text>
                </View>
              ))}
          </View>
        </View>
      </ScrollView>

      <ConfirmationModal
        open={showConfirmation}
        onHide={() =>
          updateState({
            key: "showConfirmation",
            value: !showConfirmation,
          })
        }
      >
        <View>
          <Text>Are you sure want to delete?</Text>
          <View style={styles.flexRow}>
            <Button
              label="Cancel"
              type="cancel"
              onPress={() =>
                updateState({
                  key: "showConfirmation",
                  value: !showConfirmation,
                })
              }
            />
            <Button
              label="Delete"
              onPress={handleBatchDeletion}
              style={styles.ml10}
            />
          </View>
        </View>
      </ConfirmationModal>
    </SafeArea>
  );
};

export default BatchScreen;
