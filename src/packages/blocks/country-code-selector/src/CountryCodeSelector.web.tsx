import React from "react";
import { View } from "react-native";
import Select from "react-select";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import { runEngine } from "../../../framework/src/RunEngine";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";

const configJSON = require("./config");

interface Props {
  // Customizable Area Start
  navigation: any;
  style: any;
  id: string;
  disable: boolean;
  allowPropChange: boolean;
  value: string;
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  dataSource: any[];
  countryCodeSelected: string;
  mobileNo: string;
  token: string;
  placeHolder: string;
  disable: boolean;
  label: any;
  // Customizable Area End
}

interface SS {}

export default class CountryCodeSelector extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  countryCodeApiCallId: any;
  // Customizable Area End
  constructor(props: Props) {
    super(props);

    // Customizable Area Start
    this.subScribedMessages = [getName(MessageEnum.RestAPIResponceMessage)];
    this.receive = this.receive.bind(this);
    this.handleChange = this.handleChange.bind(this);
    runEngine.attachBuildingBlock(this, this.subScribedMessages);

    this.state = {
      dataSource: [],
      countryCodeSelected: "",
      mobileNo: "",
      token: "",
      placeHolder: configJSON.countryPlaceHolder,
      disable: this.props.disable,
      label: null
    };
    // Customizable Area End
  }

  render() {
    // Customizable Area Start
    var index = -1;
    var iIndex = -1;

    this.state.dataSource.forEach(item => {
      iIndex += 1;
      if (item.value === this.props.value) {
        index = iIndex;
        return;
      }
    });

    return (
      <View style={{ marginBottom: 10, zIndex: 99 }}>
        <Select
          style={this.props.style}
          options={this.state.dataSource}
          placeholder={this.state.placeHolder}
          onChange={this.handleChange}
          value={index >= 0 ? this.state.dataSource[index] : null}
          isDisabled={this.state.disable}
        />
      </View>
    );
    // Customizable Area End
  }

  // Customizable Area Start
  handleChange(item: any) {
    this.setState({ label: item.label });
    const msg = new Message(getName(MessageEnum.CountryCodeMessage));
    msg.addData(getName(MessageEnum.CountyCodeDataMessage), item.value);
    runEngine.sendMessage(getName(MessageEnum.CountryCodeMessage), msg);
  }

  async componentDidMount() {
    this.makeRemoteRequest();
  }

  countryCodesToDropDown = (data: any) => {
    return data.map((item: any) => ({
      label: ` ${item.attributes.emoji_flag} ${item.attributes.name} (${
        item.id
      }) +${item.attributes.country_code}`,
      value: item.attributes.country_code
    }));
  };

  async receive(from: String, message: Message) {
    runEngine.debugLog("Country Code", message);

    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.countryCodeApiCallId != null &&
      this.countryCodeApiCallId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      //
      if (responseJson && !responseJson.errors) {
        this.setState({
          dataSource: this.countryCodesToDropDown(responseJson.data)
        });
      } else {
        var errorReponse = message.getData(
          getName(MessageEnum.RestAPIResponceErrorMessage)
        );

        this.parseApiCatchErrorResponse(errorReponse);
      }
    }
  }

  makeRemoteRequest = () => {
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.countryCodeApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.apiEndPointGetCountryCodes
    );

    const header = {
      "Content-Type": configJSON.contentTypeApiGetCountryCodes
    };

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiGetCountryCodesType
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  };
  // Customizable Area End
}
