import React from 'react';
import {useColorScheme, Text} from 'react-native';
import {ThemeProvider} from 'styled-components/native';
import {darkTheme, lightTheme} from '../themes';
import {TimerList} from '../components/Timer/TimerList';
import {View, ScrollView, styles} from '../components/stylesheet';

const TimerScreen = () => {
  const theme = useColorScheme() === 'dark' ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <View style={styles.container}>
        <Text style={styles.titleText}>Timer Page</Text>
      </View>
      <ScrollView style={styles.TimerScroll}>
        <View style={styles.centered}>
          <TimerList name="garbage" />
        </View>
      </ScrollView>
    </ThemeProvider>
  );
};

export default TimerScreen;
