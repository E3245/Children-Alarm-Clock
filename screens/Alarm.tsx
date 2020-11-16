import React from 'react';
import {useColorScheme, Text, View} from 'react-native';
import {ThemeProvider} from 'styled-components/native';
import {darkTheme, lightTheme} from '../themes';
import {ScrollView, styles} from '../components/stylesheet';
import {AlarmList} from '../components/Alarm/AlarmList';
import {TimerList} from '../components/Timer/TimerList';

const AlarmScreen = () => {
  const theme = useColorScheme() === 'dark' ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <View style={styles.container}>
        <Text style={styles.titleText}>Timer Page</Text>
      </View>
      <ScrollView style={styles.TimerScroll}>
        <View style={styles.centered}>
          <TimerList name="alarmlist" />
        </View>
      </ScrollView>
    </ThemeProvider>
  );
};

export default AlarmScreen;
