import React, {useCallback} from 'react';
import {AlarmProps} from './Alarm';

import LabeledTextInput from '../Inputs/LabeledTextInput';

import {BackgroundText, styles, View} from '../stylesheet';

type EditAlarmProps = {
  alarm: AlarmProps;
  // Function to be called
  onChange: (prop: string, new_val: any) => void;
};

const EditAlarm = (props: EditAlarmProps) => {
  console.log(props.alarm);
  const handleChange = useCallback(
    (prop: string) => {
      if (!props.onChange) {
        console.warn('Tried to call undefined callback in EditAlarm');
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
      <BackgroundText style={styles.titleText}> Edit Alarm </BackgroundText>
      <View>
        <LabeledTextInput
          label={'Name'}
          handleChange={handleChange('name')}
          defaultValue={props.alarm.name}
        />
        <LabeledTextInput
          label={'Color'}
          placeholder={'white'}
          handleChange={handleChange('color')}
          defaultValue={props.alarm.color}
        />
        <LabeledTextInput
          label={'Duration'}
          handleChange={handleChange('amountTime')}
          defaultValue={props.alarm.amountTime}
        />
      </View>
    </View>
  );
};

export default EditAlarm;
