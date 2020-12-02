import React from 'react';

import {BackgroundText, styles, View, TextInput} from '../stylesheet';

type LabeledTextInputProps = {
  label: string;
  placeholder?: string;
  defaultValue?: string | number;
  handleChange?: (text: string) => void;
};

const LabeledTextInput = (props: LabeledTextInputProps) => {
  const [value, onChangeText] = React.useState(props.defaultValue?.toString());

  return (
    <View style={styles.row}>
      <BackgroundText> {props.label} </BackgroundText>
      <TextInput
        placeholder={props.placeholder}
        onChangeText={(text) => onChangeText(text)}
        value={value}
        onEndEditing={() => props.handleChange(value)}
      />
    </View>
  );
};

export default LabeledTextInput;
