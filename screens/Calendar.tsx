import React from 'react';
import {useColorScheme, View} from 'react-native';
import {ThemeProvider} from 'styled-components/native';
import {darkTheme, lightTheme} from '../themes';
import {styles} from '../components/stylesheet';
import {Calendar} from 'react-native-calendars';

const CalendarScreen = () => {
  const theme = useColorScheme() === 'dark' ? darkTheme : lightTheme;
  const homework = {key: 'homework', color: 'cyan'};
  const classTime = {key: 'classTime', color: 'blue'};
  const project = {key: 'project', color: 'teal'};
  return (
    <View style={styles.centered}>
      <ThemeProvider theme={theme}>
        <Calendar
          // Collection of dates that have to be marked. Default = {}
          markedDates={{
            '2020-10-23': {
              dots: [homework, classTime, project],
            },
            '2020-10-18': {
              dots: [classTime, project],
            },
            '2020-10-28': {
              dots: [homework, classTime],
            },
            '2020-10-13': {
              dots: [homework, classTime, project],
            },
            '2020-10-14': {
              dots: [homework, classTime, project],
            },
            '2020-10-15': {
              dots: [homework, classTime, project],
            },
          }}
          markingType={'multi-dot'}
        />
      </ThemeProvider>
    </View>
  );
};

export default CalendarScreen;
