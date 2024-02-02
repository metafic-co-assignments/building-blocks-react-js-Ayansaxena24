import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { IBlock } from "../../../framework/src/IBlock";
import { runEngine } from "../../../framework/src/RunEngine";
import { Message } from "../../../framework/src/Message";
import { Block } from '../../../framework/src/Block';
import { setStorageData } from "../../../framework/src/Utilities";

export default class SessionManagerBlock extends Block {
  private static instance: SessionManagerBlock;
  sessionToken: any;
  sessionData: any;

  private constructor() {
    super();
    runEngine.attachBuildingBlock(this as IBlock, [
      getName(MessageEnum.SessionRequestMessage),
      getName(MessageEnum.SessionSaveMessage)
    ]);
  }

  static getInstance(): SessionManagerBlock {
    if (!SessionManagerBlock.instance) {
      SessionManagerBlock.instance = new SessionManagerBlock();
    }
    return SessionManagerBlock.instance;
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog(
      'SessionManagerBlock',
      'Session Rquest Message' + JSON.stringify(message)
    );

    if (getName(MessageEnum.SessionRequestMessage) === message.id) {
      let uniqueSessionRequestId = message.messageId;

      let sessionResponseMessage = new Message(
        getName(MessageEnum.SessionResponseMessage)
      );

      sessionResponseMessage.addData(
        getName(MessageEnum.SessionRequestedBy),
        uniqueSessionRequestId
      );

      if (this.isSessionValid()) {
        sessionResponseMessage.addData(
          getName(MessageEnum.SessionResponseData),
          this.getData()
        );

        sessionResponseMessage.addData(
          getName(MessageEnum.SessionResponseToken),
          this.getToken()
        );
      } else {
        sessionResponseMessage.addData(
          getName(MessageEnum.SessionResponseError),
          this.getError()
        );
      }

      this.send(sessionResponseMessage);
    } else if (getName(MessageEnum.SessionSaveMessage) === message.id) {
      let sessionData = message.getData(
        getName(MessageEnum.SessionResponseData)
      );

      let sessionToken = message.getData(
        getName(MessageEnum.SessionResponseToken)
      );

      this.saveSessionData(sessionToken, sessionData);
    }
  }
  saveSessionData(sessionToken: any, sessionData: any) {

    this.sessionToken = sessionToken;
    this.sessionData = sessionData;

    if (sessionToken ) {
      setStorageData('authToken', sessionToken);
    } 

    if (sessionData && sessionData.meta && sessionData.meta.role) {
      let role = sessionData.meta.role
      setStorageData('role', role);
    } 
    
  }
  getToken(): any {
    return this.sessionToken;
  }

  getData(): any {
    return this.sessionData;
  }

  getError(): any {
    return 'Session Expired';
  }

  isSessionValid() {
    return true;
  }
}