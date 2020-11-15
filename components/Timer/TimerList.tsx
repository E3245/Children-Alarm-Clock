/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {Component} from 'react';
import {useColorScheme, Text, View, Button, Alert} from 'react-native';
import {ThemeProvider} from 'styled-components/native';
import {darkTheme, lightTheme} from '../../themes';
import {TimerComponentSimple, TimerProps} from './Timer';
import {ScrollView, styles} from '../stylesheet';
import {uuid} from '../../helpers/uuid';
import {FileManager, TIMER_STORAGE_KEY} from '../../helpers/FileManager';
import {LearnMoreLinks} from 'react-native/Libraries/NewAppScreen';
import EditModal from '../../components/Timer/EditTimerModal';

type Props = {
  name: string;
};

type State = {
  timerList: TimerProps[];
  editing: boolean;
  // uuid in timerlist of the selected timer
  selectedTimer?: string;
};

function rand(items: Array<any>) {
  // eslint-disable-next-line no-bitwise
  return items[~~(items.length * Math.random())];
}

export class TimerList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.openEditModal = this.openEditModal.bind(this);
    this.state = {timerList: [], editing: false};
  }

  componentDidMount = () => {
    this.loadTimers().then((val) => {
      this.setState({timerList: val});
    });
  };

  // Pass to the timers to call whenever their state is updated.
  handleChange = (key: string) => {
    return (newTimer: TimerProps) => {
      let timerList = this.state.timerList;

      // Find the correct timer in the list
      timerList.forEach((element, index) => {
        if (element.uuid === key) {
          console.log('UPDATED');
          let old_func = timerList[index].handleChange;
          // Update the state to include to modified timer
          timerList[index] = newTimer;
          // Don't let the callback change
          timerList[index].handleChange = old_func;
          // timerList[index].amountTime = newTimer.amountTime.toI
          this.setState({timerList});
        }
      });
      this.save();
    };
  };

  makeRandomTimer = () => {
    //   Show off your natural hue
    const colors = ['white', 'black', 'green', 'blue', 'pink'];
    const verbs = ['eat', 'drink', 'wash', 'detonate'];
    const nouns = ['dinner', 'water', 'dishes', 'mount Hellens'];

    let time = Math.floor(Math.random() * 10000 + 10000);
    let ukey = uuid();
    let func = this.handleChange(ukey).bind(this);

    let retprop: TimerProps = {
      amountTime: time,
      name: rand(verbs) + ' ' + rand(nouns),
      color: rand(colors),
      uuid: ukey,
      handleChange: func,
      time: time,
      running: false,
    };

    return retprop;
  };

  loadTimers = async () => {
    console.log('LOADING TIMERLIST');
    // Delete all timer data for testing
    // FileManager.ClearData([TIMER_STORAGE_KEY]);

    let newTimerList: TimerProps[] = [];
    await FileManager.ReadJSONData(TIMER_STORAGE_KEY)
      .then((reponse) => {
        newTimerList = reponse;

        // Generate some timers if none are saved
        if (newTimerList == null || newTimerList.length === 0) {
          newTimerList = [];
          console.log('Generating some random timers');
          // Generate some random timers
          for (let i = 0; i < 5; i += 1) {
            newTimerList.push(this.makeRandomTimer());
          }
        }

        // Bind the function to handle state changes for each
        newTimerList.forEach((element: TimerProps, index: number) => {
          newTimerList[index].handleChange = this.handleChange(
            element.uuid,
          ).bind(this);
        });
      })
      .catch((response) => {
        console.error('Error loading timers' + response);
      });

    return newTimerList;
  };

  save = () => {
    console.log('SAVING TIMERLIST');
    // FileManager.ClearData([TIMER_STORAGE_KEY]);
    FileManager.WriteJSONToDisk(TIMER_STORAGE_KEY, this.state.timerList, false);
  };

  openEditModal = () => {
    this.setState({editing: true});
  };

  closeEditModal = () => {
    this.setState({editing: false});
  };

  componentDidUpdate = () => {
    console.log('updated');
    console.log(this.state.editing);
  };

  getTimer = (iuuid: string): TimerProps | undefined => {
    for (let timer of this.state.timerList) {
      if (timer.uuid === iuuid) {
        return timer;
      }
    }
  };

  getSelectedTimer = (): TimerProps | undefined => {
    if (this.state.selectedTimer) {
      return this.getTimer(this.state.selectedTimer);
    }
  };

  renderTimers = () => {
    if (this.state.timerList !== null) {
      return this.state.timerList.map((timerInfo) => {
        return <TimerComponentSimple key={timerInfo.uuid} {...timerInfo} />;
      });
    }
  };

  render() {
    return (
      <View>
        <View>{this.renderTimers()}</View>
        <Button title={'EEEE'} onPress={this.openEditModal} />
        <EditModal
          isVisible={this.state.editing}
          timer={this.state.timerList[0]}
          onClose={this.closeEditModal}
        />
      </View>
    );
  }
}
