import {runEngine} from '../../../framework/src/RunEngine'
import {Block} from '../../../framework/src/Block';
import {IBlock} from '../../../framework/src/IBlock';
import {Message} from '../../../framework/src/Message';
import MessageEnum from '../../../framework/src/Messages/MessageEnum';
import {getName} from '../../../framework/src/Messages/MessageEnum';
import NavigationMessage from '../../../framework/src/Messages/NavigationMessage';

export default class MobilePhoneToOTPAdapter  {
    send: (message: Message) => void;
    constructor() {
        const uuidv4 = require('uuid/v4');
        var blockId = uuidv4();
        this.send = message => runEngine.sendMessage(blockId, message);
        runEngine.attachBuildingBlock(this as IBlock, [getName(MessageEnum.NavigationMobilePhoneOTPMessage), getName(MessageEnum.NavigationForgotPasswordOTPMessage)]);
    }
    convert(from: Message): Message {
        const to = new Message(getName(MessageEnum.NavigationMessage));

        if ( from.getData(getName(MessageEnum.EnterOTPAsForgotPasswordMessage))) {
            to.addData(getName(MessageEnum.NavigationTargetMessage), "ForgotPasswordOTP")
        } else {
            to.addData(getName(MessageEnum.NavigationTargetMessage), "OTPInputAuth")
        }
    
        to.addData(getName(MessageEnum.NavigationPropsMessage), 
            from.getData(getName(MessageEnum.NavigationPropsMessage)))
            
        const raiseMessage:Message = new Message(getName(MessageEnum.NavigationPayLoadMessage));
        raiseMessage.addData(
            getName(MessageEnum.AuthTokenDataMessage),
            from.getData(getName(MessageEnum.AuthTokenDataMessage))
        );

        raiseMessage.addData(
            getName(MessageEnum.AuthTokenPhoneNumberMessage), 
            from.getData(getName(MessageEnum.AuthTokenPhoneNumberMessage))
        );

        raiseMessage.addData(
            getName(MessageEnum.AuthTokenEmailMessage), 
            from.getData(getName(MessageEnum.AuthTokenEmailMessage))
        );

        raiseMessage.addData(
            getName(MessageEnum.EnterOTPAsForgotPasswordMessage), 
            from.getData(getName(MessageEnum.EnterOTPAsForgotPasswordMessage))
        );

        to.addData(getName(MessageEnum.NavigationRaiseMessage),
            raiseMessage)
        
        return to;
    }
    receive(from: string, message: Message): void {
       this.send(this.convert(message));
    }
}