import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import GoogleCalendarSync from "../../src/GoogleCalendarSync.web";
const navigation = require("react-navigation");

const screenProps = {
  navigation: navigation,
  id: "GoogleCalendarSync",
};

const feature = loadFeature(
  "./__tests__/features/GoogleCalendarSync-scenario.web.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to GoogleCalendarSync", ({ given, when, then }) => {
    let googleCalendarSyncBlock: ShallowWrapper;
    let instance: GoogleCalendarSync;

    given("I am a User loading GoogleCalendarSync", () => {
      googleCalendarSyncBlock = shallow(<GoogleCalendarSync {...screenProps} />);
    });

    when("I navigate to the GoogleCalendarSync", () => {
      instance = googleCalendarSyncBlock.instance() as GoogleCalendarSync;
    });

    then("GoogleCalendarSync will load with out errors", () => {
      expect(googleCalendarSyncBlock).toBeTruthy();
    });

    then("I can enter text with out errors", () => {
      // let textInputComponent = googleCalendarSyncBlock.findWhere(
      //   (node) => node.prop("data-test-id") === "txtInput"
      // );
      // const event = {
      //   preventDefault() {},
      //   target: { value: "hello@aol.com" },
      // };
      // textInputComponent.simulate("change", event);
    });

    then("I can select the button with with out errors", () => {
      let buttonComponent = googleCalendarSyncBlock.findWhere(
        (node) => node.prop("data-test-id") === "btnSignIn"
      );
      buttonComponent.simulate("press");

      instance.setState({authDetails: "LOGIN"})

      buttonComponent = googleCalendarSyncBlock.findWhere(
        (node) => node.prop("data-test-id") === "btnAddEvent"
      );
      buttonComponent.simulate("press");

    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(googleCalendarSyncBlock).toBeTruthy();
    });
  });
});
