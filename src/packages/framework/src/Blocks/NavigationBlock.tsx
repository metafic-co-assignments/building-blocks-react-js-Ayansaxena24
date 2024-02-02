// You can only update code inside the customizable area. Other changes will be detected during commit and your commit will be rejected.

import { BlockComponent } from '../../../framework/src/BlockComponent';
import { IBlock } from "../../../framework/src/IBlock";
import { runEngine } from "../../../framework/src/RunEngine";
import { Message } from "../../../framework/src/Message";
import MessageEnum, { getName } from '../Messages/MessageEnum';

interface Props {}
interface S {}
interface SS {}

class NavigationBlock extends BlockComponent<Props, S, SS> {
  constructor(props: Props = { navigation: null }) {
    super(props);
    this.receive = this.receive.bind(this);
    runEngine.attachBuildingBlock(this as IBlock, [
      getName(MessageEnum.NavigationMessage),
      getName(MessageEnum.NavigationPropsMessage)
    ]);
  }

  async receive(from: string, message: Message) {

    if (message.id === getName(MessageEnum.NavigationMessage)) {
      // debugger;
      const raiseMessage: Message = message.getData(
        getName(MessageEnum.NavigationRaiseMessage)
      );
      if (raiseMessage !== undefined) {
        const self = this;
        setTimeout(function() {
          self.send(raiseMessage);
        }, 0);
      }
      const screenTitle = message.getData(
        getName(MessageEnum.NavigationScreenNameMessage)
      );
      const props = message.getData(
        getName(MessageEnum.NavigationPropsMessage)
      );
      if (props && props.navigation) {
        props?.navigation?.set;
        props?.navigation?.navigate(
          message.getData(getName(MessageEnum.NavigationTargetMessage)),
          { navigationBarTitleText: screenTitle }
        );
      }
    }
  }
}

export default NavigationBlock;
