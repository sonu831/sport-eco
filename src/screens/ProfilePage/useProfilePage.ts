import {useDispatch, useSelector} from 'react-redux';
import React, {useEffect} from 'react';
import {userDetails$} from '../../store/users/selectors';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../Navigation/types';
import {RouteProp} from '@react-navigation/native';
import {AppDispatch} from '../../store';
import {fetchPlayerById} from '../../services/players';
import {playerDetails$} from '../../store/players/selectors';

const useProfilePage = ({
  navigation,
  route,
}: {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    keyof RootStackParamList,
    undefined
  >;
  route: RouteProp<RootStackParamList, 'Profile'>;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const userDetails = useSelector(userDetails$);
  const playerDetails = useSelector(playerDetails$);
  const playerId = route.params?.playerId || false;

  const dataToShow = !!playerId ? playerDetails : userDetails;

  const handleGoBack = () => navigation.goBack();

  useEffect(() => {
    if (!!playerId) {
      dispatch(fetchPlayerById(playerId));
    }
  }, [dispatch]);

  return {userDetails, handleGoBack, dataToShow};
};

export default useProfilePage;
