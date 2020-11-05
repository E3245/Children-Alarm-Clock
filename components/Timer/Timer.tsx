import React, {useState, useEffect} from 'react';
import {View, Button} from 'react-native';
import {
  getTimeTo,
  addMilliseconds,
  isTimePast,
  formatTime,
} from '../../helpers/time';
import {styles} from '../stylesheet';
import Svg, {Text, Rect} from 'react-native-svg';

export type TimerProps = {
  // Length of the timer in seconds
  amountTime: number;
  remainingTime: number;
  running: boolean;
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

export const TimerComponentSimple = ({
  // The amount of time the timer will run for when reset
  amountTime = -1,
  // The time remaining on the timer
  remainingTime = -1,
  // If the timer is currently counting down
  running = false,
  name,
  color,
}: TimerProps) => {
  if (amountTime === -1) {
    throw new Error('amountTime must be set');
  }

  // Set the end time based on either the remaining time, or the total time if that is not set.
  let [endTime, setEndTime] = useState(
    addMilliseconds(
      new Date(),
      (remainingTime !== -1 ? remainingTime : amountTime) * 1000,
    ),
  );
  let [timeLeft, setTimeLeft] = useState(getTimeTo(endTime));
  let [isRunning, setIsRunning] = useState(running);

  useEffect(() => {
    let interval: any = null;
    if (isRunning && isTimePast(endTime)) {
      setTimeLeft(0);
      setIsRunning(false);
      clearInterval(interval);
    } else if (isRunning) {
      interval = setInterval(() => {
        setTimeLeft(getTimeTo(endTime));
      }, 100);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, endTime, name]);

  const toggleTimer = () => {
    if (isRunning) {
      // Stop timer
      setIsRunning(false);
    } else {
      // Start timer
      // Set the end time based on the time remaining
      setEndTime(new Date(Date.now() + timeLeft));
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
          stroke="black"
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
          {formatTime(new Date(timeLeft))}
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
      <Button
        title={timeLeft === 0 ? 'Reset' : 'Toggle'}
        onPress={() => toggleTimer()}
      />
    </View>
  );
};
