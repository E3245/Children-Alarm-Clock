import {Agenda} from 'react-native-calendars';
import {View, TouchableOpacity, Text, Alert} from 'react-native';
import React from 'react';
import {agenda} from '../components/stylesheet';

const mobius = {key: 'mobius', color: 'cyan'};
const lecture = {key: 'lecture', color: 'blue'};
const team = {key: 'team', color: 'teal'};

const getEventData = () => {
  let events = {
    '2020-11-02': [
      {
        name: 'Group Project - Mobius ',
        start: '2:00 pm',
        end: '4:00 pm',
        other: 'Mobius Description',
      },
    ],

    '2020-11-03': [
      {
        name: 'CSCE 3550 - Lecture',
        start: '4:00 pm',
        end: '5:20 pm',
        other: 'Lecture Description',
      },
    ],

    '2020-11-05': [
      {
        name: 'CSCE 4901 - Team Presentation',
        start: '11:30 am',
        end: '12:50 pm',
        other: 'Team Description',
      },
      {
        name: 'CSCE 3550 - Lecture',
        start: '4:00 pm',
        end: '5:20 pm',
        other: 'Lecture Description',
      },
    ],

    '2020-11-09': [
      {
        name: 'Group Project - Mobius ',
        start: '2:00 pm',
        end: '4:00 pm',
        other: 'Mobius Description',
      },
    ],

    '2020-11-10': [
      {
        name: 'CSCE 3550 - Lecture',
        start: '4:00 pm',
        end: '5:20 pm',
        other: 'Lecture Description',
      },
    ],

    '2020-11-12': [
      {
        name: 'CSCE 4901 - Team Presentation',
        start: '11:30 am',
        end: '12:50 pm',
        other: 'Team Description',
      },
      {
        name: 'CSCE 3550 - Lecture',
        start: '4:00 pm',
        end: '5:20 pm',
        other: 'Lecture Description',
      },
    ],

    '2020-11-16': [
      {
        name: 'Group Project - Mobius ',
        start: '2:00 pm',
        end: '4:00 pm',
        other: 'Mobius Description',
      },
    ],

    '2020-11-17': [
      {
        name: 'CSCE 3550 - Lecture',
        start: '4:00 pm',
        end: '5:20 pm',
        other: 'Lecture Description',
      },
    ],

    '2020-11-19': [
      {
        name: 'CSCE 4901 - Team Presentation',
        start: '11:30 am',
        end: '12:50 pm',
        other: 'Team Description',
      },
      {
        name: 'CSCE 3550 - Lecture',
        start: '4:00 pm',
        end: '5:20 pm',
        other: 'Lecture Description',
      },
    ],

    '2020-11-23': [
      {
        name: 'Group Project - Mobius ',
        start: '2:00 pm',
        end: '4:00 pm',
        other: 'Mobius Description',
      },
    ],

    '2020-11-24': [
      {
        name: 'CSCE 3550 - Lecture',
        start: '4:00 pm',
        end: '5:20 pm',
        other: 'Lecture Description',
      },
    ],

    '2020-11-26': [
      {
        name: 'CSCE 4901 - Team Presentation',
        start: '11:30 am',
        end: '12:50 pm',
        other: 'Team Description',
      },
      {
        name: 'CSCE 3550 - Lecture',
        start: '4:00 pm',
        end: '5:20 pm',
        other: 'Lecture Description',
      },
    ],
  };

  return [events, false];
};

export default function AgendaList({props, navigation, route}) {
  const [monthData, loadingData] = getEventData();

  const renderItem = (item, firstItemInDay) => {
    return (
      <TouchableOpacity
        style={agenda.item}
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

  if (loadingData || !monthData) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <View style={agenda.container}>
      <Agenda
        items={monthData}
        renderItem={(item, firstItemInDay) => {
          return renderItem(item, firstItemInDay);
        }}
        renderEmptyData={() => {
          return (
            <Text style={agenda.emptyDate}>
              No events scheduled for this day.
            </Text>
          );
        }}
        markedDates={{
          '2020-11-02': {
            dots: [mobius],
          },

          '2020-11-03': {
            dots: [lecture],
          },

          '2020-11-05': {
            dots: [lecture, team],
          },

          '2020-11-09': {
            dots: [mobius],
          },

          '2020-11-10': {
            dots: [lecture],
          },

          '2020-11-12': {
            dots: [lecture, team],
          },
          '2020-11-16': {
            dots: [mobius],
          },

          '2020-11-17': {
            dots: [lecture],
          },

          '2020-11-19': {
            dots: [lecture, team],
          },

          '2020-11-23': {
            dots: [mobius],
          },

          '2020-11-24': {
            dots: [lecture],
          },

          '2020-11-26': {
            dots: [lecture, team],
          },
        }}
        markingType={'multi-dot'}
        theme={{
          agendaKnobColor: '#059033',
        }}
        style={{}}
      />
    </View>
  );
}
