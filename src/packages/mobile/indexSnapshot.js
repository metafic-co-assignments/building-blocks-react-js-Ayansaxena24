/* @flow */
import React from 'react';
import {
  Platform,
} from 'react-native';


import {
  registerSnapshot,
  runSnapshots,
  Snapshot,
} from 'pixels-catcher';

import { name as appName } from './app.json';

import HomeScreen from '../components/src/HomeScreen'
// import App from './App';

const navigation = require("react-navigation")

const screenProps = {
    navigation: navigation,
    id: "HomeScreen"
  }


const baseUrl = Platform.select({ // Put real IP of your server to run on real device
  android: 'http://10.0.2.2:3000',
  ios: 'http://127.0.0.1:3010'
});

registerSnapshot(class SnapshotClass extends Snapshot {
    
  static snapshotName = 'HomeScreen';
  
  // override default componentDidMount from Snapshot to delay it
  componentDidMount() {   
    let self = this;
      setTimeout(function(){ self.props.onReady() }, 1000);
  }

  renderContent() {

    return (
      <HomeScreen {...screenProps}/>
    );
  }
});

runSnapshots(appName, { baseUrl });