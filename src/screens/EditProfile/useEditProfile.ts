import {useCallback, useEffect, useState} from 'react';
import moment from 'moment';
import * as ImagePicker from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';
import {userDetails$} from '../../store/users/selectors';
import {updateUserProfile} from '../../services/users';
import {RootStackParamList, RootStackScreenProps} from '../Navigation/types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppDispatch} from '../../store';

const initialState = {
  fName: '',
  lName: '',
  mName: '',
  email: '',
  dobMonth: '',
  dobDate: '',
  dobYear: '',
  gender: '',
  city: '',
  state: '',
  category: '',
};

const useEditProfile = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    'EditProfile',
    undefined
  >;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [response, setResponse] = useState<any>(null);
  const userDetails = useSelector(userDetails$);
  const [state, setState] = useState(initialState);

  const handleGoBack = () => navigation.goBack();

  const updateState = (request: any) => {
    if (Array.isArray(request)) {
      request.forEach(({key, value}) =>
        setState(preState => ({...preState, [key]: value})),
      );
    } else {
      const {key, value} = request;
      setState(preState => ({...preState, [key]: value}));
    }
  };

  const uploadImage = useCallback(() => {
    ImagePicker.launchImageLibrary(
      {
        selectionLimit: 1,
        mediaType: 'photo',
        includeBase64: true,
      },
      setResponse,
    );
  }, []);

  useEffect(() => {
    if (!!userDetails?.id) {
      const {fName, lName, mName, email, gender, category, state, city, dob} =
        userDetails;

      updateState([
        {key: 'email', value: email || ''},
        {key: 'fName', value: fName || ''},
        {key: 'lName', value: lName || ''},
        {key: 'mName', value: mName || ''},
        {key: 'gender', value: gender || ''},
        {key: 'category', value: category || ''},
        {key: 'state', value: state || ''},
        {key: 'city', value: city || ''},
        {key: 'dobMonth', value: dob ? moment(dob).format('MMM') : ''},
        {key: 'dobDate', value: dob ? moment(dob).format('DD') : ''},
        {key: 'dobYear', value: dob ? moment(dob).format('YYYY') : ''},
      ]);
    }
  }, [userDetails]);

  const handleSave = () => {
    const {
      email,
      fName,
      lName,
      mName,
      gender,
      category,
      state: userState,
      city,
      dobMonth,
      dobDate,
      dobYear,
    } = state;

    const image = response?.assets[0].base64 || '';

    const request = {
      ...userDetails,
      fName,
      lName,
      mName,
      email: email?.toLowerCase(),
      gender,
      category,
      state: userState,
      city,
      dob: `${moment(`${dobYear}-${dobMonth}-${dobDate}`, 'YYYY-MMM-DD')
        .startOf('day')
        .format('YYYY-MM-DDTHH:mm:ss')}Z`,
      imageURl: image,
    };

    dispatch(updateUserProfile(request));
  };

  return {
    uploadImage,
    userDetails,
    updateState,
    state,
    handleSave,
    response,
    handleGoBack,
  };
};

export default useEditProfile;
