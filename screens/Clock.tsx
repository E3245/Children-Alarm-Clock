import React from 'react';
import Clock from '../components/Clock/Clock';
import DigitalClock from '../components/Clock/DigitalClock';
import {ScrollView, StatusBar, View} from 'react-native';
import * as StylesModule from '../components/stylesheet';
import { useIsFocused } from '@react-navigation/native';
import { ClockFaceAppContext } from '../helpers/AppContextProvider';

const ClockFace = () => {
  const contextType = ClockFaceAppContext;

  const HomeSafeAreaView = StylesModule.SafeAreaView;
  return (
    <View style={StylesModule.styles.flex_centered}>
      <StatusBar barStyle="light-content" />
      <HomeSafeAreaView>
        <ScrollView
          centerContent={true}
          contentInsetAdjustmentBehavior="automatic">
          <ClockFaceAppContext.Consumer>
            {value => (
              ChooseClockFace(value)
            )}
          </ClockFaceAppContext.Consumer>
        </ScrollView>
      </HomeSafeAreaView>
    </View>
  );
};

const ChooseClockFace = (type: boolean) => {
  if (type === true) //Analog
    return ( <Clock/> );
  else
    return ( <DigitalClock />)
}

//             <DigitalClock />
export default ClockFace;
