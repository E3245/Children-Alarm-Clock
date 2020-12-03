import React, {Component, useEffect} from 'react';

import {BackgroundText, styles, View, TextInput} from '../stylesheet';
import ScrollPicker from 'react-native-wheel-scroll-picker';

import getTime from '../../helpers/time';

type DurationInputProps = {
  label: string;
  placeholder?: string;
  defaultValue?: string | number;
  handleChange?: (text: string) => void;
};

const getHours = (time: number) => {
  const time_s = time / 1000;
  const hours = Math.floor(time_s / 3600);
  return hours;
};

const getMins = (time: number) => {
  const time_s = time / 1000;
  const hours = Math.floor(time_s / 3600);
  const mins = Math.floor((time_s - hours * 3600) / 60);
  return mins;
};

const getSecs = (time: number) => {
  const time_s = time / 1000;
  const hours = Math.floor(time_s / 3600);
  const mins = Math.floor((time_s - hours * 3600) / 60);
  const secs = Math.floor(time_s - hours * 3600 - mins * 60);
  return secs;
};

const calc_duration = (hours: number, mins: number, secs: number): number => {
  return (hours * 3600 + mins * 60 + secs) * 1000;
};

const DurationInput = (props: DurationInputProps) => {
  const [hours, onChangeHours] = React.useState(getHours(props.defaultValue));
  const [mins, onChangeMins] = React.useState(getMins(props.defaultValue));
  const [secs, onChangeSecs] = React.useState(getSecs(props.defaultValue));

  useEffect(() => {
    props.handleChange(calc_duration(hours, mins, secs));
    console.log(calc_duration(hours, mins, secs));
  }, [hours, mins, secs]);

  return (
    <View style={styles.row}>
      <BackgroundText> {props.label} </BackgroundText>
      {/* <TextInput
        placeholder={props.placeholder}
        onChangeText={(text) => onChangeText(text)}
        value={value}
        onEndEditing={() => props.handleChange(value)}
      /> */}

      <ScrollPicker
        dataSource={[
          0,
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11,
          12,
          13,
          14,
          15,
          16,
          17,
          18,
          19,
          20,
          21,
          22,
          23,
        ]}
        selectedIndex={hours}
        renderItem={(data, index, isSelected) => {
          //
        }}
        onValueChange={(data, selectedIndex) => {
          onChangeHours(data);
        }}
        wrapperHeight={60}
        wrapperWidth={20}
        wrapperBackground={'#FFFFFF'}
        itemHeight={20}
        highlightColor={'#d8d8d8'}
        highlightBorderWidth={2}
        activeItemColor={'#222121'}
        itemColor={'#B4B4B4'}
      />
      <ScrollPicker
        dataSource={[
          0,
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11,
          12,
          13,
          14,
          15,
          16,
          17,
          18,
          19,
          20,
          21,
          22,
          23,
          24,
          25,
          26,
          27,
          28,
          29,
          30,
          31,
          32,
          33,
          34,
          35,
          36,
          37,
          38,
          39,
          40,
          41,
          42,
          43,
          44,
          45,
          46,
          47,
          48,
          49,
          50,
          51,
          52,
          53,
          54,
          55,
          56,
          57,
          58,
          59,
        ]}
        selectedIndex={mins}
        renderItem={(data, index, isSelected) => {
          //
        }}
        onValueChange={(data, selectedIndex) => {
          onChangeMins(data);
        }}
        wrapperHeight={60}
        wrapperWidth={20}
        wrapperBackground={'#FFFFFF'}
        itemHeight={20}
        highlightColor={'#d8d8d8'}
        highlightBorderWidth={2}
        activeItemColor={'#222121'}
        itemColor={'#B4B4B4'}
      />
      <ScrollPicker
        dataSource={[
          0,
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11,
          12,
          13,
          14,
          15,
          16,
          17,
          18,
          19,
          20,
          21,
          22,
          23,
          24,
          25,
          26,
          27,
          28,
          29,
          30,
          31,
          32,
          33,
          34,
          35,
          36,
          37,
          38,
          39,
          40,
          41,
          42,
          43,
          44,
          45,
          46,
          47,
          48,
          49,
          50,
          51,
          52,
          53,
          54,
          55,
          56,
          57,
          58,
          59,
        ]}
        selectedIndex={secs}
        renderItem={(data, index, isSelected) => {
          //
        }}
        onValueChange={(data, selectedIndex) => {
          onChangeSecs(data);
        }}
        wrapperHeight={60}
        wrapperWidth={20}
        wrapperBackground={'#FFFFFF'}
        itemHeight={20}
        highlightColor={'#d8d8d8'}
        highlightBorderWidth={2}
        activeItemColor={'#222121'}
        itemColor={'#B4B4B4'}
      />
    </View>
  );
};

export default DurationInput;
