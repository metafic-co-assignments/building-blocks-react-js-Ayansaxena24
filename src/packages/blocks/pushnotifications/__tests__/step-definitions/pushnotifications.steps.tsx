import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import Pushnotifications from "../../src/Pushnotifications";
const navigation = require("react-navigation");

const screenProps = {
  navigation: {
    navigate: jest.fn(),
  },
  id: "Pushnotifications",
};

const feature = loadFeature(
  "./__tests__/features/pushnotifications-scenario.feature"
);

const mockNotifications = [
  {
    attributes: {
      created_at: new Date().toISOString(),
      remarks: "This is the first push notification title",
    },
    id: 1,
  },
  {
    attributes: {
      created_at: new Date().toISOString(),
      remarks: "Second notification",
    },
    id: 2,
  },
];

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to pushnotifications", ({ given, when, then }) => {
    let pushnotificationsBlock: ShallowWrapper;
    let instance: Pushnotifications;

    given("I am a User loading pushnotifications", () => {
      pushnotificationsBlock = shallow(<Pushnotifications {...screenProps} />);
    });

    when("I navigate to the pushnotifications", () => {
      instance = pushnotificationsBlock.instance() as Pushnotifications;
    });

    then("pushnotifications will load with out errors", () => {
      instance = pushnotificationsBlock.instance() as Pushnotifications;
      instance.componentDidMount();
      instance.getNotifications(instance.state.token);
      expect(pushnotificationsBlock).toBeTruthy();
    });

    then("pushnotifications will render with mock data", () => {
      instance = pushnotificationsBlock.instance() as Pushnotifications;
      instance.setState({ notifications: mockNotifications, loading: false });
      expect(pushnotificationsBlock).toBeTruthy();
    });

    then("pushnotifications will render with empty data", () => {
      instance = pushnotificationsBlock.instance() as Pushnotifications;
      instance.setState({ notifications: [], loading: false });
      expect(pushnotificationsBlock).toBeTruthy();
    });

    then("pushnotifications will load notifications from the server", () => {

      const tokenMsg: Message = new Message(getName(MessageEnum.SessionResponseMessage));
      tokenMsg.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      runEngine.sendMessage("Unit Test", tokenMsg);
      
      instance = pushnotificationsBlock.instance() as Pushnotifications;
      const msgLoadAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgLoadAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLoadAPI.messageId
      );
      msgLoadAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
        data: [{"id":"1","type":"push_notification","attributes":{"push_notificable_id":5,"push_notificable_type":"AccountBlock::Account","remarks":"remarks","is_read":false,"created_at":"2021-10-01T22:08:16.797Z","updated_at":"2021-10-01T22:08:16.797Z","account":{"data":{"id":"5","type":"sms_account","attributes":{"first_name":"Firstname","last_name":"Lastname","full_phone_number":"13108540001","country_code":1,"phone_number":3108540001,"email":"tester@me.com","activated":true}}},"looking_for":[],"profile_image":{}}}]
      });
      instance.apiNotificationsCallId = msgLoadAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadAPI);
      expect(pushnotificationsBlock).toBeTruthy();
    });

    then("I can click the notificatio item", () => {
      let notificationItem = pushnotificationsBlock
        .findWhere((node) => node.prop("testID") === "notificationItem")
        .first();

      notificationItem.simulate("press");
      expect(pushnotificationsBlock).toBeTruthy();
    });

    then("pushnotifications failed to load data from the server", () => {
      instance = pushnotificationsBlock.instance() as Pushnotifications;
      const msgLoadFailRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgLoadFailRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLoadFailRestAPI
      );
      msgLoadFailRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          errors: [
            {
              message: "Failed to load notifications",
            },
          ],
        }
      );

      msgLoadFailRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLoadFailRestAPI.messageId
      );
      instance.apiNotificationsCallId = msgLoadFailRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadFailRestAPI);
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(pushnotificationsBlock).toBeTruthy();
    });
  });
});
