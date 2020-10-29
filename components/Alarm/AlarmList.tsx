import React, {Component} from 'react';
import {useColorScheme, Text, View, Button, Alert} from 'react-native';
import {ThemeProvider} from 'styled-components/native';
import {darkTheme, lightTheme} from '../,,/themes';
import {AlarmComponentSimple, AlarmProps} from './Alarm';
import {ScrollView, styles} from '../stylesheet';
import {uuid} from '../../helpers/uuid';

type Props = {
  name: string;
};

type State = {
  alarmList: AlarmProps[];
};

function rand(items: Array<any>) {
  return items[~~(items.length * Math.random())];
}

export class AlarmList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {alarmList: []};

    this.load();
  }

  makeRandomAlarm = () => {
    //   Show off your natural hue
    const colors = ['white', 'black', 'green', 'blue', 'pink'];
    const verbs = ['eat', 'drink', 'wash', 'detonate'];
    const nouns = ['dinner', 'water', 'dishes', 'mount Hellens'];

    let retVal: AlarmProps = {
      amountTime: Math.floor(Math.random() * 100),
      name: rand(verbs) + ' ' + rand(nouns),
      color: rand(colors),
      key: uuid(),
    };

    return retVal;
  };

  load = () => {
    console.log('LOADING ALARMLIST');

    // Generate some random alarms
    for (let i = 0; i < 5; i += 1) {
      this.state.alarmList.push(this.makeRandomAlarm());
    }
  };

  save = () => {
    console.log('SAVING ALARMLIST');
  };

  renderAlarms = () => {
    return this.state.alarmList.map((alarmInfo) => {
      return (
        <AlarmComponentSimple
          key={alarmInfo.key}
          amountTime={alarmInfo.amountTime}
          name={alarmInfo.name}
          color={alarmInfo.color}
        />
      );
    });
  };

  render() {
    return <View>{this.renderAlarms()}</View>;
  }
}
