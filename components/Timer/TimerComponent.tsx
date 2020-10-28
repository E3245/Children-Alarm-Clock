import React, {Component, useState} from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import {useInterval} from '../../helpers/hooks';
import {getTimeRemaining} from '../../helpers/time';

type TimerProps = {
  endTime: Date;
};

// Misc Properties
type OtherProps = {
  name: string;
  imagePath: string;
}

// How to use this component
// <Timer endTime={new Date(1602612000)} />

const TimerComponentSimple = ({endTime}: TimerProps) => {
  let [time, setTimeLeft] = useState(getTimeRemaining(endTime));

  useInterval(() => {
    setTimeLeft(getTimeRemaining(endTime));
  }, 100);

  return (
    <Text>
      {time.hours}:{time.minutes}:{time.seconds}
    </Text>
  );
};

// By default TimerComponentSimple gets exported, you must explicity call this function to get the real component
export const TimerComponentFull = ({endTime}:TimerProps, {name}:OtherProps, {imagePath}:OtherProps) =>
{
  let [time, setTimeLeft] = useState(getTimeRemaining(endTime));

  useInterval(() => {
    setTimeLeft(getTimeRemaining(endTime));
  }, 100);

  return (
    <View style={styles.TimerContainer}>
      <Text>
        {name}
      </Text>
      <Text>
        {time.hours}:{time.minutes}:{time.seconds}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  TimerContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

export default TimerComponentSimple;
