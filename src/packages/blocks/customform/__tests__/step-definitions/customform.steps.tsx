import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import Customform from "../../src/Customform";

const screenProps = {
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
    push: jest.fn(),
    pop: jest.fn(),
    replace: jest.fn(),
  },
  id: "Customform",
};

const feature = loadFeature("./__tests__/features/customform-scenario.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "android" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "");
  });

  test("User navigates to customform", ({ given, when, then }) => {
    let customformBlock: ShallowWrapper;
    let instance: Customform;

    given("I am a User loading customform", () => {
      customformBlock = shallow(<Customform {...screenProps} />);
    });

    when("I navigate to the customform", () => {
      instance = customformBlock.instance() as Customform;
    });

    then("customform will load with out errors", () => {
      expect(customformBlock).toBeTruthy();

      const tokenMsg: Message = new Message(getName(MessageEnum.SessionResponseMessage));
      tokenMsg.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      runEngine.sendMessage("Unit Test", tokenMsg);

      const msgValidationAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
      msgValidationAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgValidationAPI.messageId);
      msgValidationAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), 
        {"data":{"id":"8","type":"seller_account","attributes":{"firm_name":"Shop NAME  122","full_phone_number":null,"location":"us","country_code":null,"phone_number":null,"gstin_number":"-1","wholesaler":true,"retailer":true,"manufacturer":false,"hallmarking_center":false,"buy_gold":null,"buy_silver":null,"sell_gold":null,"sell_silver":null,"activated":false}}}
      );

      instance.setState({
        getSellerDetailsMessageId: msgValidationAPI.messageId,
      });

      runEngine.sendMessage("Unit Test", msgValidationAPI)
    
    });

    then("I can enter firm name with out errors", () => {
      let textInputComponent = customformBlock.findWhere(
        (node) => node.prop("testID") === "shopName"
      );
      textInputComponent.simulate("changeText", "Gold Gully");
      expect(customformBlock).toBeTruthy();
    });

    then("I can select the button with with out errors", () => {
      let buttonComponent = customformBlock.findWhere(
        (node) => node.prop("testID") === "submitButton"
      );
      buttonComponent.simulate("press");
      expect(instance.state.shopName).toEqual("Gold Gully");
    });

    then("I can leave the screen with out errors", () => {

      let buttonComponent = customformBlock.findWhere(
        (node) => node.prop("testID") === "btnHideKeyboard"
      );
      buttonComponent.simulate("press");
      
      instance.componentWillUnmount();
      expect(customformBlock).toBeTruthy();
    });
  });
});
