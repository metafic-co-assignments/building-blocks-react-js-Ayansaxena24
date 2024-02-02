import { runEngine } from "../../../framework/src/RunEngine";

//@ts-ignore
import { gapi } from "gapi-script";

const configJSON = require("./config");

export class GoogleWebDelegate {
  googleUserStatusChanged(userInfo: any, isRegistration: boolean): void {}
}

class GoogleWebController {
  googleUser: any;
  googleUserInfo: any;
  delegateClass: GoogleWebDelegate;

  static instance = new GoogleWebController();

  constructor() {
    this.loadAuth2();
    this.googleLogIn = this.googleLogIn.bind(this);
    this.updateGoogleUser = this.updateGoogleUser.bind(this);
  }

  ///////////////////////////////////
  // GooGle DESKTOP Methods
  loadAuth2() {
    //@ts-ignore
    window.gapi.load("auth2", () => {
      //@ts-ignore
      window.gapi.auth2.init({ client_id: configJSON.clientID });
    });
  }

  signinChanged(val: any) {
    runEngine.debugLog("Signin state changed to ", val);
  }

  userChanged(user: any, isRegistration: boolean) {
    runEngine.debugLog("USER NOW: ", user);
    if (GoogleWebController.instance.updateGoogleUser(user)) {
      GoogleWebController.instance.delegateClass.googleUserStatusChanged(
        GoogleWebController.instance.googleUserInfo,
        isRegistration
      );
    }
  }

  googleLogIn(delegateClass: any) {
    try {
      const auth2 = gapi.auth2.getAuthInstance();

      GoogleWebController.instance.googleUser = null;
      GoogleWebController.instance.delegateClass = delegateClass;
      // Listen for sign-in state changes.
      auth2.isSignedIn.listen(GoogleWebController.instance.signinChanged);
      //@ts-ignore
      auth2.currentUser.listen(GoogleWebController.instance.userChanged);

      return auth2.signIn();
    } catch (error) {
      runEngine.debugLog(error);
    }
  }

  updateGoogleUser(googleUser: any) {
    if (googleUser && googleUser !== GoogleWebController.instance.googleUser) {
      GoogleWebController.instance.googleUser = googleUser;
      var auth2 = gapi.auth2.getAuthInstance();

      var profile = auth2.currentUser.get().getBasicProfile();

      if (profile) {
        var userEmail = profile.getEmail();
        var userId = profile.getId();
        runEngine.debugLog(userEmail + "_______" + userId);

        GoogleWebController.instance.googleUserInfo = {
          email: userEmail,
          id: userId
        };

        return true;
      }
    }

    return false;
  }
}

const googleController = new GoogleWebController();
export default googleController;
