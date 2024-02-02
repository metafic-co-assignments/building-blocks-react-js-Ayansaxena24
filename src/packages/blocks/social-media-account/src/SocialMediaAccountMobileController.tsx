import { runEngine } from "../../../framework/src/RunEngine";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { IBlock } from "../../../framework/src/IBlock";

import facebookController, { FacebookDelegate } from "./FacebookController";

// Customizable Area Start
// Customizable Area End
import googleMobileController, {
  GoogleMobileDelegate
} from "./GoogleMobileController";

import { googleImage, facebookImage } from "./assets";

export const configJSON = require("./config");
export const googleIcon = googleImage;
export const facebookIcon = facebookImage;

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  loading: boolean;
  isRegistration: boolean;
  // Customizable Area Start
  // Customizable Area End
}

interface SS {
  // Customizable Area Start
  // Customizable Area End
}

export default class SocialMediaAccountMobileController
  extends BlockComponent<Props, S, SS>
  implements GoogleMobileDelegate, FacebookDelegate {
  createAccountAPICallId: any;
  googleUser: any;

  constructor(props: Props) {
    super(props);
    // this.subScribedMessages = [getName(MessageEnum.RestAPIResponceMessage)];
    this.receive = this.receive.bind(this);
    runEngine.attachBuildingBlock(this as IBlock, [
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionSaveMessage)
      // Customizable Area End
    ]);

    // Customizable Area Start
    this.state = {
      loading: false,
      isRegistration: true
    };
    // Customizable Area End
  }

  facebookUserStatusChanged(userInfo: any): void {
    // Customizable Area Start
    if (this.state.isRegistration) {
      this.createAccountFromSocial(userInfo.email, userInfo.id, this.props);
    } else {
      this.logInWithSocial(
        userInfo.email,
        userInfo.email,
        userInfo.id,
        this.props
      );
    }
    // Customizable Area End
  }

  facebookLogIn() {
    facebookController.handleFacebookLogin(this, this.state.isRegistration);
  }

  googleMobileUserStatusChanged(userInfo: any): void {
    // Customizable Area Start
    if (this.state.isRegistration) {
      this.createAccountFromSocial(userInfo.email, userInfo.id, this.props);
    } else {
      this.logInWithSocial(
        userInfo.email,
        userInfo.email,
        userInfo.id,
        this.props
      );
    }
    // Customizable Area End
  }

  googleLogIn() {
    // Customizable Area Start
    const self = this;
    googleMobileController
      .handleGoogleSignIn(this, this.state.isRegistration)
      .then(
        function() {
          self.stopLoading();
          runEngine.debugLog("User SIGNED IN.");
        },
        function(error: any) {
          self.stopLoading();
          if (error.error === "popup_closed_by_user") {
            //handle window closed event
          }
        }
      );
    // Customizable Area End
  }

  startLoading = () => {
    this.setState({ loading: true });
  };

  stopLoading = () => {
    this.setState({ loading: false });
  };

  async receive(from: string, message: Message) {
    // Customizable Area Start
    this.stopLoading();

    if (getName(MessageEnum.SessionSaveMessage) === message.id) {
      this.openInfoPage();
    } else if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.createAccountAPICallId != null &&
      this.createAccountAPICallId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (responseJson && responseJson.meta && responseJson.meta.token) {
        this.saveLoggedInUserData(responseJson);
      } else if (responseJson && responseJson.errors) {
        this.parseApiErrorResponse(responseJson);
      } else {
        var errorReponse = message.getData(
          getName(MessageEnum.RestAPIResponceErrorMessage)
        );
        this.parseApiCatchErrorResponse(errorReponse);
      }

      // GoogleController.googleUser = null
    } else {
      runEngine.debugLog("GOIT");
    }

    // Customizable Area End
  }

  async createAccountFromSocial(
    incomingEmail: String,
    incomingId: String,
    props: Props
  ) {
    if (
      !incomingEmail ||
      incomingEmail.length === 0 ||
      !incomingId ||
      incomingId.length === 0
    ) {
      runEngine.debugLog("createAccountFromSocial empty info");
      return;
    }

    this.startLoading();

    const header = {
      "Content-Type": configJSON.urlHeaderTypeJSON
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.createAccountAPICallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.createAccountURL
    );

    const data = {
      type: "social_account",
      // Customizable Area Start
      // Customizable Area End
      attributes: {
        email: incomingEmail,
        password: incomingEmail,
        unique_auth_id: incomingId
        // Customizable Area Start
        // Customizable Area End
      }
    };

    const httpBody = {
      data: data
      // Customizable Area Start
      // Customizable Area End
    };

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    // Customizable Area Start
    // Customizable Area End

    requestMessage.addData(getName(MessageEnum.NavigationPropsMessage), props);

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.postHttpRequest
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  saveLoggedInUserData(responseJson: any) {
    const msg: Message = new Message(getName(MessageEnum.SessionSaveMessage));
    msg.addData(
      getName(MessageEnum.SessionResponseData),
      JSON.stringify(responseJson)
    );
    msg.addData(
      getName(MessageEnum.SessionResponseToken),
      responseJson.meta.token
    );

    this.send(msg);
  }

  async logInWithSocial(
    incomingEmail: string,
    incomingPassword: string,
    incomingId: string,
    props: Props
  ) {
    if (
      !incomingEmail ||
      incomingEmail.length === 0 ||
      !incomingId ||
      incomingId.length === 0
    ) {
      runEngine.debugLog("createAccountFromSocial empty info");
      return;
    }

    this.startLoading();

    const header = {
      "Content-Type": "application/json"
    };

    const attrs = {
      email: incomingEmail,
      password: incomingPassword,
      unique_auth_id: incomingId
    };

    const data = {
      type: "social_account",
      attributes: {
        email: incomingEmail,
        password: incomingEmail,
        unique_auth_id: incomingId
      }
    };

    const httpBody = {
      data: data
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.createAccountAPICallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.loginAccountURL
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    requestMessage.addData(getName(MessageEnum.NavigationPropsMessage), props);

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      "POST"
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  navigate() {
    runEngine.debugLog("this.isRegistration");
    runEngine.debugLog(this.state.isRegistration);
    if (this.state.isRegistration) {
      runEngine.debugLog("Registration");
      runEngine.debugLog(this.state.isRegistration);
      this.navigateToSignup();
    } else {
      runEngine.debugLog("Login");
      runEngine.debugLog(this.state.isRegistration);
      this.navigateToLogin();
    }
  }

  navigateToSignup() {
    const msg: Message = new Message(
      getName(MessageEnum.NavigateEmailSignUpMessage)
    );
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msg);
  }

  navigateToLogin() {
    const msg: Message = new Message(
      getName(MessageEnum.NavigationEmailLogInMessage)
    );
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msg);
  }

  openInfoPage() {
    const msg = new Message(
      getName(
        this.state.isRegistration
          ? MessageEnum.AccoutResgistrationSuccess
          : MessageEnum.AccoutLoginSuccess
      )
    );
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msg);
  }

  btnFacebookLogInProps = {
    onPress: () => this.facebookLogIn()
  };

  btnGoogleLogInProps = {
    onPress: () => this.googleLogIn()
  };

  btnNavigateProps = {
    onPress: () => this.navigate()
  };
}
