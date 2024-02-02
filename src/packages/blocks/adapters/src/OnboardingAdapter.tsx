import { v4 as uuidv4 } from 'uuid';
import { runEngine } from '../../../framework/src/RunEngine';
import { IBlock } from '../../../framework/src/IBlock';
import { Message } from '../../../framework/src/Message';
import MessageEnum, {
  getName
} from '../../../framework/src/Messages/MessageEnum';

export default class OnboardingAdapter {
  send: (message: Message) => void;

  constructor() {
    // const uuidv4 = require('uuid/v4');
    const blockId = uuidv4();
    this.send = message => runEngine.sendMessage(blockId, message);
    runEngine.attachBuildingBlock(this as IBlock, [
      getName(MessageEnum.OnboardingGuideControllerDoneOnboarding),
      getName(MessageEnum.OnboardingGuideControllerSkipOnboarding)
    ]);
  }

  convert = (from: Message): Message => {
    runEngine.debugLog("OnboardingAdapter", from.id)
    const to = new Message(getName(MessageEnum.NavigationMessage));
    to.addData(getName(MessageEnum.NavigationTargetMessage), 'Home');
    to.addData(
      getName(MessageEnum.NavigationPropsMessage),
      from.getData(getName(MessageEnum.NavigationPropsMessage))
    );
    return to;
  };

  receive(from: string, message: Message): void {
    this.send(this.convert(message));
  }
}
