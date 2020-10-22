import React from 'react';
import {useColorScheme, Text, View} from 'react-native';
import {ThemeProvider} from 'styled-components/native';
import {darkTheme, lightTheme} from '../themes';
import {ScrollView, styles} from '../components/stylesheet';
import TimerComponentSimple from '../components/Timer/Timer';

const AlarmScreen = () => {
  const theme = useColorScheme() === 'dark' ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <View style={styles.container}>
        <Text style={styles.titleText}>Timer Page</Text>
      </View>
      <ScrollView style={styles.TimerScroll}>
        <View style={styles.centered}>
          <TimerComponentSimple endTime={new Date(100000000)} />
          <TimerComponentSimple endTime={new Date(200000000)} />
        </View>
      </ScrollView>
    </ThemeProvider>
  );
};

export default AlarmScreen;
