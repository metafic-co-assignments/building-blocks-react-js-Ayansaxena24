import { IBlock } from './IBlock';
import { Message } from './Message';

export const _ = '';

export class Channel {
  subscribers: IBlock[];

  topic: string;

  constructor(topic: string) {
    this.topic = topic;
    this.subscribers = [];
  }

  pub(from: string, message: Message) {
    this.subscribers.forEach(subscriber => {
      try {
        subscriber.receive(from, message);
      } catch {}
    });
  }

  sub(subscriber: IBlock) {
    this.subscribers.push(subscriber);
  }

  unsub(subscriber: IBlock) {
    for (let i = 0; i < this.subscribers.length; i++) {
      if (this.subscribers[i] === subscriber) {
        this.subscribers.splice(i, 1);
      }
    }
  }
}
