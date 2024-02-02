// index.js - MOBILE
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';

import {App} from './App';

const snapshots = false;
if(snapshots){
  require('./indexSnapshot');
}
else {
  AppRegistry.registerComponent(appName, () => App);
}
