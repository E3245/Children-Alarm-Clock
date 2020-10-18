import React from 'react';
import {useColorScheme, Text, View, StyleSheet} from 'react-native';
import Clock from './components/Clock/Clock';
import styled, {ThemeProvider} from 'styled-components/native';
import {darkTheme, lightTheme} from './themes';
import {Calendar} from 'react-native-calendars';

// Navigation
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// Icons
import IonIcons from 'react-native-vector-icons/Ionicons';

// Pages
import TimerPage from './Timer';

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

const Tab = createBottomTabNavigator();

const AppTabs = () => {
  const theme = useColorScheme() === 'dark' ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <Tab.Navigator
        screenOptions={({route}) => ({                  // Function that controls the icons and their color when selected/deselected
          tabBarIcon: ({ focused, color, size}) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
              ? 'information-circle'
              : 'information-circle-outline';
            } else if (route.name === 'Alarm') {
              iconName = focused ? 'alarm' : 'alarm-outline';
            } else if (route.name === 'Calendar') {
              iconName = focused ? 'calendar' : 'calendar-outline';
            } else if (route.name === 'Timer') {
              iconName = focused ? 'timer' : 'timer-outline';
            } else if (route.name === 'Settings') {
                iconName = focused ? 'settings' : 'settings-outline';
            } else {
                iconName = focused ? 'help-circle' : 'help-circle-outline';
            }

            return <IonIcons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{                            // Colors that the tabs will take. Will need to be adjusted for dark mode, if possible
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Alarm" component={AlarmScreen} />
        <Tab.Screen name="Calendar" component={CalendarScreen} />
        <Tab.Screen name="Timer" component={TimerPage} />
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
