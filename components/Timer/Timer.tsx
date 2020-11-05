import React, {useState, useEffect} from 'react';
import {View, Button} from 'react-native';
import {getTimeTo, isTimePast, formatTime} from '../../helpers/time';
import {styles} from '../stylesheet';
import Svg, {Text, Rect} from 'react-native-svg';
import { render } from 'react-dom';

export type TimerProps = {
  // Length of the timer in seconds
  amountTime: number;
  name: string;
  color: string;
  uuid: string;
  handleChange: CallableFunction;
  // State initial
  time: number;
  running: boolean;
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
  name,
  color,
  handleChange,
  uuid,
  // The time remaining on the timer in milliseconds (if it is currently stopped)
  // The time the timer will end at in ms since epoch (if it is currently running)
  // This var stores different values depending on the running boolean
  time = -1,
  // If the timer is currently counting down
  running,
}: TimerProps) => {
  if (time === -1) {
    throw new Error('time must be set');
  }

  // Set the end time based on either the remaining time
  let [timeState, setTime] = useState(time);
  let [isRunning, setIsRunning] = useState(running);
  let [renderTime, setRenderTime] = useState(running ? getTimeTo(time) : time);

  useEffect(() => {
    let interval: any = null;
    if (isRunning && isTimePast(timeState)) {
      console.log('Timer Ended!');
      setRenderTime(0);
      setIsRunning(false);
      clearInterval(interval);
    } else if (isRunning) {
      interval = setInterval(() => {
        setRenderTime(getTimeTo(timeState));
      }, 100);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeState, renderTime]);

  const toggleTimer = () => {
    // Check if needs to reset
    if (!isRunning && renderTime === 0) {
      setTime(amountTime);
      setRenderTime(amountTime);
    } else if (isRunning) {
      // Stop timer
      setIsRunning(false);
      // Set the time remaining based on how far the timer has progressed
      setTime(getTimeTo(timeState));
    } else {
      // Start timer
      // Set the end time based on the time remaining
      setTime(Date.now() + timeState);
      setIsRunning(true);
    }
    save();
  };

  // Call the parent to save the data
  const save = () => {
    // Values that may have changed
    // running
    // remainingtime
    let timer: TimerProps = {
      amountTime: amountTime,
      name: name,
      color: color,
      handleChange: handleChange,
      uuid: uuid,
      // State changes
      time: timeState,
      running: isRunning,
    };

    handleChange(timer);
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
          {formatTime(new Date(renderTime))}
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
        title={renderTime === 0 ? 'Reset' : 'Toggle'}
        onPress={() => toggleTimer()}
      />
    </View>
  );
};
