import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import { selectedVenue$ } from "../../store/venue/selectors";
import { RootStackParamList } from "../Navigation/types";

function useVenueDetail({
  navigation,
}: {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    keyof RootStackParamList,
    undefined
  >;
}) {
  const venueDetail = useSelector(selectedVenue$);

  const handleGoBack = () => navigation.goBack();

  return { venueDetail, handleGoBack };
}

export default useVenueDetail;
