import {Agenda} from 'react-native-calendars';
import {View, TouchableOpacity, Text, StyleSheet, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ALARM_STORAGE_KEY, FileManager} from '../helpers/FileManager';
import {AlarmProps} from '../components/Alarm/Alarm';

const mobius = {key: 'mobius', color: 'cyan'};
const lecture = {key: 'lecture', color: 'blue'};
const team = {key: 'team', color: 'teal'};

const loadAlarms = async () => {
  console.log('LOADING ALARMLIST');

  let newAlarmList: AlarmProps[] = [];
  await FileManager.ReadJSONData(ALARM_STORAGE_KEY)
    .then((reponse) => {
      newAlarmList = reponse;
    })
    .catch((response) => {
      console.error('Error loading alarms' + response);
    });

  return newAlarmList;
};

function formatDate(date: Date) {
  var d = new Date(date);
  var month = '' + (d.getMonth() + 1);
  var day = '' + d.getDate();
  var year = d.getFullYear();

  if (month.length < 2) {
    month = '0' + month;
  }
  if (day.length < 2) {
    day = '0' + day;
  }

  return [year, month, day].join('-');
}

// Returns a list of dates in the next 30 dates that this alarm will go off on
const getAlarmDates = (alarm: AlarmProps) => {
  let result: Date[] = [];
  let test_date = new Date();
  if (alarm.daysOfTheWeek) {
    for (let i = 0; i <= 30; i += 1) {
      if (alarm.enabled && alarm.daysOfTheWeek[test_date.getDay()]) {
        result.push(new Date(test_date));
      }
      test_date.setDate(test_date.getDate() + 1);
    }
  }
  return result;
};

const getAlarmEvents = (alarms: AlarmProps[]) => {
  let events: {[date: string]: {}[]} = {};
  alarms.forEach((alarm) => {
    let dates = getAlarmDates(alarm);
    dates.forEach((date) => {
      let fdate = formatDate(date);
      if (!events[fdate]) {
        events[fdate] = [];
      }
      events[fdate].push({
        name: alarm.name,
        start: alarm.endHour + ':' + alarm.endMinute,
      });
    });
  });
  return events;
};

// '2020-11-02': {
//   dots: [{key:'key', color:'color'}],
// },

const getAlarmDots = (alarms: AlarmProps[]) => {
  let dots: {[date: string]: {}} = {};
  alarms.forEach((alarm) => {
    let dates = getAlarmDates(alarm);
    dates.forEach((date) => {
      let fdate = formatDate(date);
      if (!dots[fdate]) {
        dots[fdate] = {dots: []};
      }
      dots[fdate].dots.push({
        key: alarm.name,
        color: alarm.color,
      });
    });
  });
  return dots;
}

export default function AgendaList({props, navigation, route}) {
  const [loadingData, onChangeLoading] = useState(false);
  const [monthData, setMonthData] = useState({});
  const [markedDates, setMarkedDates] = useState({});
  const [intVal, setIntVal] = useState(0);

  useEffect(() => {
    // Hacky garbage
    clearInterval(intVal);
    let int = setInterval(() => {
      loadAlarms()
        .then((value) => {
          setMonthData(getAlarmEvents(value));
          setMarkedDates(getAlarmDots(value));
          onChangeLoading(false);
        })
        .catch();
    }, 5000);

    setIntVal(int);
  }, [loadingData, props]);

  const renderItem = (item, firstItemInDay) => {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => Alert.alert(item.name, item.other)}>
        <>
          <Text>
            {item.start}
            {/* {item.start} - {item.end} */}
          </Text>
          <Text>{item.name}</Text>
          {/* TODO: Make V configurable */}
          {/* <Text>{item.other}</Text> */}
        </>
      </TouchableOpacity>
    );
  };

  return loadingData ? (
    <View>
      <Text>Loading...</Text>
    </View>
  ) : (
    <View style={styles.container}>
      <Agenda
        items={monthData}
        renderItem={(item, firstItemInDay) => {
          return renderItem(item, firstItemInDay);
        }}
        renderEmptyData={() => {
          return (
            <Text style={styles.emptyDate}>
              No events scheduled for this day.
            </Text>
          );
        }}
        markedDates={markedDates}
        markingType={'multi-dot'}
        theme={{
          agendaKnobColor: '#059033',
        }}
        style={{}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
    textAlign: 'center',
  },
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
});
