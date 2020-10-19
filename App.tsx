import React from 'react';
import {useColorScheme} from 'react-native';
import {ThemeProvider} from 'styled-components/native';
import {darkTheme, lightTheme} from './themes';

/*Navigation Calls*/
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

/*Icon Imports*/
import IonIcons from 'react-native-vector-icons/Ionicons';

/*Screen Calls*/
import HomeScreen from './screens/Clock';
import SettingsScreen from './screens/Settings';
import AlarmScreen from './screens/Alarm';
import CalendarScreen from './screens/Calendar';
import TimerScreen from './screens/Timer';

const Tab = createBottomTabNavigator();

const AppTabs = () => {
  const theme = useColorScheme() === 'dark' ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <Tab.Navigator
        screenOptions={({route}) => ({
          // Function that controls the icons and their color when selected/deselected
          tabBarIcon: ({focused, color, size}) => {
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
        tabBarOptions={{
          // Colors that the tabs will take. Will need to be adjusted for dark mode, if possible
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}>
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

export default App;
