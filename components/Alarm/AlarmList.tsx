/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {Component} from 'react';
import {useColorScheme, Text, View, Button, Alert} from 'react-native';
import {ThemeProvider} from 'styled-components/native';
import {darkTheme, lightTheme} from '../../themes';
import {AlarmComponentSimple, AlarmProps} from './Alarm';
import {ScrollView, styles} from '../stylesheet';
import {uuid} from '../../helpers/uuid';
import {ALARM_STORAGE_KEY, FileManager} from '../../helpers/FileManager';
import {LearnMoreLinks} from 'react-native/Libraries/NewAppScreen';
import EditModal from './EditAlarmModal';

type Props = {
  name: string;
};

type State = {
  alarmList: AlarmProps[];
  // Edit modal open
  editing: boolean;
  // Edit buttons shown
  editing_mode: boolean;
  // uuid in timerlist of the selected timer
  selectedAlarm: number;
};

function rand(items: Array<any>) {
  // eslint-disable-next-line no-bitwise
  return items[~~(items.length * Math.random())];
}

export class AlarmList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.openEditModal = this.openEditModal.bind(this);
    this.selectAlarm = this.selectAlarm.bind(this);
    this.deleteAlarm = this.deleteAlarm.bind(this);
    this.state = {
      alarmList: [],
      editing: false,
      selectedAlarm: 0,
      editing_mode: false,
    };
  }

  componentDidMount = () => {
    this.loadAlarms().then((val) => {
      this.setState({alarmList: val});
    });
  };

  // Pass to the timers to call whenever their state is updated.
  handleChange = (key: string) => {
    return (newAlarm: AlarmProps) => {
      let alarmList = this.state.alarmList;

      // Find the correct timer in the list
      alarmList.forEach((element, index) => {
        if (element.uuid === key) {
          console.log('UPDATED');
          let old_func = alarmList[index].handleChange;
          // Update the state to include to modified timer
          alarmList[index] = newAlarm;
          // Don't let the callback change
          alarmList[index].handleChange = old_func;
          // timerList[index].amountTime = newTimer.amountTime.toI
          this.setState({alarmList: alarmList});
        }
      });
      this.save();
    };
  };

  makeRandomAlarm = () => {
    //   Show off your natural hue
    const colors = ['white', 'black', 'green', 'blue', 'pink'];
    const verbs = ['eat', 'drink', 'wash', 'detonate'];
    const nouns = ['dinner', 'water', 'dishes', 'mount Hellens'];

    let time = Math.floor(Math.random() * 10000 + 10000);
    let ukey = uuid();
    let func = this.handleChange(ukey).bind(this);

    let retprop: AlarmProps = {
      endHour: 6,
      endMinute: 30,
      nextEndTime: 0,
      name: rand(verbs) + ' ' + rand(nouns),
      color: rand(colors),
      uuid: ukey,
      handleChange: func,
      enabled: false,
    };

    return retprop;
  };

  deleteAlarm = (iuuid: string) => {
    let newAlarmList = this.state.alarmList;
    newAlarmList = newAlarmList.filter((alarm) => {
      return alarm.uuid !== iuuid;
    });

    // Set state and save after the state has been updated.
    this.setState({alarmList: newAlarmList}, this.save);
  };

  addAlarm = (alarm: AlarmProps) => {
    let newAlarmList = this.state.alarmList;
    newAlarmList.push(alarm);
    this.setState({alarmList: newAlarmList});
  };

  createAlarm = () => {
    // Generate a new timer
    let alarm = this.makeRandomAlarm();
    // Add this new timer to the timer list
    this.addAlarm(alarm);
    // Open the edit modal for this timer
    this.selectAlarm(alarm.uuid);
    this.openEditModal();
  };

  loadAlarms = async () => {
    console.log('LOADING ALARMLIST');
    // Delete all timer data for testing
    // FileManager.ClearData([ALARM_STORAGE_KEY]);

    let newAlarmList: AlarmProps[] = [];
    await FileManager.ReadJSONData(ALARM_STORAGE_KEY)
      .then((reponse) => {
        newAlarmList = reponse;

        // Generate some timers if none are saved
        if (newAlarmList == null || newAlarmList.length === 0) {
          newAlarmList = [];
          console.log('Generating some random alarms');
          // Generate some random timers
          for (let i = 0; i < 5; i += 1) {
            newAlarmList.push(this.makeRandomAlarm());
          }
        }

        // Bind the function to handle state changes for each
        newAlarmList.forEach((element: AlarmProps, index: number) => {
          newAlarmList[index].handleChange = this.handleChange(
            element.uuid,
          ).bind(this);
        });
      })
      .catch((response) => {
        console.error('Error loading alarmss' + response);
      });

    return newAlarmList;
  };

  save = () => {
    console.log('SAVING ALARMLIST');
    // FileManager.ClearData([ALARM_STORAGE_KEY]);
    FileManager.WriteJSONToDisk(ALARM_STORAGE_KEY, this.state.alarmList, false);
  };

  openEditModal = () => {
    this.setState({editing: true});
  };

  closeEditModal = () => {
    this.setState({editing: false});
  };

  componentDidUpdate = () => {
    console.log('updated');
  };

  getAlarm = (iuuid: string): AlarmProps | undefined => {
    for (let alarm of this.state.alarmList) {
      if (alarm.uuid === iuuid) {
        return alarm;
      }
    }
  };

  toggleEditMode = () => {
    this.setState({editing_mode: !this.state.editing_mode});
  };

  selectAlarm = (iuuid: string) => {
    for (var _i = 0; _i < this.state.alarmList.length; _i++) {
      if (this.state.alarmList[_i].uuid === iuuid) {
        this.setState({selectedAlarm: _i});
        return;
      }
    }
    console.warn('DID NOT SELECT ALARM');
    this.setState({selectedAlarm: -1});
  };

  renderAlarmsWithEdit = () => {
    if (this.state.alarmList !== null) {
      return this.state.alarmList.map((alarmInfo) => {
        return (
          <View style={styles.row} key={alarmInfo.uuid}>
            <View style={styles.centered}>
              <View>
                <Button
                  title={'edit'}
                  onPress={() => {
                    this.selectAlarm(alarmInfo.uuid);
                    this.openEditModal();
                  }}
                />
                <Button
                  title={'Delete'}
                  onPress={() => {
                    this.deleteAlarm(alarmInfo.uuid);
                  }}
                />
              </View>
            </View>
            <AlarmComponentSimple
              key={alarmInfo.uuid}
              {...alarmInfo}
              hideButtons={this.state.editing_mode}
            />
          </View>
        );
      });
    }
  };

  renderAlarmsWithoutEdit = () => {
    if (this.state.alarmList !== null) {
      return this.state.alarmList.map((alarmInfo) => {
        return (
          <View style={styles.row} key={alarmInfo.uuid}>
            <AlarmComponentSimple
              key={alarmInfo.uuid}
              {...alarmInfo}
              hideButtons={this.state.editing_mode}
            />
          </View>
        );
      });
    }
  };

  render() {
    return (
      <View>
        <View style={styles.buttonContainer}>
          <Button title={'Edit'} onPress={this.toggleEditMode} />
        </View>
        <View>
          {this.state.editing_mode
            ? this.renderAlarmsWithEdit()
            : this.renderAlarmsWithoutEdit()}
        </View>
        <EditModal
          isVisible={this.state.editing}
          alarm={this.state.alarmList[this.state.selectedAlarm]}
          onClose={this.closeEditModal}
        />
        <View style={styles.buttonContainer}>
          <Button onPress={this.createAlarm} title="Add Alarm" />
        </View>
      </View>
    );
  }
}
