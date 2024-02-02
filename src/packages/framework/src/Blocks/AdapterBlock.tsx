// Do not change anything in the protected area. Doing so will be detected and your commit will be rejected.

// Protected Area Start
import { runEngine } from '../RunEngine';
import { Block } from '../Block';
import { IBlock } from '../IBlock';
import { Message } from '../Message';

export default class AdapterBlock extends Block {
  private toMessageId: string;

  constructor(fromMessageId: string, toMessageId: string) {
    super();
    this.toMessageId = toMessageId;
    runEngine.attachBuildingBlock(this as IBlock, [fromMessageId]);
  }

  send = (message: Message): void => {
    runEngine.sendMessage(this.toMessageId, message);
  };

  private convert(from: Message): Message {
    const to = new Message(this.toMessageId);
    Object.entries(from.properties).forEach(
      (value: any, key: any) => (to.properties[key] = value)
    );
    return to;
  }

  receive(from: string, message: Message): void {
    this.send(this.convert(message));
  }
}
