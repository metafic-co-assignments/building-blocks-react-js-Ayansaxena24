/* App/Lib/GeneralHelpers.js */
import { Alert, Dimensions, Platform } from 'react-native';
//@ts-ignore
import _ from 'lodash';

import StorageProvider from './StorageProvider';

export function getOS(): string {
  return Platform.OS;
}

/**
 * SCALING - SAME VIEW FOR TABLET AND IPHONE ADDED THIS SCALE IN HEIGHT, WIDTH, MARGIN, PADDING
 */
const {width, height, scale: deviceScale, fontScale} = Dimensions.get('window');
const baseWidth = 360;
const baseHeight = 700;

const scaleWidth = width / baseWidth;
const scaleHeight = height / baseHeight;
const scale = Math.min(scaleWidth, scaleHeight);

// const storageProvider = require('./StorageProvider');

export const scaleRatio = deviceScale;
export const deviceWidth = width;
export const deviceHeight = height;
export const deviceAspectRatio = width / height;
export const scaledSize = (size:any) => Math.ceil(size * scale);
export const widthFromPercentage = (per:number) => (width * per) / 100;
export const heightFromPercentage = (per:number) => (height * per) / 100;


function calcZoom(longitudeDelta:any) {
  // Omit rounding intentionally for the example
  return Math.log(360 / longitudeDelta) / Math.LN2;
}

function calcLongitudeDelta(zoom:any) {
  var power = Math.log2(360) - zoom;
  return Math.pow(2, power);
}

export const calculateDelta = () => {
  // Initial values
  var latitudeDelta = 0.004757;
  var longitudeDelta = 0.006866;

  var coef = latitudeDelta / longitudeDelta; // always the same no matter your zoom

  // Find zoom level
  var zoomLvlCalculated = calcZoom(longitudeDelta);
  //console.log(zoomLvlCalculated); // 15.678167523696594

  // Find longitudeDelta based on the found zoom  
  var longitudeDeltaCalculated = calcLongitudeDelta(zoomLvlCalculated); // 0.006865999999999988 which is the same like the initial longitudeDelta, if we omit the floating point calc difference
  //console.log('longitudeDeltaCalculated', longitudeDeltaCalculated);

  // Find the latitudeDelta with the coefficient
  var latitudeDeltaCalculated = longitudeDeltaCalculated * coef; //0.004756999999999992 which is the same like the initial latitudeDelta, if we omit the floating point calc difference
  //console.log('latitudeDeltaCalculated', latitudeDeltaCalculated);
  return {
    latitudeDelta: latitudeDeltaCalculated,
    longitudeDelta: longitudeDeltaCalculated
  }
}

/**
 * CHECKS IF THE PASSED VALUE IS EMPTY STRING OR NOT
 * RETURN `true` IF STRING IS EMPTY ELSE RETURN `false`
 */
export function isEmpty(val: any): boolean {
  let isValEmpty = true;
  if (!_.isNil(val) && _.trim(String(val)).length > 0) {
    isValEmpty = false;
  }
  return isValEmpty;
}

/**
 * CHECKS IF THE PASSED VALUE IS VALID EMAIL
 * RETURN `true` IF VALID ELSE RETURN `false`
 */
export function isEmail(fieldName: string, val: string) {
  //const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const emailReg = new RegExp("[^@]+[@][\\S]+[.][\\S]+");

  if (isEmpty(val)) {
    return { status: false, message: `Email address field cannot be empty.` };
  } else if (!emailReg.test(val)) {
    return { status: false, message: `Invalid email address.` };
  }
  return { status: true, message: "" };
}

/* To handle phone validation */
export function phoneValidate(fieldName: string, value: any) {
  console.log('phoneValidate');
  //const phoneRegex = /^962[0-9]{8,9}$/;
  //const phoneRegex = /^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,3})|(\(?\d{2,3}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/;
  const phoneRegex = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  if (value === "" || value === undefined || value === null) {
    return { status: false, message: `The ${fieldName} field cannot be left blank.` };
  } else if (!phoneRegex.test(value)) {
    return {
      status: false,
      message: `Please enter valid ${fieldName}`
    };
  }

  return { status: true, message: "" };
}

