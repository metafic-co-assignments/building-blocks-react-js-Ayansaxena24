import { runEngine } from "../../../framework/src/RunEngine";

import {
  GoogleSignin,
  statusCodes
} from "@react-native-community/google-signin";

export class GoogleMobileDelegate {
  googleMobileUserStatusChanged(userInfo: any, isRegistration: boolean): void {}
}

class GoogleMobileController {
  googleUserInfo: any;
  delegateClass: GoogleMobileDelegate;

  static instance = new GoogleMobileController();

  constructor() {
    this.delegateClass = new GoogleMobileDelegate();
    this.configureGoogleSignin();
    this.handleGoogleSignIn = this.handleGoogleSignIn.bind(this);
  }

  // GooGle MOBILE Methods
  configureGoogleSignin() {
    GoogleSignin.configure({
      //It is mandatory to call this method before attempting to call signIn()
      scopes: ["profile", "email"],
      offlineAccess: false
    });
  }

  handleGoogleSignIn(delegateClass: any, isRegistration: boolean) {
    GoogleMobileController.instance.delegateClass = delegateClass;
    return this.signIn(isRegistration);
  }

  signIn = (isRegistration: boolean) => {
    return new Promise(async (resolve, reject) => {
      try {
        await GoogleSignin.hasPlayServices({
          //Check if device has Google Play Services installed.
          //Always resolves to true on iOS.
          showPlayServicesUpdateDialog: true
        });

        // call resolve if the method succeeds

        const userInfo = await GoogleSignin.signIn();
        GoogleMobileController.instance.googleUserInfo = {
          email: userInfo.user.email,
          id: userInfo.user.id
        };
        GoogleMobileController.instance.delegateClass.googleMobileUserStatusChanged(
          GoogleMobileController.instance.googleUserInfo,
          isRegistration
        );
        return resolve(true);
      } catch (error) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          runEngine.debugLog(statusCodes.SIGN_IN_CANCELLED);
        } else if (error.code === statusCodes.IN_PROGRESS) {
          // operation (e.g. sign in) is in progress already
          runEngine.debugLog(error);
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          // play services not available or outdated
          runEngine.debugLog(statusCodes.PLAY_SERVICES_NOT_AVAILABLE);
        } else {
          // some other error happened
          runEngine.debugLog("something went wrong!");
        }
        return reject(error);
      }
    });
  };
}

const googleMobileController = new GoogleMobileController();
export default googleMobileController;
