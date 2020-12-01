import React, {Component} from 'react';
import {ScrollView, View, Text} from 'react-native';
import {digitalStyle} from '../stylesheet';

const Separator = () => <View style={digitalStyle.separator} />;

export default class DigitalClock extends Component {
  constructor() {
    super();

    this.state = {currentTime: null, currentDay: null, currentMonth: null};
    this.daysArray = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ];
  }

  _componentWillMount() {
    this.getCurrentTime();
  }

  getCurrentTime = () => {
    let hour = new Date().getHours();
    let minutes = new Date().getMinutes();
    let seconds = new Date().getSeconds(); //getUTCHours()
    let am_pm = 'PM';

    let month = new Date().getMonth();
    let day = new Date().getDate();
    let year = new Date().getFullYear();

    if (minutes < 10) {
      minutes = '0' + minutes;
    }

    if (seconds < 10) {
      seconds = '0' + seconds;
    }

    if (hour > 12) {
      hour = hour - 12;
    }

    if (hour === 0) {
      hour = 12;
    }

    if (new Date().getHours() < 12) {
      am_pm = 'AM';
    }

    this.setState({
      currentTime: hour + ':' + minutes + ':' + seconds + ' ' + am_pm,
      currentMonth: month + 1 + '/' + day + '/' + year,
    });

    this.daysArray.map((item, key) => {
      if (key === new Date().getDay()) {
        this.setState({currentDay: item});
      }
    });
  };

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.getCurrentTime();
    }, 1000);
  }

  render() {
    return (
      <>
        <ScrollView style={digitalStyle.container}>
        <Text /><Text /><Text /><Text /><Text /><Text /><Text /><Text /><Text /><Text /><Text /><Text />
          <Separator />
          <View style={digitalStyle.dClock}>
            <View>
              <Text style={digitalStyle.timeText}>
                {this.state.currentTime}
              </Text>
              <Text style={digitalStyle.daysText}>
                {this.state.currentDay} - {this.state.currentMonth}
              </Text>
            </View>
          </View>
          <Text />
        </ScrollView>
      </>
    );
  }
}
