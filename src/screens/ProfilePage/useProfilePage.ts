import { useSelector } from "react-redux";
import React from "react";
import { userDetails$ } from "../../store/users/selectors";

const useProfilePage = () => {
  const userDetails = useSelector(userDetails$);

  return { userDetails };
};

export default useProfilePage;
