import React, {Component} from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';

const Separator = () => <View style={styles.separator} />;

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
      currentMonth: month + '/' + day + '/' + year,
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
        <ScrollView style={styles.container}>
          <Separator />
          <View style={styles.dClock}>
            <View>
              <Text style={styles.timeText}>{this.state.currentTime}</Text>
              <Text style={styles.daysText}>
                {this.state.currentDay} - {this.state.currentMonth}
              </Text>
            </View>
          </View>
          <Separator />
        </ScrollView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // justifyContent: 'center',
    flex: 1,
    paddingTop: 10,
    marginTop: 20,
    // alignItems: 'center',
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
  },
  dClock: {
    marginTop: 5,
    paddingVertical: 4,
    padding: 40,
    borderWidth: 4,
    borderColor: '#20232a',
    borderRadius: 6,
    backgroundColor: '#059033' /*{color} */,
    color: '#20232a',
    textAlign: 'center',
    // alignItems: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    flexDirection: 'row',
    flexWrap: 'wrap',
    // justifyContent: 'space-between',
  },
  timeText: {
    fontSize: 30,
    color: '#000000',
  },
  daysText: {
    color: '#000000',
    fontSize: 25,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
  },
});
