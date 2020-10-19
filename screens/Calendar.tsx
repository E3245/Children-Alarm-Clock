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
        <Calendar />
      </ThemeProvider>
    </View>
  );
};

export default CalendarScreen;
