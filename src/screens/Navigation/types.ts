import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {CompositeScreenProps} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Home: undefined;
  EditProfile: {isAddPlayer?: boolean} | undefined;
  CommonScreen: {title: string};
  Landing: undefined;
  Verification: undefined;
  Main: undefined;
  Calendar: undefined;
  Message: undefined;
  Profile: {playerId?: string} | undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootBottomTabParamList = {
  Main: undefined;
  Calendar: undefined;
  Message: undefined;
  Profile: undefined;
};

export type RootBottomTabProps<Screen extends keyof RootBottomTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootBottomTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;
