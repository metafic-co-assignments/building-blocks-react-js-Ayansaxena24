import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import React from "react";
import Contactus from "../../src/Contactus";
import AddContactUs from "../../src/AddContactus";
const navigation = require("react-navigation");

import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
export const configJSON = require("../../config.json");
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import { _ } from "../../../../framework/src/IBlock";

const screenProps = {
  navigation: navigation,
  id: "Contactus",
};

const feature = loadFeature("./__tests__/features/contactus-scenario.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to contactus", ({ given, when, then }) => {
    let ContactUsWrapper: ShallowWrapper;
    let instance: Contactus;

    given("I am a User loading contactus", () => {
      ContactUsWrapper = shallow(<Contactus {...screenProps} />);
    });

    when("I navigate to the contactus", () => {
      instance = ContactUsWrapper.instance() as Contactus;

      const tokenMsg: Message = new Message(
        getName(MessageEnum.SessionResponseMessage)
      );
      tokenMsg.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      runEngine.sendMessage("Unit Test", tokenMsg);

      const getConttactUsAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );

      getConttactUsAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: [
            {
              id: "10",
              type: "contact",
              attributes: {
                name: "Tester",
                email: "test@me.com",
                phone_number: "13015551212",
                description: "None",
                created_at: "2021-03-08T23:17:49.068Z",
                user: "Firstname Lastname",
              },
            },
          ],
        }
      );
      instance.contactUsApiCallId = getConttactUsAPI.messageId;
      runEngine.sendMessage("Unit Test", getConttactUsAPI);

      const deleteConttactUsAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      instance.deleteContactApiCallId = deleteConttactUsAPI.messageId;
      runEngine.sendMessage("Unit Test", deleteConttactUsAPI);

      const createConttactUsAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      createConttactUsAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        { errors: [{ contact: ["Phone number invalid"] }] }
      );
      instance.contactUsApiCallId = createConttactUsAPI.messageId;
      runEngine.sendMessage("Unit Test", createConttactUsAPI);
    });

    then("contactus will load with out errors", () => {
      expect(ContactUsWrapper).toBeTruthy();
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(ContactUsWrapper).toBeTruthy();
    });
  });

  test("User navigates to addContactus", ({ given, when, then }) => {
    let AddContactUsWrapper: ShallowWrapper;
    let instance: AddContactUs;

    given("I am a User loading addContactus", () => {
      AddContactUsWrapper = shallow(<AddContactUs {...screenProps} />);
    });

    when("I navigate to the addContactus", () => {
      instance = AddContactUsWrapper.instance() as AddContactUs;

      let buttonComponent = AddContactUsWrapper.findWhere(
        (node) => node.prop("testID") === "btnSubmit"
      );
      buttonComponent.simulate("press");

      let textInputComponent = AddContactUsWrapper.findWhere(
        (node) => node.prop("testID") === "txtName"
      );
      textInputComponent.simulate("changeText", "FIRST");

      textInputComponent = AddContactUsWrapper.findWhere(
        (node) => node.prop("testID") === "txtEmail"
      );
      textInputComponent.simulate("changeText", "a@b.com");

      textInputComponent = AddContactUsWrapper.findWhere(
        (node) => node.prop("testID") === "txtPhoneNumber"
      );
      textInputComponent.simulate("changeText", "13105551212");

      textInputComponent = AddContactUsWrapper.findWhere(
        (node) => node.prop("testID") === "txtComments"
      );
      textInputComponent.simulate("changeText", "N/A");

      buttonComponent.simulate("press");
    });

    then("addContactus will load with out errors", () => {
      expect(AddContactUsWrapper).toBeTruthy();
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(AddContactUsWrapper).toBeTruthy();
    });
  });
});
