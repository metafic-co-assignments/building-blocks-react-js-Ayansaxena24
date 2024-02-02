import { v4 as uuidv4 } from 'uuid';
import { runEngine } from '../../../framework/src/RunEngine';
import { IBlock } from '../../../framework/src/IBlock';
import { Message } from '../../../framework/src/Message';
import MessageEnum, {
  getName
} from '../../../framework/src/Messages/MessageEnum';

export default class InfoPageAdapter {
  send: (message: Message) => void;

  constructor() {
    const blockId = uuidv4();
    this.send = message => runEngine.sendMessage(blockId, message);
    runEngine.attachBuildingBlock(this as IBlock, [
      getName(MessageEnum.NavigationInfoPageMessage),
      getName(MessageEnum.AccoutResgistrationSuccess),
      getName(MessageEnum.AccoutLoginSuccess)
    ]);
  }

  convert = (from: Message): Message => {
    let title = from.getData(getName(MessageEnum.InfoPageTitleMessage));
    let body = from.getData(getName(MessageEnum.InfoPageBodyMessage));
    let buttonText = from.getData(
      getName(MessageEnum.InfoPageButtonTextMessage)
    );
    let navigationBarTitle = from.getData(
      getName(MessageEnum.NavigationScreenNameMessage)
    );
    let buttonNavigationMessage = from.getData(
      getName(MessageEnum.NavigationRaiseMessage)
    );

    if (from.id === getName(MessageEnum.AccoutResgistrationSuccess)) {
      title = 'Account Creation';
      body = 'Account was sucessfuly created.';
      buttonText = 'Ok';
      navigationBarTitle = 'Account Creation';
      buttonNavigationMessage = new Message(
        getName(MessageEnum.NavigationHomeScreenMessage)
      );
    } else if (from.id === getName(MessageEnum.AccoutLoginSuccess)) {
      title = 'Account Login';
      body = 'Account was sucessfuly logged in.';
      buttonText = 'Ok';
      navigationBarTitle = 'Account Login';
      buttonNavigationMessage = new Message(
        getName(MessageEnum.NavigationHomeScreenMessage)
      );
    }

    const to = new Message(getName(MessageEnum.NavigationMessage));
    to.addData(getName(MessageEnum.NavigationTargetMessage), 'InfoPage');

    to.addData(
      getName(MessageEnum.NavigationPropsMessage),
      from.getData(getName(MessageEnum.NavigationPropsMessage))
    );

    to.addData(
      getName(MessageEnum.NavigationScreenNameMessage),
      navigationBarTitle
    );

    const raiseMessage: Message = new Message(
      getName(MessageEnum.NavigationPayLoadMessage)
    );
    raiseMessage.addData(getName(MessageEnum.InfoPageTitleMessage), title);
    raiseMessage.addData(getName(MessageEnum.InfoPageBodyMessage), body);
    raiseMessage.addData(
      getName(MessageEnum.InfoPageButtonTextMessage),
      buttonText
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

    return to;
  };

  receive(from: string, message: Message): void {
    this.send(this.convert(message));
  }
}
