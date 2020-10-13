import React from 'react';
import {useColorScheme} from 'react-native';
import Clock from './components/Clock';
import styled, {ThemeProvider} from 'styled-components/native';
import {darkTheme, lightTheme} from './themes';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Test</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

function AppTabs()
{
  return (
  <Tab.Navigator>
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Settings" component={SettingsScreen} />
  </Tab.Navigator>
  );
}

const App = () => {
  const theme = useColorScheme() === 'dark' ? darkTheme : lightTheme;

  return (
    <NavigationContainer>
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
     <AppTabs />
    </NavigationContainer>
  );
};

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
