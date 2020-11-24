import React from 'react';
import Clock from '../components/Clock/Clock';
import DigitalClock from '../components/Clock/DigitalClock';
import {ScrollView, StatusBar, View} from 'react-native';
import * as StylesModule from '../components/stylesheet';

const ClockFace = () => {
  const HomeSafeAreaView = StylesModule.SafeAreaView;
  return (
    <View style={StylesModule.styles.flex_centered}>
      <StatusBar barStyle="light-content" />
      <HomeSafeAreaView>
        <ScrollView
          centerContent={true}
          contentInsetAdjustmentBehavior="automatic">
          <Clock />
          <DigitalClock />
        </ScrollView>
      </HomeSafeAreaView>
    </View>
  );
};

export default ClockFace;
