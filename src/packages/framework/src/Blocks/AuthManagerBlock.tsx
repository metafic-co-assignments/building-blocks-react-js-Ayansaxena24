import MessageEnum, { getName } from '../Messages/MessageEnum';
import { IBlock } from '../IBlock';
import { IUserSession } from '../Interfaces/IUserSession';
import { runEngine } from '../RunEngine';
import { Message } from '../Message';
import { Block } from '../Block';
import StorageProvider from '../StorageProvider';

export default class AuthManagerBlock extends Block {
  private static instance: AuthManagerBlock;

  userCredsKey: string = 'saveUserInfo';

  userName: null;
  phoneNumber: null;
  countryCode: null;

  private constructor() {
    super();

    runEngine.attachBuildingBlock(this as IBlock, [
      getName(MessageEnum.AuthenticateUserMessage),
      getName(MessageEnum.LoginFaliureMessage),
      getName(MessageEnum.RequestUserSession),
    ]);
  }

  static getInstance(): AuthManagerBlock {
    if (!AuthManagerBlock.instance) {
      AuthManagerBlock.instance = new AuthManagerBlock();
    }
    return AuthManagerBlock.instance;
  }

  async receive(from: string, message: Message) {
    switch (message.id) {
      case getName(MessageEnum.AuthenticateUserMessage): {
        const requestMessage = new Message(
          getName(MessageEnum.RestAPIRequestMessage)
        );
        requestMessage.initializeFromObject(message.properties);

        break;
      }
      case getName(MessageEnum.RequestUserSession): {
        break;
      }
    }
  }

  async saveUserData(
    countryCode: any,
    userName: any,
    password: any,
    isRememberMe: any
  ) {
    if (!isRememberMe) {
      this.clearUserData();
    } else {
      try {
        const userInfo = {
          id: userName,
          countrycode: countryCode,
          password: password,
        };
        await StorageProvider.set(this.userCredsKey, JSON.stringify(userInfo));

        this.countryCode = countryCode;
        this.userName = userName;
      } catch {}
    }
  }

  async clearUserData() {
    await StorageProvider.set(this.userCredsKey, '');
    this.userName = null;
    this.countryCode = null;
  }
}
