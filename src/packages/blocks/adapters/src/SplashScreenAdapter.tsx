import { v4 as uuidv4 } from 'uuid';
import { runEngine } from '../../../framework/src/RunEngine';
import { IBlock } from '../../../framework/src/IBlock';
import { Message } from '../../../framework/src/Message';
import MessageEnum, {
  getName
} from '../../../framework/src/Messages/MessageEnum';

export default class SplashScreenAdapter {
  send: (message: Message) => void;

  constructor() {
    const blockId = uuidv4();
    this.send = message => runEngine.sendMessage(blockId, message);
    runEngine.attachBuildingBlock(this as IBlock, [
      getName(MessageEnum.SplashScreenCompleteMessage)
    ]);
  }

  convert = async (from: Message): Promise<Message> => {
    const to = new Message(getName(MessageEnum.NavigationMessage));
    to.addData(getName(MessageEnum.NavigationTargetMessage), 'Home');
    to.addData(
      getName(MessageEnum.NavigationPropsMessage),
      from.getData(getName(MessageEnum.NavigationPropsMessage))
    );
    return to;
  };

  async receive(from: string, message: Message): Promise<void> {
    this.send(await this.convert(message));
  }
}
