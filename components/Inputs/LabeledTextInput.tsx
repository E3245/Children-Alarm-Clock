import React from 'react';

import {BackgroundText, styles, View, TextInput} from '../stylesheet';

type LabeledTextInputProps = {
  label: string;
  placeholder?: string;
  defaultValue?: string | number;
  handleChange?: (text: string) => void;
};

const LabeledTextInput = (props: LabeledTextInputProps) => {
  return (
    <View style={styles.row}>
      <BackgroundText> {props.label} </BackgroundText>
      <TextInput
        placeholder={props.placeholder}
        onChangeText={props.handleChange}
        defaultValue={props.defaultValue?.toString()}
      />
    </View>
  );
};

export default LabeledTextInput;
