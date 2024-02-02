// Do not change anything in the protected area. Doing so will be detected and your commit will be rejected.

// Protected Area Start

import { Channel } from './Channel';
import { IBlock } from './IBlock';
import { Message } from './Message';

class RunEngine {
  channels: Map<string, Channel>;

  debugLog = (tag: any, data: any = null) => {
    console.log('=====================Debug Log Start======================');
    if (data !== undefined) {
      console.log(tag + '====>' + JSON.stringify(data));
    }
    console.log('=====================Debug Log End======================');
    console.log('        ');
  };

  constructor() {
    this.channels = new Map<string, Channel>();
    this.addChannel = this.addChannel.bind(this);
    this.attachBuildingBlock = this.attachBuildingBlock.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.unSubscribeFromMessages = this.unSubscribeFromMessages.bind(this);
  }

  addChannel(topic: string): void {
    this.channels.set(topic, new Channel(topic));
  }

  unSubscribeFromMessages(block: IBlock, subscribedMessages: string[]): void {
    if (subscribedMessages) {
      subscribedMessages.forEach(topic => {
        const channel = this.channels.get(topic);
        if (channel) {
          channel.unsub(block);
        }
      });
    }
  }

  attachBuildingBlock(block: IBlock, subscribedMessages: string[]): void {
    subscribedMessages.forEach(topic => {
      if (!this.channels.has(topic)) {
        this.addChannel(topic);
      }

      const channel = this.channels.get(topic);
      if (channel) {
        channel.sub(block);
      }
    });
  }

  sendMessage(from: string, message: Message): void {
    if ( message && message.id ) {
      const channel = this.channels.get(message.id);
      if (channel) {
        channel.subscribers.forEach(block => block.receive(from, message));
      }
    }
  }
}

const runEngine = new RunEngine();
export { runEngine };

// Protected Area End
