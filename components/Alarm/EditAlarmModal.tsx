import React from 'react';
import {Button, ScrollView, StyleSheet} from 'react-native';
import {View} from '../stylesheet';
import Modal from 'react-native-modal';
import EditAlarm from './EditAlarm';
import {AlarmProps} from './Alarm';

type EditModalProps = {
  alarm: AlarmProps;
  isVisible: boolean;
  onClose: () => void;
};

const EditModal = (props: EditModalProps) => {
  // Make a new timer based on the changed value, and call the callback to notify parent
  const saveAlarm = (prop: string, new_val: any) => {
    let alarm_cp = props.alarm;
    console.log(prop);
    console.log(alarm_cp);
    if (!(prop in alarm_cp)) {
      console.error('Tried to modifiy non-existant prop on timer');
    } else {
      if (!isNaN(+new_val)) {
        alarm_cp[prop] = Number(new_val);
      } else {
        alarm_cp[prop] = new_val;
      }
    }

    // Invoke callback
    if (!props.alarm.handleChange) {
      console.warn('Tried to call undefined callback in EditTimer');
    } else {
      props.alarm.handleChange(alarm_cp);
    }
  };

  if (props.isVisible) {
    return (
      <ScrollView>
        <Modal
          isVisible={props.isVisible}
          animationIn={'slideInDown'}
          animationOut={'slideOutUp'}>
          <View>
            <EditAlarm alarm={props.alarm} onChange={saveAlarm} />
          </View>
          <View style={modalStyle.padded}>
            <Button title="Done" onPress={props.onClose} />
          </View>
        </Modal>
      </ScrollView>
    );
  } else {
    return <View />;
  }
};

const modalStyle = StyleSheet.create({
  padded: {
    paddingTop: 20,
  },
});

export default EditModal;
