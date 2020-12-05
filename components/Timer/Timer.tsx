import React from 'react';
import {View, Button, Alert} from 'react-native';
import {getTimeTo, isTimePast, formatTime} from '../../helpers/time';
import {styles} from '../stylesheet';
import Svg, {Text, Rect, Image} from 'react-native-svg';
import NotifService, {
  NOTIFICATION_CHANNEL_TIMER,
} from '../../helpers/NotificationService';

export type TimerProps = {
  // Indexing for modification with arbitrary edit functions
  [key: string]: any;
  // The amount of time the timer will run for when reset
  amountTime: number;
  name: string;
  color: string;
  uuid: string;
  handleChange?: (newTimer: TimerProps) => void;
  // The time remaining on the timer in milliseconds (if it is currently stopped)
  // The time the timer will end at in ms since epoch (if it is currently running)
  // This var stores different values depending on the running boolean
  time: number;
  running: boolean;
  hideButtons?: boolean;
  imageURI?: string;
};

// Misc Properties
type OtherProps = {
  name: string;
  imagePath: string;
};

// How to use this component
// <Timer endTime={new Date(1602612000)} />

export class TimerComponentSimple extends React.Component<TimerProps> {
  state = {
    timeState: -1,
    isRunning: false,
    renderTime: -1,
    NotifID: -1, // Notifications
  };

  // The id for the interval that ticks every second
  private intervalID: any;
  notif: NotifService;

  /* Notifications */
  onRegister(token) {
    this.setState({registerToken: token.token});
  }

  onNotification(token) {
    //Do nothing
  }

  constructor(props: TimerProps) {
    super(props);
    this.state.timeState = props.time;
    this.state.isRunning = props.running;
    this.reset = this.reset.bind(this);

    // Set the render time based on isRunning and if the time var is in the past
    if (props.running && isTimePast(props.time)) {
      this.state.renderTime = 0;
    } else if (props.running) {
      this.state.renderTime = getTimeTo(props.time);
    } else {
      // In this case the timer is stopped and time is storing the remaining time
      this.state.renderTime = props.time;
    }

    /* Notifications */
    this.notif = new NotifService(
      this.onRegister.bind(this),
      this.onNotification.bind(this),
    );
  }

  handleToggle = () => {
    // Check if we should reset instead of toggle
    if (this.state.timeState === 0) {
      this.reset();
      return;
    }

    if (this.state.isRunning) {
      this.stop();
    } else {
      this.start();
    }
  };

  componentDidUpdate(prevProps: any, prevState: any) {
    // Only save when the component updates the things we acutally save
    if (prevProps.amountTime !== this.props.amountTime) {
      this.reset();
    }

    if (
      this.state.isRunning !== prevState.isRunning ||
      this.state.timeState !== prevState.timeState
    ) {
      this.save();
    }
  }

  componentDidMount() {
    if (this.state.isRunning) {
      this.intervalID = setInterval(() => this.tick(), 1000);
    }
  }

  tick() {
    if (!this.state.isRunning) {
      console.log('Timer tried to tick while stopped');
      return;
    }

    // Check if the clock should stop
    if (isTimePast(this.state.timeState)) {
      console.log('Timer Ended!');
      // Force the render time to read 0
      this.setState({renderTime: 0, isRunning: false, timeState: 0});
      // Stop the ticking
      clearInterval(this.intervalID);
    } else {
      this.setState({renderTime: getTimeTo(this.state.timeState)});
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  start() {
    console.log('Start');
    // Save the time that the timer will end at
    this.setState({
      isRunning: true,
      timeState: Date.now() + this.state.timeState,
    });

    this.intervalID = setInterval(() => {
      this.tick();
    }, 100);

    //Check permission and create notification, if applicable
    this.notif.checkPermission(this._HandleNotificationsFn.bind(this));
  }

  stop() {
    console.log('Stop');
    // Save the time remaining on the timer
    this.setState({
      isRunning: false,
      timeState: getTimeTo(this.state.timeState),
    });

    clearInterval(this.intervalID);

    // Clear notification
    this.notif.cancelSpecificNotif(this.state.NotifID);
  }

  reset() {
    console.log('Reset');
    this.setState({
      isRunning: false,
      renderTime: this.props.amountTime,
      timeState: this.props.amountTime,
    });
    clearInterval(this.intervalID);

    // Clear notification
    this.notif.cancelSpecificNotif(this.state.NotifID);
  }

  // Call the parent to save the data
  save = () => {
    console.log('SAVE');
    // Values that may have changed
    // running
    // remainingtime
    let timer = {...this.props};
    timer.running = this.state.isRunning;
    timer.time = this.state.timeState;
    if (!this.props.handleChange) {
      console.error('Tried to save a timer that had no callback function');
    } else {
      this.props.handleChange(timer);
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
        NOTIFICATION_CHANNEL_TIMER,
        'green',
        this.props.name,
        '',
        '',
        '',
        '',
        '',
        new Date(this.state.timeState),
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
              {formatTime(new Date(this.state.renderTime))}
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
            {this.props.imageURI ? (
              <Image
                x="2%"
                y="5%"
                width="18%"
                height="90%"
                preserveAspectRatio="xMidYMid slice"
                opacity="1"
                href={{
                  uri: this.props.imageURI,
                }}
              />
            ) : (
              <></>
            )}
          </Svg>
        </View>
        {this.props.hideButtons ? (
          <></>
        ) : (
          <View style={styles.centered}>
            <View>
              <Button title={'Reset'} onPress={this.reset} />
              {this.state.renderTime !== 0 ? (
                <Button
                  title={this.state.isRunning ? 'Stop' : 'Start'}
                  onPress={this.handleToggle}
                />
              ) : (
                <></>
              )}
            </View>
          </View>
        )}
      </View>
    );
  };
}
