import React, {Component} from 'react';
import {useColorScheme, Text, View, Button, Alert} from 'react-native';
import {ThemeProvider} from 'styled-components/native';
import {darkTheme, lightTheme} from '../,,/themes';
import {TimerComponentSimple, TimerProps, TimerState} from './Timer';
import {ScrollView, styles} from '../stylesheet';
import {uuid} from '../../helpers/uuid';
import {withSafeAreaInsets} from 'react-native-safe-area-context';

type Props = {
  name: string;
};

type State = {
  timerList: [{props: TimerProps; state: TimerState}];
};

function rand(items: Array<any>) {
  // eslint-disable-next-line no-bitwise
  return items[~~(items.length * Math.random())];
}

export class TimerList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);

    this.load();
  }

  // Pass to the timers to call whenever their state is updated.
  handleChange = (key: string) => {
    return (newState: TimerState) => {
      let timerList = this.state.timerList;

      // Find the correct timer in the list
      timerList.forEach((element, index) => {
        if (element.props.key === key) {
          // Update the state to include to modified timer
          timerList[index].state = newState;
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

    let time = Math.floor(Math.random() * 100);
    let ukey = uuid();
    let func = this.handleChange(ukey).bind(this);

    let retprop: TimerProps = {
      amountTime: time,
      name: rand(verbs) + ' ' + rand(nouns),
      color: rand(colors),
      key: ukey,
      handleChange: func,
    };

    let retstate: TimerState = {
      remainingTime: time,
      running: false,
    };

    return {props: retprop, state: retstate};
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
      return <TimerComponentSimple {...timerInfo.props} {...timerInfo.state} />;
    });
  };

  render() {
    return <View>{this.renderTimers()}</View>;
  }
}
