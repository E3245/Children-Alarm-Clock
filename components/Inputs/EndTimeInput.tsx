import React, {Component, useEffect} from 'react';

import {BackgroundText, styles, View, TextInput} from '../stylesheet';
import styled from 'styled-components/native';
import ScrollPicker from 'react-native-wheel-scroll-picker';

type EndTimeInputProps = {
  label: string;
  defaultMinuteValue?: string | number;
  defaultHourValue?: string | number;
  handleMinuteChange?: (text: string) => void;
  handleHourChange?: (text: string) => void;
};

const EndTimeInput = (props: EndTimeInputProps) => {
  const [hours, onChangeHours] = React.useState(props.defaultHourValue);
  const [mins, onChangeMins] = React.useState(props.defaultMinuteValue);

  useEffect(() => {
    props.handleMinuteChange(mins);
    props.handleHourChange(hours);
  }, [hours, mins]);

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
    </View>
  );
};

export default EndTimeInput;
