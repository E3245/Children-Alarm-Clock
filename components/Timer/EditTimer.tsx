import React, {useCallback, useState} from 'react';
import {Button, StyleSheet, Text} from 'react-native';
import {TimerProps} from '../Timer/Timer';

import LabeledTextInput from '../Inputs/LabeledTextInput';

import {
  BackgroundText,
  ScrollView,
  styles,
  View,
  TextInput,
} from '../stylesheet';

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
        <LabeledTextInput
          label={'Color'}
          placeholder={'white'}
          handleChange={handleChange('color')}
          defaultValue={props.timer.color}
        />
        <LabeledTextInput
          label={'Duration'}
          handleChange={handleChange('amountTime')}
          defaultValue={props.timer.amountTime}
        />
      </View>
    </View>
  );
};

export default EditTimer;
