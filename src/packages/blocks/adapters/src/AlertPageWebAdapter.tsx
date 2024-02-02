import { v4 as uuidv4 } from 'uuid';
import { runEngine } from '../../../framework/src/RunEngine';
import { IBlock } from '../../../framework/src/IBlock';
import { Message } from '../../../framework/src/Message';
import MessageEnum, {
  getName
} from '../../../framework/src/Messages/MessageEnum';

export default class AlertPageWebAdapter {
  send: (message: Message) => void;

  constructor() {
    const blockId = uuidv4();
    this.send = message => runEngine.sendMessage(blockId, message);
    console.log('initing AlertPageWebAdapter');
    runEngine.attachBuildingBlock(this as IBlock, [
      getName(MessageEnum.NavigationAlertWebMessage)
    ]);
  }

  convert = (from: Message): Message => {
    const to = new Message(getName(MessageEnum.NavigationMessage));

    to.addData(getName(MessageEnum.NavigationTargetMessage), 'AlertWeb');

    to.addData(
      getName(MessageEnum.NavigationPropsMessage),
      from.getData(getName(MessageEnum.NavigationPropsMessage))
    );

    const raiseMessage: Message = new Message(
      getName(MessageEnum.NavigationPayLoadMessage)
    );

    raiseMessage.copyAllPropertiesOf(from);

    // let alertType = message.getData(getName(MessageEnum.AlertTypeMessage));
    // let title = message.getData(getName(MessageEnum.AlertTitleMessage));
    // let body = message.getData(getName(MessageEnum.AlertBodyMessage));

    // let btnPositiveText = message.getData(getName(MessageEnum.AlertButtonPositiveText));
    // let btnPositiveMessage = message.getData(getName(MessageEnum.AlertButtonPositiveMessage));

    // let btnNegativeText = message.getData(getName(MessageEnum.AlertButtonNegativeText));
    // let btnNegativeMessage = message.getData(getName(MessageEnum.AlertButtonNegativeMessage));

    // let btnNeutralText = message.getData(getName(MessageEnum.AlertButtonNeutralText));
    // let btnNeutralMessage = message.getData(getName(MessageEnum.AlertButtonNeutralMessage));

    to.addData(getName(MessageEnum.NavigationRaiseMessage), raiseMessage);

    return to;
  };

  receive(from: string, message: Message): void {
    console.log(`receive AlertPageWebAdapter==>${JSON.stringify(message)}`);
    console.log(
      `Converted AlertPageWebAdapter==>${JSON.stringify(this.convert(message))}`
    );

    this.send(this.convert(message));
  }
}
