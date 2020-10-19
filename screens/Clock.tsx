import React from 'react';
import Clock from '../components/Clock/Clock';
import {
  useColorScheme,
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
} from 'react-native';
import {ThemeProvider} from 'styled-components/native';
import {darkTheme, lightTheme} from '../themes';
import {styles} from '../components/stylesheet';

const HomeScreen = () => {
  const theme = useColorScheme() === 'dark' ? darkTheme : lightTheme;

  return (
    <View style={styles.centered}>
      <ThemeProvider theme={theme}>
        <StatusBar barStyle="light-content" />
        <SafeAreaView>
          <ScrollView
            centerContent={true}
            contentInsetAdjustmentBehavior="automatic">
            <Clock />
          </ScrollView>
        </SafeAreaView>
      </ThemeProvider>
    </View>
  );
};

export default HomeScreen;
