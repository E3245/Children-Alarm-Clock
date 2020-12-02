import React from 'react';
import {View, Button} from 'react-native';
import {
  isTimePast,
  formatLocalTime,
  getNextOccurence,
} from '../../helpers/time';
import {styles} from '../stylesheet';
import Svg, {Text, Rect} from 'react-native-svg';
import NotifService, {
  NOTIFICATION_CHANNEL_ALARM,
} from '../../helpers/NotificationService';

export type AlarmProps = {
  // Indexing for modification with arbitrary edit functions
  [key: string]: any;
  // The end date of the alarm
  endHour: number;
  endMinute: number;
  nextEndTime: number;
  name: string;
  color: string;
  uuid: string;
  handleChange?: (newAlarm: AlarmProps) => void;
  enabled: boolean;
  hideButtons?: boolean;
};

// Misc Properties
type OtherProps = {
  name: string;
  imagePath: string;
};

export class AlarmComponentSimple extends React.Component<AlarmProps> {
  state = {
    isEnabled: false,
    nextEndTime: 0,
    NotifID: -1, // Notifications
  };

  // The id for the interval that ticks every second
  private intervalID: any;
  notif: NotifService;

  /* Notifications */
  onRegister(token: any) {
    this.setState({registerToken: token.token});
  }

  onNotification(_token: any) {
    //Do nothing
  }

  constructor(props: AlarmProps) {
    super(props);
    this.state.isEnabled = props.enabled;
    if (!this.props.nextEndTime || this.props.nextEndTime === 0) {
      this.state.nextEndTime = getNextOccurence(
        new Date(Date.now()),
        this.props.endHour,
        this.props.endMinute,
      ).getTime();
    } else {
      this.state.nextEndTime = props.nextEndTime;
    }

    /* Notifications */
    this.notif = new NotifService(
      this.onRegister.bind(this),
      this.onNotification.bind(this),
    );
  }

  handleToggle = () => {
    if (this.state.isEnabled) {
      this.stop();
    } else {
      this.start();
    }
  };

  componentDidUpdate(prevProps: any, prevState: any) {
    if (
      prevProps.endHour !== this.props.endHour ||
      prevProps.endMinute !== this.props.endMinute
    ) {
      this.stop();
      this.save();
    }
    if (prevState !== this.state) {
      // Only save when the component updates the things we acutally save
      this.save();
    }
  }

  componentDidMount() {
    if (this.state.isEnabled) {
      this.intervalID = setInterval(() => this.tick(), 1000);
    }
  }

  tick() {
    if (!this.state.isEnabled) {
      console.log('Alarm tried to tick while stopped');
      return;
    }

    // Check if the clock should stop
    if (isTimePast(this.props.nextEndTime)) {
      console.log('Alarm Ended!');
      // Force the render time to read 0
      this.setState({isEnabled: false});
      // Stop the ticking
      clearInterval(this.intervalID);
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  start() {
    console.log('Start');
    this.setState(
      {
        isEnabled: true,
        nextEndTime: getNextOccurence(
          new Date(Date.now()),
          this.props.endHour,
          this.props.endMinute,
        ).getTime(),
      },
      () => {
        this.intervalID = setInterval(() => {
          this.tick();
        }, 100);
      },
    );

    //Check permission and create notification, if applicable
    this.notif.checkPermission(this._HandleNotificationsFn.bind(this));
  }

  stop() {
    console.log('Stop');
    // Save the time remaining on the timer
    this.setState({
      isEnabled: false,
      nextEndTime: getNextOccurence(
        new Date(Date.now()),
        this.props.endHour,
        this.props.endMinute,
      ).getTime(),
    });
    clearInterval(this.intervalID);

    // Clear the notification from the Service
    this.notif.cancelSpecificNotif(this.state.NotifID);
  }

  // Call the parent to save the data
  save = () => {
    console.log('SAVE');
    // Values that may have changed
    // running
    // remainingtime
    let alarm = {...this.props};
    alarm.enabled = this.state.isEnabled;
    alarm.nextEndTime = this.state.nextEndTime;
    if (!this.props.handleChange) {
      console.error('Tried to save a alarm that had no callback function');
    } else {
      this.props.handleChange(alarm);
    }
  };

  /* NOTIFICATIONS BEGIN */

  // Check permission, and if the app has permission, go forward with the notification
  // Else silently fail
  _HandleNotificationsFn = (perms: any) => {
    if (perms.alert === true) {
      let ID: number; //Create temporary variable

      // Create the notification and store the return value to the temp variable
      ID = this.notif.scheduleNotificationTimer(
        NOTIFICATION_CHANNEL_ALARM,
        'green',
        this.props.name,
        '',
        formatLocalTime(new Date(this.state.nextEndTime)),
        '',
        '',
        '',
        new Date(this.state.nextEndTime),
        'sample.mp3',
      );
      console.log('Got ID ' + ID);
      this.setState({NotifID: ID});
    }
  };
  /* NOTIFICATIONS END */

  render = () => {
    return (
      <View style={styles.TimerContainer}>
        <View style={styles.TimerSVG}>
          <Svg width="100%" height="100%" viewBox="0 0 250 80">
            <Rect
              x="0"
              y="0"
              rx="10"
              ry="10"
              width="100%"
              height="100%"
              // stroke="black"
              fill={this.props.color}
              transform="translate(0,0)"
            />
            <Text
              fill="black"
              stroke="black"
              fontSize="300%"
              fontWeight="bold"
              x="50%"
              y="50%"
              textAnchor="middle">
              {formatLocalTime(new Date(this.state.nextEndTime))}
            </Text>
            <Text
              fill="black"
              stroke="black"
              fontSize="200%"
              x="50%"
              y="90%"
              textAnchor="middle">
              {this.props.name}
            </Text>
          </Svg>
        </View>
        {this.props.hideButtons ? (
          <></>
        ) : (
          <View style={styles.centered}>
            <View>
              <Button
                title={this.state.isEnabled ? 'Disable' : 'Enable'}
                onPress={this.handleToggle}
              />
            </View>
          </View>
        )}
      </View>
    );
  };
}