export function confirmPasswordValidate(
  fieldName: string,
  confirmPassword: string,
  fieldName2: string = 'password',
  password: string = ''
) {
  //const phoneRegex = /^962[0-9]{8,9}$/;
  if (confirmPassword === "" || confirmPassword === undefined || confirmPassword === null) {
    return { status: false, message: `The ${fieldName} field cannot be left blank.` };
  } else if (password && password !== confirmPassword) {
      return {
        status: false,
        message: `The ${fieldName} should be same as ${fieldName2}`
      };
  }

  return { status: true, message: "" };
}

export function passwordValidate(fieldName: string, password: string = '') {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (password === "" || password === undefined || password === null) {
    return { status: false, message: `The ${fieldName} field cannot be left blank.` };
  } else if (!passwordRegex.test(password)) {
      return {
        status: false,
        message: `The ${fieldName} should contain atleast 8 letters, one uppercase and one special character.`
      };
  }

  return { status: true, message: "" };
}

/* To handle required validation */
export function requireValidate(fieldName: string, value: any, isBool: boolean = false) {
  if (isBool) {
    if (value) {
      return { status: true, message: "" };
    }
    return { status: false, message: "" };
  }
  if (value === "" || value === undefined || value === null) {
    if (fieldName === "lmsUrl") {
      return { status: false, message: `Please select ${fieldName}` };
    }
    else {
      return { status: false, message: `The ${fieldName} field cannot be left blank.` };
    }
  }
  return { status: true, message: "" };
}

export const customAlert = (title:string = "", message:string = "", okOnPress:Function|any = null, cancelOnPress:Function|any = null) => {
  const buttons:Array<any> = [];
  cancelOnPress ? buttons.push({text: 'Cancel', onPress: () => cancelOnPress, style: 'cancel'}) : "";
  okOnPress ? buttons.push({text: 'OK', onPress: () => okOnPress}) : buttons.push({text: 'OK', onPress: () => console.log('Ok Pressed')})
  return(
    Alert.alert(
      title,
      message,
      buttons
    )
  );
}

export async function setStorageData(key:string, data:any){
  if (key && data) {
    await StorageProvider.set(key, data);
  }
}

export async function getStorageData(key:string, parseToJson:boolean = false){
  if (StorageProvider && key) {
    const data = await StorageProvider.get(key) || null;
    if(parseToJson && data){
      return JSON.parse(data)
    }else{
      return data;
    }
  }
  return null;
}

export async function removeStorageData(key:string){
  if (StorageProvider && key) {
    await StorageProvider.remove(key);
  }
}

export async function logoutUser(logoutType: string = '') {
  console.log('logoutUser');
  if (StorageProvider) {
    await removeStorageData('authToken');
    await removeStorageData('profileData');
    await removeStorageData('deviceToken');
    await removeStorageData('role');
    await removeStorageData('catalogListData');
  }
  //NavigationService.resetTo('primaryStack', { screen: 'Login' });
  if(logoutType == 'force'){
    customAlert('Session expired', 'Your session has expired. Please login again to continue.');
    setTimeout(() => {resetTo('primaryStack', { screen: 'EmailAccountLoginBlock' })},2000);
  }else{
    resetTo('primaryStack', { screen: 'EmailAccountLoginBlock' });
  }
}

// export function isEmpty(val: any): boolean {
export async function fetchImageUrl(url:any): Promise<string>{
  let imgUrl = await fetch(url)
    .then(function (response) {
      console.log("console -> response", response);
      if (!response.ok) {
        console.log("Rewrite error handling - Draft code");
        return url;
      }
      let responseJson = response.json();
      console.log("console -> responseJson", responseJson);
      response.json().then(function (data) {
        console.log("console -> data", data);
        return data.media_details.sizes.medium_large.source_url
      })
    })
    .catch(function (error) {
      return url;
    });
  return imgUrl;
}

/** 
 * Navigation Services Helper
 * */
let _navigator:any;

export function setNavigator(nav:any) {
  _navigator = nav;
}

// Gets the current screen from navigation state
export function getActiveRouteName(state:any):any {
  const route = state.routes[state.index];

  if (route.state) {
    // Dive into nested navigators
    return getActiveRouteName(route.state);
  }

  return route.name;
}

export function resetTo(routeName:any, params:object = {}) {
  _navigator.reset({
    index: 0,
    routes: [{ name: routeName, params }],
  });
}
/** Navigation Services Helper Ends*/