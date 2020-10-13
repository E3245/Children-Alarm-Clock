// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, {useState, useEffect, useRef} from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {InteractionManagerStatic} from 'react-native';

// From Dan Abramov https://overreacted.io/making-setinterval-declarative-with-react-hooks/
export const useInterval = (callback: any, delay: any) => {
  const savedCallback = useRef<any>();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

export const usePrevious = (value: any) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};
