import MessageEnum, { getName } from '../Messages/MessageEnum';
import { IBlock } from '../IBlock';
import { runEngine } from '../RunEngine';
import { Message } from '../Message';
import { Block } from '../Block';
import StorageProvider from '../StorageProvider';

export default class UserAccountManagerBlock extends Block {
  private static instance: UserAccountManagerBlock;

  userCredsKey: string = 'saveUserInfo';

  userName: null;
  password: null;
  phoneNumber: null;
  countryCode: null;

  private constructor() {
    super();

    this.loadCreds();

    runEngine.attachBuildingBlock(this as IBlock, [
      getName(MessageEnum.LoginSuccessMessage),
      getName(MessageEnum.LoginFaliureMessage),
      getName(MessageEnum.RequestUserCredentials)
    ]);
  }

  static getInstance(): UserAccountManagerBlock {
    if (!UserAccountManagerBlock.instance) {
      UserAccountManagerBlock.instance = new UserAccountManagerBlock();
    }
    return UserAccountManagerBlock.instance;
  }

  async loadCreds() {
    let storedCreds: any = await StorageProvider.get(this.userCredsKey);

    if (storedCreds) {
      try {
        const json = JSON.parse(storedCreds);
        this.userName = json.id;
        this.password = json.password;
        this.countryCode = json.countrycode;
      } catch {}
    }
  }

  receive(from: string, message: Message) {
    if (getName(MessageEnum.RequestUserCredentials) === message.id) {
      let message = new Message(getName(MessageEnum.ReciveUserCredentials));
      message.addData(getName(MessageEnum.LoginUserName), this.userName);
      message.addData(getName(MessageEnum.LoginPassword), this.password);
      message.addData(getName(MessageEnum.LoginCountryCode), this.countryCode);
      this.send(message);
    } else if (getName(MessageEnum.LoginSuccessMessage) === message.id) {
      let userName = message.getData(getName(MessageEnum.LoginUserName));
      let password = message.getData(getName(MessageEnum.LoginPassword));
      let countryCode = message.getData(getName(MessageEnum.LoginCountryCode));
      let isRememberMe = message.getData(
        getName(MessageEnum.LoginIsRememberMe)
      );
      this.saveUserData(countryCode, userName, password, isRememberMe);
    } else if (getName(MessageEnum.LoginFaliureMessage) === message.id) {
      this.clearUserData();
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
          password: password
        };
        await StorageProvider.set(this.userCredsKey, JSON.stringify(userInfo));

        this.countryCode = countryCode;
        this.userName = userName;
        this.password = password;
      } catch {}
    }
  }

  async clearUserData() {
    await StorageProvider.set(this.userCredsKey, '');
    this.userName = null;
    this.password = null;
    this.countryCode = null;
  }
}
