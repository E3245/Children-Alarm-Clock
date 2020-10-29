import React, {Component} from 'react';
import {useColorScheme, Text, View, Button, Alert} from 'react-native';
import {ThemeProvider} from 'styled-components/native';
import {darkTheme, lightTheme} from '../,,/themes';
import {TimerComponentSimple, TimerProps} from './Timer';
import {ScrollView, styles} from '../stylesheet';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

type Props = {
  name: string;
};

type State = {
  timerList: TimerProps[];
};

function rand(items: Array<any>) {
  return items[~~(items.length * Math.random())];
}

export class TimerList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {timerList: []};

    this.load();
  }

  makeRandomTimer = () => {
    //   Show off your natural hue
    const colors = ['white', 'black', 'green', 'blue', 'pink'];
    const verbs = ['eat', 'drink', 'wash', 'detonate'];
    const nouns = ['dinner', 'water', 'dishes', 'mount Hellens'];

    let retVal: TimerProps = {
      amountTime: Math.floor(Math.random() * 100),
      name: rand(verbs) + ' ' + rand(nouns),
      color: rand(colors),
      key: uuidv4(),
    };

    return retVal;
  };

  load = () => {
    console.log('LOADING TIMERLIST');

    // Generate some random timers
    for (let i = 0; i < 5; i += 1) {
      this.state.timerList.push(this.makeRandomTimer());
    }
  };

  save = () => {
    console.log('SAVING TIMERLIST');
  };

  renderTimers = () => {
    return this.state.timerList.map((timerInfo) => {
      return (
        <TimerComponentSimple
          key={timerInfo.key}
          amountTime={timerInfo.amountTime}
          name={timerInfo.name}
          color={timerInfo.color}
        />
      );
    });
  };

  render() {
    return <View>{this.renderTimers()}</View>;
  }
}
