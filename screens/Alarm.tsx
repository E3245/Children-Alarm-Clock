import React from 'react';
import {useColorScheme, Text} from 'react-native';
import {ThemeProvider} from 'styled-components/native';
import {darkTheme, lightTheme} from '../themes';
import {AlarmList} from '../components/Alarm/AlarmList';
import {View, ScrollView, styles} from '../components/stylesheet';

const AlarmScreen = () => {
  const theme = useColorScheme() === 'dark' ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <View style={styles.container}>
        <Text style={styles.titleText}>Alarm Page</Text>
      </View>
      <ScrollView style={styles.TimerScroll}>
        <View style={styles.centered}>
          <AlarmList name="alarmlist" />
        </View>
      </ScrollView>
    </ThemeProvider>
  );
};

export default AlarmScreen;
