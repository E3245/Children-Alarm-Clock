import React, {useCallback} from 'react';
import {AlarmProps} from './Alarm';

import LabeledTextInput from '../Inputs/LabeledTextInput';

import {BackgroundText, styles, View} from '../stylesheet';
import {ColorPicker, fromHsv} from 'react-native-color-picker';
import { HsvColor } from 'react-native-color-picker/dist/typeHelpers';
import EndTimeInput from '../Inputs/EndTimeInput';

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
        {/* <LabeledTextInput
          label={'endHour'}
          handleChange={handleChange('endHour')}
          defaultValue={props.alarm.endHour}
        />
        <LabeledTextInput
          label={'endMinute'}
          handleChange={handleChange('endMinute')}
          defaultValue={props.alarm.endMinute}
        /> */}
        <EndTimeInput 
          label={"End at"}
          handleHourChange={handleChange('endHour')}
          handleMinuteChange={handleChange('endMinute')}
          defaultHourValue={props.alarm.endHour}
          defaultMinuteValue={props.alarm.endMinute}
        />
        <ColorPicker
          defaultColor={props.alarm.color}
          onColorSelected={(color) => handleChange('color')(fromHsv(color))}
          style={{flex: 0, height: 200}}
        />
      </View>
    </View>
  );
};

export default EditAlarm;
