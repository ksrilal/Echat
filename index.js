/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import Setup from './Setup';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => Setup);
