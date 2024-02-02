import { runEngine } from "../../../framework/src/RunEngine";
import { Message } from "../../../framework/src/Message";
import { Block } from "../../../framework/src/Block";
import { IBlock } from "../../../framework/src/IBlock";
import MessageEnum, { getName } from '../../../framework/src/Messages/MessageEnum';
import { Platform, Alert } from "react-native";

export default class AlertBlock extends Block {
  constructor() {
    super();
    runEngine.attachBuildingBlock(this as IBlock, [getName(MessageEnum.AlertMessage)]);
  }

  async receive(from: string, message: Message) {
    if (getName(MessageEnum.AlertMessage) === message.id) {

      let alertType = message.getData(getName(MessageEnum.AlertTypeMessage));
      let title = message.getData(getName(MessageEnum.AlertTitleMessage));
      let body = message.getData(getName(MessageEnum.AlertBodyMessage));

      let btnPositiveText = message.getData(getName(MessageEnum.AlertButtonPositiveText));
      let btnPositiveMessage = message.getData(getName(MessageEnum.AlertButtonPositiveMessage));

      let btnNegativeText = message.getData(getName(MessageEnum.AlertButtonNegativeText));
      let btnNegativeMessage = message.getData(getName(MessageEnum.AlertButtonNegativeMessage));

      let btnNeutralText = message.getData(getName(MessageEnum.AlertButtonNeutralText));
      let btnNeutralMessage = message.getData(getName(MessageEnum.AlertButtonNeutralMessage));

      this.showAlert(title, body, btnPositiveText, btnNegativeText, btnNeutralText, btnPositiveMessage, btnNegativeMessage, btnNeutralMessage);
    }
  }

  showAlert(alertTitle: string, alertMsg: string, btnPositiveText: string, btnNegativeText: string, btnNeutralText: string, btnPositiveMessage: Message, btnNegativeMessage: Message, btnNeutralMessage: Message) {

    if (alertMsg || alertTitle || btnPositiveText || btnNegativeText || btnNeutralText) {
      const buttons = [];

      if (btnNeutralText) {
        const btnNeutral = { text: btnNeutralText, onPress: () => this.send(btnNeutralMessage) };
        buttons.push(btnNeutral);
      }


      if (btnPositiveText) {
        const btnPositive = { text: btnPositiveText, onPress: () => this.send(btnPositiveMessage) };
        buttons.push(btnPositive);
      }

      if (btnNegativeText) {
        const btnNegative = { text: btnNegativeText, onPress: () => this.send(btnNegativeMessage) };
        buttons.push(btnNegative);
      }


      Alert.alert(
        alertTitle,
        alertMsg,
        buttons,

        { cancelable: true }
      );

    }


  }
}
