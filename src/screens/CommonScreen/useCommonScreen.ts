import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../Navigation/types';
import {RouteProp} from '@react-navigation/native';
import {AppDispatch} from '../../store';
import {fetchPlayers} from '../../services/players';
import {players$} from '../../store/players/selectors';

const useCommonScreen = ({
  navigation,
  route,
}: {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    keyof RootStackParamList,
    undefined
  >;
  route: RouteProp<RootStackParamList, 'CommonScreen'>;
}) => {
  const {title} = route.params;
  const dispatch = useDispatch<AppDispatch>();
  const players: any[] = useSelector(players$);

  const showPlayers = title.toLowerCase() === 'players';
  console.log('showPlayers', showPlayers);

  const handleGoBack = () => navigation.goBack();

  useEffect(() => {
    dispatch(fetchPlayers());
  }, [dispatch]);

  return {handleGoBack, players, title};
};

export default useCommonScreen;
