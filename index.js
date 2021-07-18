/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {register} from '@videosdk.live/react-native-sdk';

// Register the service
register();

AppRegistry.registerComponent(appName, () => App);
