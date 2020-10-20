import React, {useState} from 'react';
import {View} from 'react-native';
import {useInterval} from '../../helpers/hooks';
import {getTimeRemaining} from '../../helpers/time';
import {styles} from '../stylesheet';
import Svg, {Text, Rect} from 'react-native-svg';

type TimerProps = {
  endTime: Date;
};

// Misc Properties
type OtherProps = {
  name: string;
  imagePath: string;
};

// How to use this component
// <Timer endTime={new Date(1602612000)} />

const TimerComponentSimple = ({endTime}: TimerProps) => {
  let [time, setTimeLeft] = useState(getTimeRemaining(endTime));

  useInterval(() => {
    setTimeLeft(getTimeRemaining(endTime));
  }, 100);

  return (
    <View style={styles.TimerContainer}>
      <Svg width="90%" height="70">
        <Rect
          x="0"
          y="0"
          rx="10"
          ry="10"
          width="100%"
          height="100%"
          stroke="blue"
          fill="green"
          transform="translate(0,0)"
        />
        <Text
          fill="black"
          stroke="black"
          fontSize="300%"
          fontWeight="bold"
          x="50%"
          y="50%"
          textAnchor="middle">
          {time.hours + ':' + time.minutes + ':' + time.seconds}
        </Text>
        <Text
          fill="black"
          stroke="black"
          fontSize="200%"
          x="50%"
          y="90%"
          textAnchor="middle">
          Title
        </Text>
      </Svg>
    </View>
  );
};

// By default TimerComponentSimple gets exported, you must explicity call this function to get the real component
export const TimerComponentFull = ({endTime}: TimerProps, {name}: OtherProps) =>
  //   {imagePath}: OtherProps,
  {
    let [time, setTimeLeft] = useState(getTimeRemaining(endTime));

    useInterval(() => {
      setTimeLeft(getTimeRemaining(endTime));
    }, 100);

    return (
      <View style={styles.TimerContainer}>
        <Text>{name}</Text>
        <Text>
          {time.hours}:{time.minutes}:{time.seconds}
        </Text>
      </View>
    );
  };

export default TimerComponentSimple;
