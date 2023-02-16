import React from "react";
import { Image, ImageSourcePropType, TouchableOpacity } from "react-native";
import userProfile from "../../assets/images/user-profile.png";
import useImagePicker from "./useImagePicker";

const ImagePicker = ({
  icon,
  handleImage,
}: {
  icon?: ImageSourcePropType | undefined;
  handleImage: Function;
}) => {
  const { pickImage } = useImagePicker({
    handleImage,
  });

  return (
    <TouchableOpacity onPress={pickImage}>
      <Image source={icon || userProfile} />
    </TouchableOpacity>
  );
};

export default ImagePicker;
