import React from "react";
import * as ImagePicker from "expo-image-picker";

type UseImagePickerProps = {
  handleImage?: Function | undefined;
};

const useImagePicker = ({ handleImage }: UseImagePickerProps) => {
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      base64: true,
    });

    console.log(result);

    if (!!result.assets && result.assets.length > 0)
      handleImage && handleImage(result.assets[0].base64);
  };

  return {
    pickImage,
  };
};

export default useImagePicker;
