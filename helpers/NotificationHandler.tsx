// From https://github.com/zo0r/react-native-push-notification/blob/master/example/NotificationHandler.js
// Implementation of Push Notifications that auto-configures notifications.

import { Platform } from 'react-native';
import PushNotification from 'react-native-push-notification';

class NotificationHandler {
  _onNotification(notification) {
    console.log('NotificationHandler:', notification);

    if (typeof this._onNotification === 'function') {
      this._onNotification(notification);
    }
  }

  _onRegister(token) {
    console.log('NotificationHandler:', token);

    if (typeof this._onRegister === 'function') {
      this._onRegister(token);
    }
  }

  _onAction(token) {
    if (token.action === 'Dismiss')
    {
      console.log('Clearing notification ' + token.id);
      PushNotification.clearLocalNotification(token.id);

      //PushNotification.cancelAllLocalNotifications();
    }
  }

  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError(err) {
    console.log(err);
  }
  
  attachRegister(handler) {
    this._onRegister = handler;
  }

  attachNotification(handler) {
    this._onNotification = handler;
  }

  attachAction(handler) {
    this._onAction = handler;
  }
}

const handler = new NotificationHandler();

PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: handler._onRegister.bind(handler),

  // (required) Called when a remote or local notification is opened or received
  onNotification: handler._onNotification.bind(handler),

  // (optional) Called when Action is pressed (Android)
  onAction: handler._onAction.bind(handler),

  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError: handler.onRegistrationError.bind(handler),

  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   */
  requestPermissions: Platform.OS === 'ios',
});

export default handler;