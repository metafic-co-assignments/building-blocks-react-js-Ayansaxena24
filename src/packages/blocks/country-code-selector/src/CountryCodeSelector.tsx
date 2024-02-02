import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import { runEngine } from "../../../framework/src/RunEngine";
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";

// Customizable Area Start
// Customizable Area End

interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  placeHolder: string;
  style: any;
  disable: boolean;
  allowPropChange: boolean;
  value: any;
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  dataSource: any[];
  countryCodeSelected: string;
  placeHolder: string;
  disable: boolean;
  // Customizable Area End
}

interface SS {
  // Customizable Area Start
  // Customizable Area End
}

export default class CountryCodeSelector extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  static defaultProps = {
    allowPropChange: false
  };
  currentPlaceHolderText: string;
  // Customizable Area End
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    this.subScribedMessages = [getName(MessageEnum.CountryCodeMessage)];
    this.receive = this.receive.bind(this);
    this.currentPlaceHolderText = props.placeHolder;
    this.state = {
      dataSource: [],
      countryCodeSelected: "",
      placeHolder: this.props.placeHolder,
      disable: this.props.disable
    };
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (getName(MessageEnum.CountryCodeMessage) === message.id) {
      this.setState({
        placeHolder: message.getData(getName(MessageEnum.CountyCodeDataMessage))
      });
    }
    // Customizable Area End
  }

  // Customizable Area Start
  onPress = () => {
    if (!this.state.disable) {
      runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
      this.props.navigation.navigate("CountryCodeSelectorTable");
    }
  };
  // Customizable Area End

  render() {
    // Customizable Area Start
    if (this.currentPlaceHolderText !== this.props.placeHolder) {
      this.currentPlaceHolderText = this.props.placeHolder;
      this.setState({ placeHolder: this.props.placeHolder });
    }

    return (
      <TouchableOpacity style={this.props.style} onPress={this.onPress}>
        <Text>{this.state.placeHolder}</Text>
      </TouchableOpacity>
    );
    // Customizable Area End
  }
}
