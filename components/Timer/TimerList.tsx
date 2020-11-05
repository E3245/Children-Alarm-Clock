import React, {Component} from 'react';
import {useColorScheme, Text, View, Button, Alert} from 'react-native';
import {ThemeProvider} from 'styled-components/native';
import {darkTheme, lightTheme} from '../,,/themes';
import {TimerComponentSimple, TimerProps} from './Timer';
import {ScrollView, styles} from '../stylesheet';
import {uuid} from '../../helpers/uuid';
import {withSafeAreaInsets} from 'react-native-safe-area-context';

type Props = {
  name: string;
};

type State = {
  timerList: TimerProps[];
};

function rand(items: Array<any>) {
  // eslint-disable-next-line no-bitwise
  return items[~~(items.length * Math.random())];
}

export class TimerList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {timerList: this.loadTimers()};
  }

  // Pass to the timers to call whenever their state is updated.
  handleChange = (key: string) => {
    return (newTimer: TimerProps) => {
      let timerList = this.state.timerList;

      // Find the correct timer in the list
      timerList.forEach((element, index) => {
        if (element.uuid === key) {
          // Update the state to include to modified timer
          timerList[index] = newTimer;
          this.setState({timerList});
        }
      });
    };
  };

  makeRandomTimer = () => {
    //   Show off your natural hue
    const colors = ['white', 'black', 'green', 'blue', 'pink'];
    const verbs = ['eat', 'drink', 'wash', 'detonate'];
    const nouns = ['dinner', 'water', 'dishes', 'mount Hellens'];

    let time = Math.floor(Math.random() * 10000);
    let ukey = uuid();
    let func = this.handleChange(ukey).bind(this);

    let retprop: TimerProps = {
      amountTime: time,
      name: rand(verbs) + ' ' + rand(nouns),
      color: rand(colors),
      uuid: ukey,
      handleChange: func,
      time: time,
      running: Boolean(Math.round(Math.random())),
    };

    return retprop;
  };

  loadTimers = () => {
    console.log('LOADING TIMERLIST');

    const newTimerList = [];

    // Generate some random timers
    for (let i = 0; i < 5; i += 1) {
      newTimerList.push(this.makeRandomTimer());
    }

    return newTimerList;
  };

  save = () => {
    console.log('SAVING TIMERLIST');
  };

  renderTimers = () => {
    return this.state.timerList.map((timerInfo) => {
      return <TimerComponentSimple key={timerInfo.uuid} {...timerInfo} />;
    });
  };

  render() {
    return <View>{this.renderTimers()}</View>;
  }
}
