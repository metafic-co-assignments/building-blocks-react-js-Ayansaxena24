/* App/Lib/GeneralHelpers.js */
import { Alert, Dimensions, Platform } from 'react-native';
//@ts-ignore
import _ from 'lodash';
import {
  requestMultiple,
  PERMISSIONS,
  RESULTS,
} from "react-native-permissions";

export async function requestLocationPermission() {
  try {
    if (Platform.OS === "ios") {
      const statuses = await requestMultiple([
        PERMISSIONS.IOS.LOCATION_ALWAYS,
        PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      ]);
      if (
        statuses[PERMISSIONS.IOS.LOCATION_ALWAYS] === RESULTS.GRANTED &&
        statuses[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE] === RESULTS.GRANTED
      ) {
        console.log("Location permission granted");
        return true;
      } else {
        console.log("Location permission denied");
        return false;
      }
    } else {
      const statuses = await requestMultiple([
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
      ]);
      if (
        statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] === RESULTS.GRANTED &&
        statuses[PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION] === RESULTS.GRANTED
      ) {
        console.log("Location permission granted");
        return true;
      } else {
        console.log("Location permission denied", statuses);
        return false;
      }
    }
  } catch (err) {
    console.log(err);
  }
}