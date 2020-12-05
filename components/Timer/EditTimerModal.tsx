import React from 'react';
import {Button, ScrollView, StyleSheet} from 'react-native';
import {View} from '../stylesheet';
import Modal from 'react-native-modal';
import EditTimer from './EditTimer';
import {TimerProps} from '../Timer/Timer';

type EditModalProps = {
  timer: TimerProps;
  isVisible: boolean;
  onClose: () => void;
};

const EditModal = (props: EditModalProps) => {
  // Make a new timer based on the changed value, and call the callback to notify parent
  const saveTimer = (prop: string, new_val: any) => {
    let timer_cp = props.timer;
    console.log(prop);
    console.log(timer_cp);
    if (!(prop in timer_cp)) {
      console.log('Tried to modifiy non-existant prop on timer');
      timer_cp[prop] = new_val;
    } else {
      if (!isNaN(+new_val)) {
        timer_cp[prop] = Number(new_val);
      } else {
        timer_cp[prop] = new_val;
      }
    }

    // Invoke callback
    if (!props.timer.handleChange) {
      console.warn('Tried to call undefined callback in EditTimer');
    } else {
      props.timer.handleChange(timer_cp);
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
            <EditTimer timer={props.timer} onChange={saveTimer} />
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
