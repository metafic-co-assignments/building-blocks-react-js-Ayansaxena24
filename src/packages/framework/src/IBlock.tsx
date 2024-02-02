import { Message } from './Message';

export const _ = '';

export interface IBlock {
  receive(from: string, message: Message): void;
  send: (message: Message) => void;
}
