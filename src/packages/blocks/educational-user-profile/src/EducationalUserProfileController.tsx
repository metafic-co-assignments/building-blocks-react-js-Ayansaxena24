import React from "react";

// Customizable Area Start
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  isVisible: boolean;
  apiToken: any;
  newValue: string;
  educationQualification: string[];
  projectList: string[];
  modalProject: any;
  awardList: any;
  patentList: any;
  loadingEQ: boolean;
  activeTab: number;
  loadingProject: boolean;
  loadingAwards: boolean;
  loadingPub: boolean;
  isModalOpen: boolean;
  modalItem: any;
  // Customizable Area End
}

interface SS {
  // Customizable Area Start
  id: any;
  // Customizable Area End
}

export default class EducationalUserProfileController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  labelTitle: string = "";
  getEducationCallId: string = "";
  getProjectCallId: string = "";
  getAwardsCallId: string = "";
  getPatentCallId: string = "";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.CountryCodeMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.ReciveUserCredentials),
      getName(MessageEnum.SessionResponseMessage),
    ];

    this.state = {
      isVisible: false,
      apiToken: null,
      newValue: "1",
      educationQualification: [],
      projectList: [],
      modalProject: [],
      awardList: [],
      patentList: [],
      loadingEQ: true,
      activeTab: 1,
      loadingProject: true,
      loadingAwards: true,
      loadingPub: true,
      isModalOpen: false,
      modalItem: null,
    };

    this.labelTitle = configJSON.labelTitle;
    // Customizable Area End

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    // Customizable Area Start
    this.getToken();
    if (this.isPlatformWeb() === false) {
      this.props.navigation.addListener("willFocus", () => {
        this.getToken();
      });
    }
    // Customizable Area End
  }

  getToken = () => {
    const msg: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(msg);
  };

  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      let token = message.getData(getName(MessageEnum.SessionResponseToken));
      runEngine.debugLog("TOKEN", token);
      if (token) {
        this.setState({ apiToken: token }, () => {
          this.getEducationQualification();
          this.getProjectList();
          this.getAwardList();
          this.getPatentList();
        });
      }
    } else if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.getEducationCallId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      var resJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      if (resJson?.errors?.length > 0) {
        this.showAlert("Error", resJson?.errors[0]?.token);
      } else {
        this.setState({
          educationQualification: resJson?.data,
          loadingEQ: false,
        });
      }
    }

    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.getProjectCallId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      var resJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      if (resJson?.errors?.length > 0) {
        this.showAlert("Error", resJson?.errors[0]?.token);
      } else {
        this.setState({ projectList: resJson?.data, loadingProject: false });
      }
    }

    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.getAwardsCallId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      var resJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      if (resJson?.errors?.length > 0) {
        this.showAlert("Error", resJson?.errors[0]?.token);
      } else {
        this.setState({ awardList: resJson?.data, loadingAwards: false });
      }
    }

    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.getPatentCallId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      var resJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      if (resJson?.errors?.length > 0) {
        this.showAlert("Error", resJson?.errors[0]?.token);
      } else {
        this.setState({ patentList: resJson?.data, loadingPub: false });
      }
    }
    // Customizable Area End
  }

  // Customizable Area Start
  async getEducationQualification() {
    const header = {
      token: this.state.apiToken,
      "Content-Type": configJSON.getEducationContentType,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getEducationCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getEducationApiEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getEducationApiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  async getProjectList() {
    const header = {
      token: this.state.apiToken,
      "Content-Type": configJSON.getProjectContextType,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getProjectCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getProjectApiEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getProjectApiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  async getAwardList() {
    const header = {
      token: this.state.apiToken,
      "Content-Type": configJSON.getAwardsContextType,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getAwardsCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getAwardsApiEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getAwardsApiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  async getPatentList() {
    const header = {
      token: this.state.apiToken,
      "Content-Type": configJSON.getPatentsContextType,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getPatentCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getPatentsApiEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getPatentsApiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  hideModal = () => {
    this.setState({ isVisible: !this.state.isVisible });
  };

  showModal = (modalProject: any) => {
    console.log(modalProject);
    this.setState({ modalProject: modalProject });
    this.setState({ isVisible: !this.state.isVisible });
  };

  handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    this.setState({
      newValue: newValue,
    });
  };

  handleMobileModalClose = () => {
    this.setState({
      isModalOpen: false,
      modalItem: null,
    });
  };
  // Customizable Area End
}
// Customizable Area Start
// Customizable Area End
