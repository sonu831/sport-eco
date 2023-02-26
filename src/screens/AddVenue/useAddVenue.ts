import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addVenue, fetchVenueList, updateVenue } from "../../services/venue";
import { AppDispatch } from "../../store";
import { selectedVenue$ } from "../../store/venue/selectors";
import { UpdateStateRequest } from "../../types/UpdateState";
import { RootStackParamList } from "../Navigation/types";

type InitialState = {
  name: string;
  courtName: string;
  sport: string;
  address: string;
  city: string;
  state: string;
};

const initialState = {
  name: "",
  courtName: "",
  sport: "",
  address: "",
  city: "",
  state: "",
};

const useAddVenue = ({
  navigation,
  route,
}: {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    keyof RootStackParamList,
    undefined
  >;
  route: RouteProp<RootStackParamList, "AddVenue">;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [state, setState] = useState<InitialState>(initialState);
  const venueDetail = useSelector(selectedVenue$);
  const isEdit = route?.params?.isEdit || false;

  const updateState = (request: UpdateStateRequest<keyof InitialState>) => {
    if (Array.isArray(request)) {
      request.forEach(({ key, value }) =>
        setState((preState) => ({ ...preState, [key]: value }))
      );
    } else {
      const { key, value } = request;
      setState((preState) => ({ ...preState, [key]: value }));
    }
  };

  const handleGoBack = () => navigation.goBack();

  const handleSave = () => {
    const { address, city, courtName, name, sport, state: venueState } = state;

    const request = {
      venue_name: name,
      court_name: courtName,
      sport: sport,
      address: address,
      state: venueState,
      city: city,
    };

    if (isEdit) {
      dispatch(
        updateVenue({
          data: request,
          id: venueDetail._id,
        })
      ).then((res) => {
        dispatch(fetchVenueList()).then(() =>
          navigation.navigate("CommonScreen", {
            title: "Venues",
            shouldRefresh: true,
          })
        );
      });
    } else {
      dispatch(addVenue({ data: request })).then((res) => {
        dispatch(fetchVenueList()).then(handleGoBack);
      });
    }
  };

  useEffect(() => {
    if (isEdit) {
      updateState([
        {
          key: "address",
          value: venueDetail?.address,
        },
        {
          key: "city",
          value: venueDetail?.city,
        },
        {
          key: "courtName",
          value: venueDetail?.court_name,
        },
        {
          key: "name",
          value: venueDetail?.venue_name,
        },
        {
          key: "sport",
          value: venueDetail?.sport,
        },
        {
          key: "state",
          value: venueDetail?.state,
        },
      ]);
    }
  }, [isEdit, venueDetail]);

  return {
    state,
    updateState,
    handleSave,
    handleGoBack,
  };
};

export default useAddVenue;
