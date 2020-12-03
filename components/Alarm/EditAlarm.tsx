import React, {useCallback} from 'react';
import {AlarmProps} from './Alarm';

import LabeledTextInput from '../Inputs/LabeledTextInput';

import {BackgroundText, styles, View} from '../stylesheet';
import {ColorPicker, fromHsv} from 'react-native-color-picker';
import {HsvColor} from 'react-native-color-picker/dist/typeHelpers';
import EndTimeInput from '../Inputs/EndTimeInput';
import WeekdayPicker from '../Inputs/weekdayInput/WeekdayPicker';

type EditAlarmProps = {
  alarm: AlarmProps;
  // Function to be called
  onChange: (prop: string, new_val: any) => void;
};

const to_day_dict = (arr: boolean[]) => {
  let out: {[characterName: number]: number} = {};
  if (arr) {
    arr.forEach((element, index) => {
      out[index] = element ? 1 : 0;
    });

    return out;
  }

  return [true, true, true, true, true, true, true];
};

const to_day_arr = (dict: {[characterName: number]: number}) => {
  let arr: boolean[] = [false, false, false, false, false, false, false];
  for (const key in dict) {
    if (Object.prototype.hasOwnProperty.call(dict, key)) {
      const element = dict[key];
      arr[key] = element ? true : false;
    }
  }
  return arr;
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
  // let days = {1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 0, 0: 0};

  return (
    <View style={styles.container}>
      <BackgroundText style={styles.titleText}> Edit Alarm </BackgroundText>
      <View>
        <LabeledTextInput
          label={'Name'}
          handleChange={handleChange('name')}
          defaultValue={props.alarm.name}
        />
        <EndTimeInput
          label={'End at'}
          handleHourChange={handleChange('endHour')}
          handleMinuteChange={handleChange('endMinute')}
          defaultHourValue={props.alarm.endHour}
          defaultMinuteValue={props.alarm.endMinute}
        />
        <WeekdayPicker
          // @ts-ignore
          days={to_day_dict(props.alarm.daysOfTheWeek)}
          onChange={(dict: any) => {
            let arr = to_day_arr(dict);
            // @ts-ignore
            handleChange('daysOfTheWeek')(arr);
          }}
          // style={styles.picker}
          // dayStyle={styles.day}
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
