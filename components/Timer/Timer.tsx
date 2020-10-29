import React, {useState, useEffect} from 'react';
import {View, Button} from 'react-native';
import {getTime, getTimeRemaining, addMilliseconds} from '../../helpers/time';
import {styles} from '../stylesheet';
import Svg, {Text, Rect} from 'react-native-svg';

export type TimerProps = {
  // Length of the timer in seconds
  amountTime: number;
  name: string;
  color: string;
  key: string;
};

// Misc Properties
type OtherProps = {
  name: string;
  imagePath: string;
};

// How to use this component
// <Timer endTime={new Date(1602612000)} />

export const TimerComponentSimple = ({amountTime, name, color}: TimerProps) => {
  let [endTime, setendTime] = useState(
    addMilliseconds(new Date(), amountTime * 1000),
  );
  let [time, setTimeLeft] = useState(getTimeRemaining(endTime));
  let [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (isRunning) {
      interval = setInterval(() => {
        setTimeLeft(getTimeRemaining(endTime));
      }, 100);
    } else {
      interval = setInterval(() => {
        setendTime(addMilliseconds(endTime, 100));
      }, 100);
    }

    return () => clearInterval(interval);
  });

  const toggleTimer = () => {
    if (isRunning) {
      setIsRunning(false);
    } else {
      setIsRunning(true);
    }
  };

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
          fill={color}
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
          {time.hours.toString().padStart(2, '0') +
            ':' +
            time.minutes.toString().padStart(2, '0') +
            ':' +
            time.seconds.toString().padStart(2, '0')}
        </Text>
        <Text
          fill="black"
          stroke="black"
          fontSize="200%"
          x="50%"
          y="90%"
          textAnchor="middle">
          {name}
        </Text>
      </Svg>
      <Button title="Toggle" onPress={() => toggleTimer()} />
    </View>
  );
};
