import React from 'react';
import {useColorScheme, View} from 'react-native';
import {ThemeProvider} from 'styled-components/native';
import {darkTheme, lightTheme} from '../themes';
import {styles} from '../components/stylesheet';
import {Calendar} from 'react-native-calendars';

const CalendarScreen = () => {
  const theme = useColorScheme() === 'dark' ? darkTheme : lightTheme;

  return (
    <View style={styles.centered}>
      <ThemeProvider theme={theme}>
        <Calendar
          // Collection of dates that have to be marked. Default = {}
          markedDates={{
            '2020-10-14': {selected: true, marked: true, selectedColor: 'blue'},
            '2020-10-13': {selected: true, marked: true, selectedColor: 'blue'},
            '2020-10-21': {marked: true},
            '2020-10-22': {marked: true, dotColor: 'red', activeOpacity: 0},
            '2020-10-27': {marked: true, dotColor: 'red', activeOpacity: 0},
            '2020-10-23': {disabled: true, disableTouchEvent: true}
          }}
        />
      </ThemeProvider>
    </View>
  );
};

export default CalendarScreen;
