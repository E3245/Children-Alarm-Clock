/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';
import 'jest';

// Note: test renderer must be required after react-native.
import renderer, { act } from 'react-test-renderer';

it('renders correctly', () => {

  // For any component that updates on an interval.
  jest.useFakeTimers();

  // All code that can cause updates to the state must be wrapped in act()
  act(() => {
    renderer.create(<App />);
  });
});
