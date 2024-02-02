import MessageEnum, {
  getName,
} from '../../../framework/src/Messages/MessageEnum';
import { IBlock } from '../../../framework/src/IBlock';
import { runEngine } from '../../../framework/src/RunEngine';
import { Message } from '../../../framework/src/Message';
import { Block } from '../../../framework/src/Block';

let config = require('../config')

export default class RestApiClientBlock<Entity> extends Block {
  private props: any;

  private static instance: RestApiClientBlock<any>;

  private constructor() {
    super();
    runEngine.attachBuildingBlock(this as IBlock, [
      getName(MessageEnum.RestAPIRequestMessage),
    ]);
  }

  static getInstance(): RestApiClientBlock<any> {
    if (!RestApiClientBlock.instance) {
      RestApiClientBlock.instance = new RestApiClientBlock();
    }
    return RestApiClientBlock.instance;
  }

  async receive(from: string, message: Message) {
    console.log('API Rquest Message' + JSON.stringify(message));
    if (getName(MessageEnum.RestAPIRequestMessage) === message.id) {
      const uniqueApiCallId = message.messageId;
      const {
        RestAPIRequestMethodMessage: method,
        RestAPIResponceEndPointMessage: endpoint,
        RestAPIRequestHeaderMessage: headers,
        RestAPIRequestBodyMessage: body,
        NavigationPropsMessage: props,
      } = message.properties;
      this.props = props;
      this.makeApiCall(uniqueApiCallId, method, endpoint, headers, body);
    }
  }

  async makeApiCall(
    uniqueApiCallId: string,
    method: string,
    endpoint: string,
    headers: any,
    body: string
  ) {

    let fullURL = endpoint.indexOf('://') === -1 ? config.baseURL + '/' + endpoint : endpoint
    let apiResponseMessage = new Message(
      getName(MessageEnum.RestAPIResponceMessage)
    );
    apiResponseMessage.addData(
      getName(MessageEnum.RestAPIResponceDataMessage),
      uniqueApiCallId
    );

    try {
      let response:Response = new Response();
      if (headers && body) {
          response = await fetch(fullURL, {
          method: method.toUpperCase(),
          headers: headers.length ? JSON.parse(headers) : headers,
          body: body,
        });
      } else if (headers) {
          response = await fetch(fullURL, {
          method: method.toUpperCase(),
          headers: headers.length ? JSON.parse(headers) : headers,
        });
      } else {
        response = await fetch(fullURL, {
        method: method.toUpperCase()
      });
    }

      let responseJson = await response.json();

      //setting Response
      apiResponseMessage.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        responseJson
      );

      console.log('Api Response' + JSON.stringify(responseJson));
    } catch (error) {
      runEngine.debugLog('RestApiClient Error', error);
      //setting Error
      console.log('Api Error' + JSON.stringify(error));
      apiResponseMessage.addData(
        getName(MessageEnum.RestAPIResponceErrorMessage),
        'An error has occuured. Please try again later.'
      );
    }

    if (this.props) {
      apiResponseMessage.addData(
        getName(MessageEnum.NavigationPropsMessage),
        this.props
      );
    }
    this.send(apiResponseMessage);
  }
}