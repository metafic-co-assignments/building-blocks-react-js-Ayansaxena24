import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  info: any;
  data: any;
  token: any;
  googleChartData: any;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class VisualAnalyticsController extends BlockComponent<
  Props,
  S,
  SS
> {
  apiGetDataCallId: any;

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      // Customizable Area Start
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      token: null,
      info: {
        labels: [],
        data: [],
        barColors: [],
      },
      data: {
        weekly: {
          labels: ["week1", "week2", "week3", "week4", "week5"],
          data: [[5], [9], [3], [6], [2]],
          barColors: ["#7db6b0"],
        },
        monthly: {
          labels: [
            "Jun",
            "Fab",
            "Mar",
            "Apr",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nom",
            "Dec",
          ],
          data: [[9], [5], [6], [3], [2], [7], [1], [4], [2], [6], []],
          barColors: ["#7db6b0"],
        },
      },
      googleChartData: ["Title", "Value"],
      // Customizable Area End
    };

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      let token = message.getData(getName(MessageEnum.SessionResponseToken));
      runEngine.debugLog("TOKEN", token);
      this.setState({ token: token });
      this.dayRavenue();
    } else if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.apiGetDataCallId !== null &&
      this.apiGetDataCallId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.apiGetDataCallId = null;

      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (responseJson && responseJson.data) {
        console.log(responseJson.data?.labels.length);
        let webData: [any] = [["Title", "Value"]];
        for (
          var iIndex = 0;
          iIndex < responseJson.data?.labels.length;
          ++iIndex
        ) {
          let label = responseJson.data?.labels[iIndex];
          let value = responseJson.data?.data[iIndex][0];
          webData.push([label, value]);
        }
        this.setState({ info: responseJson.data, googleChartData: webData });
      } else {
        this.parseApiErrorResponse(responseJson);
      }
    }
    // Customizable Area End
  }

  async componentDidMount() {
    super.componentDidMount();
    this.getToken();
    if (this.isPlatformWeb() === false) {
      this.props.navigation.addListener("willFocus", () => {
        this.getToken();
      });
    }
    // Customizable Area Start
    // Customizable Area End
  }

  getToken = () => {
    const msg: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(msg);
  };

  // Customizable Area Start
  dayRavenue = async () => {
    let token = this.state.token;

    const header = {
      "Content-Type": configJSON.jsonApiContentType,
      token: token,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.apiGetDataCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.userStatisticAPiEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getApiMethodType
    );

    console.log(
      "@@@ Request user Analytics ===========",
      requestMessage,
      this.apiGetDataCallId
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  };

  dayAudience = async () => {
    let token = this.state.token;

    const header = {
      "Content-Type": configJSON.jsonApiContentType,
      token: token,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.apiGetDataCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.audienceFollowersAPiEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getApiMethodType
    );

    console.log(
      "@@@ Request user Analytics ===========",
      requestMessage,
      this.apiGetDataCallId
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  };
  // Customizable Area End
}
