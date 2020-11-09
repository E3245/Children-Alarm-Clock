import React from 'react';
import {useColorScheme, Text, View} from 'react-native';
import {ThemeProvider} from 'styled-components/native';
import {darkTheme, lightTheme} from '../themes';
import * as StylesModule from '../components/stylesheet';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';

const SettingsScreen = () => {
  const SettingsSafeAreaView = StylesModule.SafeAreaView;
  const SettingsText = StylesModule.Text;
  return (
    <SettingsSafeAreaView>
      <View style={StylesModule.styles.centered}>
        <SettingsText>Settings!</SettingsText>
      </View>
    </SettingsSafeAreaView>
  );
};

export default SettingsScreen;
