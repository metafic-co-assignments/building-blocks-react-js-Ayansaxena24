// Do not change anything in the protected area. Doing so will be detected and your commit will be rejected.

// Protected Area Start
import { Component } from 'react';
import { IBlock } from './IBlock';
import { runEngine } from './RunEngine';
import { Message } from './Message';
import MessageEnum, { getName } from './Messages/MessageEnum';
import { Keyboard } from 'react-native';

import * as helper from './Helpers';
import { Stream } from 'stream';

export class BlockComponent<Props, S, SS> extends Component<Props, S, SS>
  implements IBlock {
  isLoaded = false;

  send: (message: Message) => void;

  blockId: string;

  subScribedMessages: string[];

  constructor(props: Props) {
    super(props);
    const uuidv4 = require("uuid/v4");
    this.blockId = uuidv4();
    this.send = message => runEngine.sendMessage(this.blockId, message);
    this.subScribedMessages = [''];
    this.hideKeyboard = this.hideKeyboard.bind(this);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  receive(from: string, message: Message): void {}

  async componentDidMount() {
    this.isLoaded = true;
  }

  async componentWillUnmount() {
    this.isLoaded = false;
    Keyboard.dismiss();
    runEngine.unSubscribeFromMessages(this, this.subScribedMessages);
  }


  public toggleState(objectID:string) {
    this.changeState(objectID, !Boolean(this.getState(objectID)));
  }

  public changeState(objectID:string, value:any) {
    switch(objectID) {
      default:
        console.log("changeState::Not Confifured for " + objectID);
    }
  }

  public getState(objectID:string) {

    var testString = '';

    switch(objectID) {
      case 'testBoolTrue':
        return true;
      case 'testBoolFalse':
          return false;
      case 'testString':
        return testString;
      default:
        console.log("changeState::Not Confifured for " + objectID);
        return null
    }
  }

  public processOnClickMessage(messageID:string, value:any = null) {
    switch(messageID) {
      default:
        console.log("processOnClickMessage::Not Configured for " + messageID);
    }
  }

  public showAlert(
    title: string,
    error: string,
    btnPositiveText?: string,
    btnPositiveMessage?: Message,
    btnNegativeText?: string,
    btnNegativeMessage?: Message,
    btnNeutralText?: string,
    btnNeutralMessage?: Message
  ) {
    Keyboard.dismiss();

    if (!btnPositiveText && !btnNegativeText && !btnNeutralText) {
      btnPositiveText = 'Ok';
    }

    const alertMsg: Message = new Message(getName(MessageEnum.AlertMessage));
    alertMsg.addData(getName(MessageEnum.AlertTitleMessage), title);
    alertMsg.addData(getName(MessageEnum.AlertBodyMessage), error);
    alertMsg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);

    alertMsg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);

    alertMsg.addData(
      getName(MessageEnum.AlertButtonPositiveText),
      btnPositiveText
    );
    alertMsg.addData(
      getName(MessageEnum.AlertButtonNegativeText),
      btnNegativeText
    );
    alertMsg.addData(
      getName(MessageEnum.AlertButtonNeutralText),
      btnNeutralText
    );

    alertMsg.addData(
      getName(MessageEnum.AlertButtonPositiveMessage),
      btnPositiveMessage
    );
    alertMsg.addData(
      getName(MessageEnum.AlertButtonNegativeMessage),
      btnNegativeMessage
    );
    alertMsg.addData(
      getName(MessageEnum.AlertButtonNeutralMessage),
      btnNeutralMessage
    );

    runEngine.sendMessage(alertMsg.id, alertMsg);
  }

  public parseApiErrorResponse(responseJson: any) {
    if (!responseJson || !responseJson.errors) {
      return;
    }
    const errors: any[] = responseJson.errors;

    let allerrors = '';
    errors.map((object: string) => {
      const newLocal = JSON.stringify(object);
      JSON.parse(newLocal, (key, value) => {
        if (value.length > 0) {
          if (allerrors.length <= 0) {
            allerrors = value;
          } else {
            allerrors = `${allerrors}{\n}${value}`;
          }
        }
      });
    });

    this.showAlert('Error', allerrors);
  }

  public isPlatformWeb() {
    return helper.getOS() === 'web';
  }

  public isPlatformiOS() {
    return helper.getOS() === 'ios';
  }

  public isPlatformAndroid() {
    return helper.getOS() === 'android';
  }

  public parseApiCatchErrorResponse(errorReponse: any) {
    if (errorReponse) {
      this.showAlert(
        'Error',
        JSON.stringify(errorReponse).replace(new RegExp('"', 'g'), '')
      );
    }
  }

  public hideKeyboard() {
    if (!this.isPlatformWeb()) {
      Keyboard.dismiss();
    }
  }
}

// Protected Area End
