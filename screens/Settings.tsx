import React from 'react';
import {useColorScheme, Text, View} from 'react-native';
import {ThemeProvider} from 'styled-components/native';
import {darkTheme, lightTheme} from '../themes';
import {styles} from '../components/stylesheet';

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

export default SettingsScreen;
