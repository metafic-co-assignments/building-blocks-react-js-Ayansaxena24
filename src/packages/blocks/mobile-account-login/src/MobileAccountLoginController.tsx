import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import { runEngine } from "../../../framework/src/RunEngine";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";

// Customizable Area Start
import { imgPasswordInVisible, imgPasswordVisible } from "./assets";
// Customizable Area End

const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  password: string;
  countryCodeSelected: string;
  mobileNo: string;
  enablePasswordField: boolean;
  checkedRememberMe: boolean;

  placeHolderCountryCode: string;
  placeHolderMobile: string;
  placeHolderPassword: string;
  imgPasswordVisible: any;
  imgPasswordInVisible: any;
  labelHeader: string;
  btnTxtLogin: string;
  labelRememberMe: string;
  btnTxtSocialLogin: string;
  labelOr: string;
  labelForgotPassword: string;
  btnTxtEmailLogin: string;
  // Customizable Area End
}

interface SS {
  // Customizable Area Start
  id: any;
  // Customizable Area End
}

export default class MobileAccountLoginController extends BlockComponent<
  Props,
  S,
  SS
> {

  // Customizable Area Start
  apiPhoneLoginCallId: any;
  labelTitle: string;
  private readonly errorTitle = "Error";
  // Customizable Area End    

  constructor(props: Props) {
    super(props);

    // Customizable Area Start
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      getName(MessageEnum.CountryCodeMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.ReciveUserCredentials)
    ];

    this.state = {
      countryCodeSelected: "",
      mobileNo: "",
      password: "",
      placeHolderCountryCode: "Select Country",
      enablePasswordField: true,
      checkedRememberMe: false,

      placeHolderMobile: configJSON.placeHolderMobile,
      placeHolderPassword: configJSON.placeHolderPassword,
      imgPasswordVisible: imgPasswordVisible,
      imgPasswordInVisible: imgPasswordInVisible,
      labelHeader: configJSON.labelHeader,
      btnTxtLogin: configJSON.btnTxtLogin,
      labelRememberMe: configJSON.labelRememberMe,
      btnTxtSocialLogin: configJSON.btnTxtSocialLogin,
      labelOr: configJSON.labelOr,
      labelForgotPassword: configJSON.labelForgotPassword,
      btnTxtEmailLogin: configJSON.btnTxtEmailLogin
    };

    this.labelTitle = configJSON.labelTitle;
    // Customizable Area End

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    super.componentDidMount();
    // Customizable Area Start
    this.send(new Message(getName(MessageEnum.RequestUserCredentials)));
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (getName(MessageEnum.ReciveUserCredentials) === message.id) {
      const countryCode = message.getData(
        getName(MessageEnum.LoginCountryCode)
      );

      const userName = message.getData(getName(MessageEnum.LoginUserName));

      const password = message.getData(getName(MessageEnum.LoginPassword));

      if (countryCode && userName && password) {
        this.setState({
          mobileNo: userName,
          placeHolderCountryCode: "+" + countryCode,
          countryCodeSelected: countryCode,
          password: password,
          checkedRememberMe: true
        });
      }
    } else if (getName(MessageEnum.CountryCodeMessage) === message.id) {
      var selectedCode = message.getData(
        getName(MessageEnum.CountyCodeDataMessage)
      );

      if (selectedCode !== undefined) {
        this.setState({
          countryCodeSelected:
            selectedCode.indexOf("+") > 0
              ? selectedCode.split("+")[1]
              : selectedCode
        });
      }
    }

    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.apiPhoneLoginCallId !== null &&
      this.apiPhoneLoginCallId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.apiPhoneLoginCallId = null;

      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      var errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );

      if (responseJson && responseJson.meta && responseJson.meta.token) {
        runEngine.unSubscribeFromMessages(this, this.subScribedMessages);
        //Need To send Login token message to save for future call
        this.saveLoggedInUserData(responseJson);
        this.sendLoginSuccessMessage();
        this.openInfoPage();
      } else {
        //Check Error Response
        this.sendLoginFailMessage();
        this.parseApiErrorResponse(responseJson);
      }

      this.parseApiCatchErrorResponse(errorReponse);
    }
    // Customizable Area End
  }

   // Customizable Area Start
  sendLoginFailMessage() {
    const msg: Message = new Message(getName(MessageEnum.LoginFaliureMessage));
    this.send(msg);
  }
  sendLoginSuccessMessage() {
    const msg: Message = new Message(getName(MessageEnum.LoginSuccessMessage));

    msg.addData(getName(MessageEnum.LoginUserName), this.state.mobileNo);

    msg.addData(
      getName(MessageEnum.LoginCountryCode),
      this.state.countryCodeSelected
    );

    msg.addData(getName(MessageEnum.LoginPassword), this.state.password);
    msg.addData(
      getName(MessageEnum.LoginIsRememberMe),
      this.state.checkedRememberMe
    );

    this.send(msg);
  }

  saveLoggedInUserData(responseJson: any) {
    if (responseJson && responseJson.meta && responseJson.meta.token) {
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
  }

  openInfoPage() {
    const msg: Message = new Message(getName(MessageEnum.AccoutLoginSuccess));

    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);

    this.send(msg);
  }

  goToForgotPassword() {
    const msg: Message = new Message(
      getName(MessageEnum.NavigationForgotPasswordMessage)
    );
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    msg.addData(getName(MessageEnum.NavigationForgotPasswordPageInfo), "sms");
    this.send(msg);
  }

  goToSocialLogin() {
    const msg: Message = new Message(
      getName(MessageEnum.NavigationSocialLogInMessage)
    );
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msg);
  }

  goToEmailLogin() {
    const msg: Message = new Message(
      getName(MessageEnum.NavigationEmailLogInMessage)
    );
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msg);
  }

  doMobileLogIn(): boolean {
    if (
      this.state.countryCodeSelected === null ||
      this.state.countryCodeSelected.length === 0
    ) {
      this.showAlert(
        configJSON.errorTitle,
        configJSON.errorCountryCodeNotSelected
      );
      return false;
    }

    if (this.state.mobileNo === null || this.state.mobileNo.length === 0) {
      this.showAlert(configJSON.errorTitle, configJSON.errorMobileNoNotValid);
      return false;
    }

    if (this.state.password === null || this.state.password.length === 0) {
      this.showAlert(configJSON.errorTitle, configJSON.errorPasswordNotValid);
      return false;
    }

    const header = {
      "Content-Type": configJSON.loginApiContentType
    };

    const attrs = {
      full_phone_number: this.state.countryCodeSelected + this.state.mobileNo,
      password: this.state.password
    };

    const data = {
      type: "sms_account",
      attributes: attrs
    };

    const httpBody = {
      data: data
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.apiPhoneLoginCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.loginAPiEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.loginAPiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  }
  // Customizable Area End
}
