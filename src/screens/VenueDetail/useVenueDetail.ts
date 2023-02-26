import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useDispatch, useSelector } from "react-redux";
import { deleteVenue, fetchVenueList } from "../../services/venue";
import { AppDispatch } from "../../store";
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
  const dispatch = useDispatch<AppDispatch>();
  const venueDetail = useSelector(selectedVenue$);

  const handleGoBack = () => navigation.goBack();

  const handleDelete = () => {
    dispatch(deleteVenue({ id: venueDetail._id })).then(() =>
      dispatch(fetchVenueList()).then(handleGoBack)
    );
  };

  return { venueDetail, handleGoBack, handleDelete };
}

export default useVenueDetail;
