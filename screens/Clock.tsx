import React from 'react';
import Clock from '../components/Clock/Clock';
import DigitalClock from '../components/Clock/DigitalClock';
import {
  useColorScheme,
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
} from 'react-native';
import {ThemeProvider} from 'styled-components/native';
import {darkTheme, lightTheme} from '../themes';
import * as StylesModule from '../components/stylesheet';

const HomeScreen = () => {
  const HomeSafeAreaView = StylesModule.SafeAreaView;
  return (
    <View style={StylesModule.styles.centered}>
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

export default HomeScreen;
