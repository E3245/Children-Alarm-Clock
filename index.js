/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import Clock from './components/Clock'
import {name as appName} from './app.json';
import 'react-native-gesture-handler';

AppRegistry.registerComponent(appName, () => App);
