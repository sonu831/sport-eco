import {fetchUserById} from './../../services/users';
import {useDispatch, useSelector} from 'react-redux';
import {useState} from 'react';
import {StorageKeys} from './../../constants/storageKeys';
import {useEffect} from 'react';
import {fetchFromStorage} from './../../utils/storage';
import {userDetails$} from '../../store/users/selectors';
import {AppDispatch} from '../../store';

const useNavigation = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [userData, setUserData] = useState({});
  const userDetails = useSelector(userDetails$);

  useEffect(() => {
    fetchFromStorage(StorageKeys.userDetails).then(user => {
      if (!!user) {
        const value = JSON.parse(user);
        dispatch(fetchUserById(value));
      }
    });
  }, []);

  useEffect(() => {
    setUserData(userDetails);
  }, [userDetails]);

  return {
    userData,
  };
};

export default useNavigation;
