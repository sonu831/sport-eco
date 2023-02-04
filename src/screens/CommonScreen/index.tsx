import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import SearchBar from '../../components/SearchBar';
import {styles} from './styles';
import noPlayer from '../../assets/images/no-player.png';
import addIcon from '../../assets/images/floating-icon-add.png';
import {RootStackScreenProps} from '../Navigation/types';
import useCommonScreen from './useCommonScreen';
import {Colors} from '../../constants/Colors';

const Players = ({navigation, route}: RootStackScreenProps<'CommonScreen'>) => {
  const {
    title,
    players = [],
    handleGoBack,
  } = useCommonScreen({navigation, route});

  console.log('players', players);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.mainContainer}>
        <TouchableOpacity
          style={styles.menuIconContainer}
          onPress={handleGoBack}>
          <Entypo name="chevron-left" size={20} color={Colors.darkGray} />
        </TouchableOpacity>
        <View style={styles.mx40}>
          <SearchBar
            onChange={
              (searchString: string) =>
                console.log('searchString', searchString)
              // updateState({ key: "searchedText", value: searchString })
            }
          />
        </View>
        <View style={styles.playerListContainer}>
          {players?.length > 0 ? (
            Array.isArray(players) &&
            players?.map((player: any, playerIndex) => (
              <TouchableOpacity
                key={playerIndex}
                style={[
                  styles.playerListItem,
                  playerIndex !== players.length - 1 && styles.pb60,
                ]}>
                <Image
                  source={{
                    uri: 'https://pinnacle.works/wp-content/uploads/2022/06/dummy-image.jpg',
                  }}
                  style={styles.playerAvatar}
                />
                <Text
                  style={
                    styles.playerName
                  }>{`${player?.fName} ${player?.lName}`}</Text>
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.noPlayerContainer}>
              <Image source={noPlayer} />
              <Text style={styles.noPlayerText}>
                No {title.toLowerCase()} displayed
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.floatingBtn}
        onPress={() =>
          navigation.navigate('EditProfile', {
            isAddPlayer: title.toLowerCase() === 'players',
          })
        }>
        <Image source={addIcon} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Players;
