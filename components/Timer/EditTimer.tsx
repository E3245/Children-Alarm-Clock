import React, {useCallback} from 'react';
import {TimerProps} from '../Timer/Timer';

import tinycolor from 'tinycolor2';

import LabeledTextInput from '../Inputs/LabeledTextInput';

import {BackgroundText, styles, View} from '../stylesheet';
import {ColorPicker, fromHsv, toHsv} from 'react-native-color-picker';
import DurationInput from '../Inputs/DurationInput';
import ImageInputButton from '../Inputs/imageInput';
import Slider from '@react-native-community/slider';

type EditTimerProps = {
  timer: TimerProps;
  // Function to be called
  onChange: (prop: string, new_val: any) => void;
};

const EditTimer = (props: EditTimerProps) => {
  console.log(props.timer);
  const handleChange = useCallback(
    (prop: string) => {
      if (!props.onChange) {
        console.warn('Tried to call undefined callback in EditTimer');
      } else {
        return (new_val: string) => {
          props.onChange(prop, new_val);
        };
      }
    },
    [props],
  );

  return (
    <View style={styles.container}>
      <BackgroundText style={styles.titleText}> Edit Timer </BackgroundText>
      <View>
        <LabeledTextInput
          label={'Name'}
          handleChange={handleChange('name')}
          defaultValue={props.timer.name}
        />

        <DurationInput
          label={'Duration'}
          handleChange={handleChange('amountTime')}
          defaultValue={props.timer.amountTime}
        />

        <ColorPicker
          defaultColor={props.timer.color}
          onColorSelected={(color) => handleChange('color')(fromHsv(color))}
          style={{flex: 0, height: 200}}
          // @ts-ignore
          sliderComponent={Slider}
        />

        <ImageInputButton
          previousValue={props.timer.imageURI}
          onImageSelected={handleChange('imageURI')}
        />
      </View>
    </View>
  );
};

export default EditTimer;
