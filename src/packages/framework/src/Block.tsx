// Do not change anything in the protected area. Doing so will be detected and your commit will be rejected.

// Protected Area Start
import { IBlock } from './IBlock';
import { runEngine } from './RunEngine';
import { Message } from './Message';

export class Block implements IBlock {
  send: (message: Message) => void;

  blockId: string;

  constructor() {
    const uuidv4 = require("uuid/v4");
    this.blockId = uuidv4();
    this.send = message => runEngine.sendMessage(this.blockId, message);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  receive(from: string, message: Message): void {}
}

// Protected Area End
