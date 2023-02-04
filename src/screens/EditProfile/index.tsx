import React, {useMemo} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Pressable,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import userProfile from '../../assets/images/user-profile.png';
import uploadIcon from '../../assets/images/upload.png';
import uploadSuccessIcon from '../../assets/images/upload-success.png';
import loadingIcon from '../../assets/images/loading.png';
import {Colors} from '../../constants/Colors';
import {styles} from './styles';
import useEditProfile from './useEditProfile';
import {
  CITY_OPTIONS,
  DATE_OPTIONS,
  GENDER_OPTIONS,
  MONTH_OPTIONS,
  STATE_OPTIONS,
} from '../../constants/EditProfile';
import CustomDropdown from '../../components/Dropdown';
import {RootStackScreenProps} from '../Navigation/types';

const EditProfile = ({
  navigation,
  route,
}: RootStackScreenProps<'EditProfile'>) => {
  const isAddPlayer = route?.params?.isAddPlayer || false;

  const {uploadImage, state, updateState, handleSave, response, handleGoBack} =
    useEditProfile({navigation});
  const {
    fName,
    lName,
    mName,
    email,
    dobDate,
    dobMonth,
    dobYear,
    city,
    category,
    gender,
    state: userState,
  } = state;

  const image = useMemo(() => response?.assets[0]?.base64 || '', [response]);

  const dateOptions = DATE_OPTIONS();
  const monthOptions = MONTH_OPTIONS();

  return (
    <SafeAreaView style={styles.safeView}>
      <ScrollView>
        <View style={[styles.containerView, styles.flex]}>
          <Pressable style={styles.backButton} onPress={handleGoBack}>
            <Entypo name="chevron-left" size={20} color={Colors.darkGray} />
          </Pressable>
          <View>
            <Text style={styles.headingText}>
              {isAddPlayer ? 'Add Player' : 'Update your profile'}
            </Text>
          </View>
        </View>
        <View style={styles.containerView}>
          <View style={[styles.fieldRow, styles.py16]}>
            <Text style={styles.fieldRowLabel}>Photo</Text>
            <TouchableOpacity style={styles.uploadImage} onPress={uploadImage}>
              <Image
                source={
                  !!image
                    ? {uri: `data:image/jpeg;base64,${image}`}
                    : userProfile
                }
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 50,
                  resizeMode: 'cover',
                }}
              />
            </TouchableOpacity>
          </View>
          <View style={[styles.fieldRow, styles.py16]}>
            <View style={styles.flex}>
              <Text style={styles.fieldRowLabel}>Name</Text>
              <Text style={styles.required}>*</Text>
            </View>
            <View style={[styles.flex, styles.w195]}>
              <TextInput
                value={fName}
                onChangeText={newName =>
                  updateState({key: 'fName', value: newName})
                }
                style={[styles.fieldInput, styles.mr10]}
                placeholder="First Name"
              />
              <TextInput
                value={lName}
                onChangeText={newName =>
                  updateState({key: 'lName', value: newName})
                }
                style={styles.fieldInput}
                placeholder="Last Name"
              />
            </View>
          </View>
          <View style={[styles.fieldRow, styles.py16]}>
            <Text style={styles.fieldRowLabel}>Middle Name</Text>
            <TextInput
              value={mName}
              onChangeText={newName =>
                updateState({key: 'mName', value: newName})
              }
              style={[styles.fieldInput, styles.w195]}
              placeholder="Middle Name"
            />
          </View>
          <View style={[styles.fieldRow, styles.py16]}>
            <View style={styles.flex}>
              <Text style={styles.fieldRowLabel}>E-mail ID</Text>
              <Text style={styles.required}>*</Text>
            </View>
            <TextInput
              value={email}
              onChangeText={newName =>
                updateState({key: 'email', value: newName})
              }
              style={[styles.fieldInput, styles.w195]}
              placeholder="E-mail ID"
            />
          </View>
          <View style={[styles.fieldRow, styles.py16]}>
            <View style={styles.flex}>
              <Text style={styles.fieldRowLabel}>Date of Brith</Text>
              <Text style={styles.required}>*</Text>
            </View>
            <View style={[styles.flex, styles.w195]}>
              <View style={styles.mr10}>
                <CustomDropdown
                  options={dateOptions}
                  value={dobDate}
                  onChange={item => {
                    updateState({key: 'dobDate', value: item.value});
                  }}
                  containerStyle={styles.w60}
                  isPlaceholderHidden={true}
                />
              </View>
              <View style={styles.mr10}>
                <CustomDropdown
                  options={monthOptions}
                  value={dobMonth}
                  onChange={item => {
                    updateState({key: 'dobMonth', value: item.value});
                  }}
                  containerStyle={styles.w60}
                  isPlaceholderHidden={true}
                />
              </View>
              <TextInput
                value={dobYear}
                onChangeText={newName =>
                  updateState({key: 'dobYear', value: newName})
                }
                style={[styles.fieldInput, styles.w60]}
              />
            </View>
          </View>
          <View style={[styles.fieldRow, styles.py16]}>
            <View style={styles.flex}>
              <Text style={styles.fieldRowLabel}>Gender</Text>
              <Text style={styles.required}>*</Text>
            </View>
            <CustomDropdown
              options={GENDER_OPTIONS}
              value={gender}
              onChange={item => {
                updateState({key: 'gender', value: item.value});
              }}
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
              onChange={item => {
                updateState({key: 'city', value: item.value});
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
              onChange={item => {
                updateState({key: 'state', value: item.value});
              }}
            />
          </View>
          {!isAddPlayer && (
            <View style={[styles.py16, styles.fieldColumn]}>
              <Text style={styles.fieldRowLabel}>I am a...</Text>
              <View style={[styles.flex, styles.mt10]}>
                <TouchableOpacity
                  style={[
                    styles.category,
                    styles.mr27,
                    category === 'player' && styles.categorySelected,
                  ]}
                  onPress={() =>
                    updateState({key: 'category', value: 'player'})
                  }>
                  <Text
                    style={
                      category === 'player' && styles.categorySelectedText
                    }>
                    Player
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.category,
                    styles.mr27,
                    category === 'coach' && styles.categorySelected,
                  ]}
                  onPress={() =>
                    updateState({key: 'category', value: 'coach'})
                  }>
                  <Text
                    style={category === 'coach' && styles.categorySelectedText}>
                    Coach
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.category,
                    category === 'parent' && styles.categorySelected,
                  ]}
                  onPress={() =>
                    updateState({key: 'category', value: 'parent'})
                  }>
                  <Text
                    style={
                      category === 'parent' && styles.categorySelectedText
                    }>
                    Parent
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.alignEnd}>
                <Text style={styles.selectAll}>Select All</Text>
              </View>
            </View>
          )}
          {isAddPlayer && (
            <View style={[styles.flex, styles.py16, styles.px25]}>
              <View>
                <View style={styles.flex}>
                  <Text style={styles.fieldRowLabel}>ID Proof</Text>
                  <Text style={styles.required}>*</Text>
                </View>
                <Text>{`(Aadhar Card)`}</Text>
              </View>
              <View style={styles.uploadIcon}>
                <Image source={uploadIcon} />
              </View>
            </View>
          )}
          <View style={[styles.fieldRow, styles.justifyCenter, styles.mt21]}>
            <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
              <Text style={styles.saveBtnText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfile;
