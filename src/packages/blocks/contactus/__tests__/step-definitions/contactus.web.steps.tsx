import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import React from "react";
import Contactus from "../../src/Contactus.web";
import AddContactUs from "../../src/AddContactus.web";
const navigation = require("react-navigation");

import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
export const configJSON = require("../../config.json");
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import { _ } from "../../../../framework/src/IBlock";

const screenProps = {
  navigation: {
    navigate: jest.fn(),
  },
  id: "Contactus",
};

const feature = loadFeature(
  "./__tests__/features/contactusweb-scenario.feature"
);

const tempContactUsList = [
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
];

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
          data: tempContactUsList,
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

    then("contactus will render modal", () => {
      instance.setState({ contactUsList: tempContactUsList });
      expect(ContactUsWrapper).toBeTruthy();
    });

    then("contactus will click buttons without errors", () => {
      instance.setState({ contactUsList: tempContactUsList, isVisible: true });
      let buttonComponent = ContactUsWrapper.findWhere(
        (node) => node.prop("data-test-id") === "btnAddNewQuery"
      );
      buttonComponent.simulate("click");

      buttonComponent = ContactUsWrapper.findWhere(
        (node) => node.prop("data-test-id") === "btnViewContactItem"
      );
      buttonComponent.simulate("click");

      buttonComponent = ContactUsWrapper.findWhere(
        (node) => node.prop("data-test-id") === "btnDeleteContactUs"
      );
      buttonComponent.simulate("click");

      buttonComponent = ContactUsWrapper.findWhere(
        (node) => node.prop("data-test-id") === "btnCloseModal"
      );
      buttonComponent.simulate("click");

      expect(ContactUsWrapper).toBeTruthy();
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
        (node) => node.prop("data-test-id") === "btnSubmit"
      );
      buttonComponent.simulate("press");

      let textInputComponent = AddContactUsWrapper.findWhere(
        (node) => node.prop("data-test-id") === "txtName"
      );
      textInputComponent.simulate("change", { target: { value: "First" } });

      textInputComponent = AddContactUsWrapper.findWhere(
        (node) => node.prop("data-test-id") === "txtEmail"
      );
      textInputComponent.simulate("change", { target: { value: "a@b.com" } });

      textInputComponent = AddContactUsWrapper.findWhere(
        (node) => node.prop("data-test-id") === "txtPhoneNumber"
      );
      textInputComponent.simulate("change", {
        target: { value: "13105551212" },
      });

      textInputComponent = AddContactUsWrapper.findWhere(
        (node) => node.prop("data-test-id") === "txtComments"
      );
      textInputComponent.simulate("change", {
        target: { value: "N/A" },
      });

      // buttonComponent.simulate("press");
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
