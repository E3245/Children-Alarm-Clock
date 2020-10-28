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
        <ThemeProvider theme={theme}>
            <View style={styles.container}>
                <Text style={styles.titleText}>Timer Page</Text>
            </View>
            <View style={styles.AddButtonBottom}>
                <AddTimerButton/>
            </View>
        </ThemeProvider>
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    AddButtonBottom: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 36,
    },
});
  

export default TimerPage;
