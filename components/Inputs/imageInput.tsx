import React from 'react';
import {Button, View} from 'react-native';
import ImagePicker from 'react-native-image-picker';

const openImagePicker = (onSelectImage) => {
  // More info on all the options is below in the API Reference... just some common use cases shown here
  const options = {
    title: 'Select Avatar',
    customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  /**
   * The first arg is the options object for customization (it can also be null or omitted for default options),
   * The second arg is the callback which sends object: response (more info in the API Reference)
   */
  ImagePicker.showImagePicker(options, (response) => {
    console.log('Response = ', response);

    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    } else {
      const source = {uri: response.uri};

      // You can also display the image using data:
      // const source = { uri: 'data:image/jpeg;base64,' + response.data };
      console.log('User Selected', response.uri);
      onSelectImage(source.uri);
    }
  });
};

const ImageInputButton = (props) => {
  const onSelectImage = (value) => {
    props.onImageSelected(value);
  };

  return (
    <View>
      <Button
        title={'Image'}
        onPress={() => {
          openImagePicker(onSelectImage);
        }}
      />
      <Button
        title={'Remove Image'}
        onPress={() => {
          onSelectImage('');
        }}
      />
    </View>
  );
};

export default ImageInputButton;
