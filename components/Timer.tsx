import React, {useState} from 'react';
import {Text} from 'react-native';
import {useInterval} from '../helpers/hooks';
import {getTimeRemaining} from '../helpers/time';

type TimerProps = {
  endTime: Date;
};

// How to use this component
// <Timer endTime={new Date(1602612000)} />

const Timer = ({endTime}: TimerProps) => {
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

export default Timer;
