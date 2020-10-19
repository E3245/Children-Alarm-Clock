import React from 'react';
import {useColorScheme, Text, View, StyleSheet} from 'react-native';
import Clock from './components/Clock/Clock';
import styled, {ThemeProvider} from 'styled-components/native';
import {darkTheme, lightTheme} from './themes';
import {Calendar} from 'react-native-calendars';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

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

const SettingsScreen = () => {
  const theme = useColorScheme() === 'dark' ? darkTheme : lightTheme;

  return (
    <View style={styles.centered}>
      <ThemeProvider theme={theme}>
        <Text>Settings!</Text>
      </ThemeProvider>
    </View>
  );
};

const AlarmScreen = () => {
  const theme = useColorScheme() === 'dark' ? darkTheme : lightTheme;

  return (
    <View style={styles.centered}>
      <ThemeProvider theme={theme}>
        <Text>Alarm!</Text>
      </ThemeProvider>
    </View>
  );
};

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

const TimerScreen = () => {
  const theme = useColorScheme() === 'dark' ? darkTheme : lightTheme;

  return (
    <View style={styles.centered}>
      <ThemeProvider theme={theme}>
        <Text>Timer!</Text>
      </ThemeProvider>
    </View>
  );
};

const Tab = createBottomTabNavigator();

const AppTabs = () => {
  const theme = useColorScheme() === 'dark' ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Alarm" component={AlarmScreen} />
        <Tab.Screen name="Calendar" component={CalendarScreen} />
        <Tab.Screen name="Timer" component={TimerScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </ThemeProvider>
  );
};

const App = () => {
  const theme = useColorScheme() === 'dark' ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <AppTabs />
      </NavigationContainer>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const ScrollView = styled.ScrollView`
  flex: 1;
  background-color: ${({theme}) => theme.bgColor};
`;

const SafeAreaView = styled.SafeAreaView`
  background-color: ${({theme}) => theme.bgColor};
  flex: 1;
`;

const StatusBar = styled.StatusBar.attrs(({theme}) => ({
  barStyle: theme.style === 'dark' ? 'light-content' : 'dark-content',
}))``;

export default App;
