import React, {Component} from 'react';
import {useColorScheme, Text, Button, Alert} from 'react-native';
import {ThemeProvider} from 'styled-components/native';
import {darkTheme, lightTheme} from '../themes';
import {TimerList} from '../components/Timer/TimerList';
import {View, ScrollView, styles} from '../components/stylesheet';

const TimerScreen = () => {
  const theme = useColorScheme() === 'dark' ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <View style={styles.container}>
        <Text style={styles.titleText}>Timer Page</Text>
      </View>
      <ScrollView style={styles.TimerScroll}>
        <View style={styles.centered}>
          <TimerList name="garbage" />
        </View>
      </ScrollView>
      <View>
        {/* <View style={styles.AddButtonBottom}>
          <AddTimerButton />
        </View> */}
      </View>
    </ThemeProvider>
  );
};

// // Button that allows us to add a timer
// class AddTimerButton extends Component {
//   _onPressButton() {
//     Alert.alert('You tapped the button!');
//   }

//   render() {
//     return (
//       <View style={styles.buttonContainer}>
//         <Button onPress={this._onPressButton} title="Add Timer" />
//       </View>
//     );
//   }
// }

// TODO: Add menu that lets you set up a timer and saves it to a file
// class AddTimerMenu extends Component {}

// TODO: Add menu that displays all timer components that are saved
// class TimerList extends Component {}

export default TimerScreen;
