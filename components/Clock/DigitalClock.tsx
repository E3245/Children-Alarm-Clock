import React, {useState} from 'react';
import {Text} from 'react-native';
import {useInterval} from '../../helpers/hooks';
import {getTime} from '../../helpers/time';

const DigitalClockFace = () => {
  let [time, setTime] = useState(getTime);

  useInterval(() => {
    setTime(getTime);
  }, 100);

  return (
    <Text>
      {time.hours}:{time.minutes}
    </Text>
  );
};

export default DigitalClockFace;
