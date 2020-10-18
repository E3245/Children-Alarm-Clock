import React, { Component } from 'react';
import {useColorScheme, Text, View, StyleSheet, FlatList, Button, Alert} from 'react-native';
import styled, { ThemeProvider } from "styled-components/native";
import {darkTheme, lightTheme} from './themes';
import TimerComponent from "./components/Timer/TimerComponent";
import { render } from "react-dom";
import { TouchableHighlight } from "react-native-gesture-handler";



const TimerPage = () => {
    const theme = useColorScheme() === 'dark' ? darkTheme : lightTheme;

    return (
      <View style={styles.container}>
        <ThemeProvider theme={theme}>
        <View>
            <Text style={styles.titleText}>Timer Page</Text>
        </View>
        <AddTimerButton/>
        </ThemeProvider>
      </View>
    );
};

// Button that allows us to add a timer
class AddTimerButton extends Component {
    _onPressButton() {
        Alert.alert('You tapped the button!')
    }
    
    render() {
        return (
            <View style={styles.buttonContainer}>
                <Button
                    onPress={this._onPressButton}
                    title="Add Timer"
                />
            </View>
        );
    }
};

// TODO: Add menu that lets you set up a timer and saves it to a file
class AddTimerMenu extends Component {

};

// TODO: Add menu that displays all timer components that are saved
class TimerList extends Component {

}


const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    titleText: {
        fontSize: 20,
        fontWeight: "bold",
    },
    buttonContainer: {
        margin: 20,
        width: "200%",
    },
});
  

export default TimerPage;
