import { v4 as uuidv4 } from 'uuid';
import { runEngine } from '../../../framework/src/RunEngine';
import { IBlock } from '../../../framework/src/IBlock';
import { Message } from '../../../framework/src/Message';
import MessageEnum, {
  getName
} from '../../../framework/src/Messages/MessageEnum';

export default class PrivacyPolicyAdapter {
  send: (message: Message) => void;

  constructor() {
    const blockId = uuidv4();
    this.send = message => runEngine.sendMessage(blockId, message);
    runEngine.attachBuildingBlock(this as IBlock, [
      getName(MessageEnum.NavigationPrivacyPolicyMessage)
    ]);
  }

  convert = (from: Message): Message => {
    const to = new Message(getName(MessageEnum.NavigationMessage));

    to.addData(getName(MessageEnum.NavigationTargetMessage), 'InfoPage');

    to.addData(
      getName(MessageEnum.NavigationPropsMessage),
      from.getData(getName(MessageEnum.NavigationPropsMessage))
    );

    const raiseMessage = new Message(
      getName(MessageEnum.NavigationPayLoadMessage)
    );

    raiseMessage.addData(
      getName(MessageEnum.InfoPageTitleMessage),
      'Privacy Policy'
    );
    raiseMessage.addData(
      getName(MessageEnum.InfoPageBodyMessage),
      'Feature Comming Soon..'
    );

    raiseMessage.addData(
      getName(MessageEnum.InfoPageButtonTextMessage),
      'Home'
    );

    const buttonNavigationMessage = new Message(
      getName(MessageEnum.NavigationHomeScreenMessage)
    );

    buttonNavigationMessage.addData(
      getName(MessageEnum.NavigationPropsMessage),
      from.getData(getName(MessageEnum.NavigationPropsMessage))
    );

    raiseMessage.addData(
      getName(MessageEnum.InfoPageNavigationScreenMessage),
      buttonNavigationMessage
    );
    to.addData(getName(MessageEnum.NavigationRaiseMessage), raiseMessage);

    to.addData(
      getName(MessageEnum.NavigationScreenNameMessage),
      'Privacy Policy'
    );

    return to;
  };

  receive(from: string, message: Message): void {
    this.send(this.convert(message));
  }
}
