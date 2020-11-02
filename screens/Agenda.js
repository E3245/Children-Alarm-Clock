import {Agenda} from 'react-native-calendars';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import React from 'react';

/*{
"YYYY-MM-01:[{name:"eventName"},{name:"eventName"}]
,"YYYY-MM-02:[{name:"eventName"},{name:"eventName",name:"eventName"}]
}*/

const mobius = {key: 'mobius', color: 'cyan'};
const classTime = {key: 'classTime', color: 'blue'};
const project = {key: 'project', color: 'teal'};

const getEventData = () => {
  let events = {
    '2020-10-05': [
      {name: 'Group Project - Mobius ', start: '2:00 pm', end: '4:00 pm'},
    ],

    '2020-10-06': [
      {name: 'CSCE 3550 - Lecture', start: '4:00 pm', end: '5:20 pm'},
    ],

    '2020-10-08': [
      {
        name: 'CSCE 4901 - Team Presentation',
        start: '11:30 am',
        end: '12:50 pm',
      },
      {name: 'CSCE 3550 - Lecture', start: '4:00 pm', end: '5:20 pm'},
    ],

    '2020-10-12': [
      {name: 'Group Project - Mobius ', start: '2:00 pm', end: '4:00 pm'},
    ],

    '2020-10-13': [
      {name: 'CSCE 3550 - Lecture', start: '4:00 pm', end: '5:20 pm'},
    ],

    '2020-10-15': [
      {
        name: 'CSCE 4901 - Team Presentation',
        start: '11:30 am',
        end: '12:50 pm',
      },
      {name: 'CSCE 3550 - Lecture', start: '4:00 pm', end: '5:20 pm'},
    ],

    '2020-10-19': [
      {name: 'Group Project - Mobius ', start: '2:00 pm', end: '4:00 pm'},
    ],

    '2020-10-20': [
      {name: 'CSCE 3550 - Lecture', start: '4:00 pm', end: '5:20 pm'},
    ],

    '2020-10-22': [
      {
        name: 'CSCE 4901 - Team Presentation',
        start: '11:30 am',
        end: '12:50 pm',
      },
      {name: 'CSCE 3550 - Lecture', start: '4:00 pm', end: '5:20 pm'},
    ],

    '2020-10-26': [
      {name: 'Group Project - Mobius ', start: '2:00 pm', end: '4:00 pm'},
    ],

    '2020-10-27': [
      {name: 'CSCE 3550 - Lecture', start: '4:00 pm', end: '5:20 pm'},
    ],

    '2020-10-29': [
      {
        name: 'CSCE 4901 - Team Presentation',
        start: '11:30 am',
        end: '12:50 pm',
      },
      {name: 'CSCE 3550 - Lecture', start: '4:00 pm', end: '5:20 pm'},
    ],
  };
  return [events, false];
};

export default function AgendaList({props, navigation, route}) {
  const [monthData, loadingData] = getEventData();

  const renderItem = (item, firstItemInDay) => {
    // console.log('rendering', item);
    return (
      <TouchableOpacity>
        <>
          <Text>{item.start}</Text>
          <Text>{item.name}</Text>
        </>
      </TouchableOpacity>
    );
  };

  if (loadingData || !monthData) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Agenda
        items={monthData}
        renderItem={(item, firstItemInDay) => {
          return renderItem(item, firstItemInDay);
        }}
        pastScrollRange={0}
        futureScrollRange={0}
        markedDates={{
          '2020-10-05': {
            dots: [mobius],
          },

          '2020-10-06': {
            dots: [classTime],
          },

          '2020-10-08': {
            dots: [classTime, project],
          },

          '2020-10-12': {
            dots: [mobius],
          },

          '2020-10-13': {
            dots: [classTime],
          },

          '2020-10-15': {
            dots: [classTime, project],
          },
          '2020-10-19': {
            dots: [mobius],
          },

          '2020-10-20': {
            dots: [classTime],
          },

          '2020-10-22': {
            dots: [classTime, project],
          },

          '2020-10-26': {
            dots: [mobius],
          },

          '2020-10-27': {
            dots: [classTime],
          },

          '2020-10-29': {
            dots: [classTime, project],
          },
        }}
        markingType={'multi-dot'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
