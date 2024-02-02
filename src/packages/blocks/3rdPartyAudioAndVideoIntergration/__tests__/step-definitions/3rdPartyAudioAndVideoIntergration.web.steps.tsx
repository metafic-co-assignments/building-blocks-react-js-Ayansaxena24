import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import 3rdPartyAudioAndVideoIntergration from "../../src/3rdPartyAudioAndVideoIntergration.web";
const navigation = require("react-navigation");

const screenProps = {
  navigation: navigation,
  id: "3rdPartyAudioAndVideoIntergration",
};

const feature = loadFeature(
  "./__tests__/features/3rdPartyAudioAndVideoIntergration-scenario.web.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to 3rdPartyAudioAndVideoIntergration", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: 3rdPartyAudioAndVideoIntergration;

    given("I am a User loading 3rdPartyAudioAndVideoIntergration", () => {
      exampleBlockA = shallow(<3rdPartyAudioAndVideoIntergration {...screenProps} />);
    });

    when("I navigate to the 3rdPartyAudioAndVideoIntergration", () => {
      instance = exampleBlockA.instance() as 3rdPartyAudioAndVideoIntergration;
    });

    then("3rdPartyAudioAndVideoIntergration will load with out errors", () => {
      expect(exampleBlockA).toBeTruthy();
    });

    then("I can enter text with out errors", () => {
      let textInputComponent = exampleBlockA.findWhere(
        (node) => node.prop("data-test-id") === "txtInput"
      );
      const event = {
        preventDefault() {},
        target: { value: "hello@aol.com" },
      };
      textInputComponent.simulate("change", event);
    });

    then("I can select the button with with out errors", () => {
      let buttonComponent = exampleBlockA.findWhere(
        (node) => node.prop("data-test-id") === "btnAddExample"
      );
      buttonComponent.simulate("press");
      expect(exampleBlockA).toBeTruthy();
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(exampleBlockA).toBeTruthy();
    });
  });
});
