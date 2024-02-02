import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import * as helpers from "../../../../framework/src/Helpers";
import React from "react";
import Dashboard from "../../src/Dashboard";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName
} from "../../../../framework/src/Messages/MessageEnum";

const navigation = require("react-navigation");
const screenProps = {
  navigation: navigation,
  id: "Dashboard"
};
const feature = loadFeature("./__tests__/features/dashboard-scenario.feature");

defineFeature(feature, test => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to dashboard", ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: Dashboard;
    given("I am a User loading dashboard", () => {
      dashboardWrapper = shallow(<Dashboard {...screenProps} />);
      expect(dashboardWrapper).toBeTruthy();
      expect(dashboardWrapper).toMatchSnapshot();
    });

    when("I navigate to the dashboard", () => {
      instance = dashboardWrapper.instance() as Dashboard;
      expect(dashboardWrapper).toBeTruthy();
      expect(dashboardWrapper).toMatchSnapshot();
    });

    then("dashboard will load with out errors", () => {
      expect(dashboardWrapper).toBeTruthy();
      expect(dashboardWrapper).toMatchSnapshot();
    });

    then("Dashboard will display messages", () => {
  
      const tokenMsg: Message = new Message(getName(MessageEnum.SessionResponseMessage));
      tokenMsg.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      runEngine.sendMessage("Unit Test", tokenMsg);

      const apiMsg: Message = new Message(getName(MessageEnum.RestAPIResponceMessage));
      apiMsg.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {data:[{id:1,type:"dashboard",attributes:{id:1,title:"Dashboard_title_1",value:1,created_at:"2021-03-08T17:10:08.139Z",updated_at:"2021-03-08T17:10:08.139Z"}},{id:2,type:"dashboard",attributes:{id:2,title:"Dashboard 5",value:5,created_at:"2021-03-08T17:10:36.867Z",updated_at:"2021-03-08T17:10:36.867Z"}}]})
      runEngine.sendMessage("Unit Test", apiMsg);

      expect(dashboardWrapper).toBeTruthy();
      expect(dashboardWrapper).toMatchSnapshot();

    });

    then("Dashboard will display notifcation if no messages", () => {
      const apiNoItemsMsg: Message = new Message(getName(MessageEnum.RestAPIResponceMessage));
      apiNoItemsMsg.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {data:[]})
      runEngine.sendMessage("Unit Test", apiNoItemsMsg);

      expect(dashboardWrapper).toBeTruthy();
      expect(dashboardWrapper).toMatchSnapshot();
    });

    then("Dashboard will display notifcation if API failure", () => {
      const apiNoItemsMsg: Message = new Message(getName(MessageEnum.RestAPIResponceMessage));
      apiNoItemsMsg.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {data:[]})
      runEngine.sendMessage("Unit Test", apiNoItemsMsg);

      const apiErrorResponceMsg: Message = new Message(getName(MessageEnum.RestAPIResponceMessage));
      apiErrorResponceMsg.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {errors:"Error"})
      runEngine.sendMessage("Unit Test", apiErrorResponceMsg);

      const apiFailedErrorResponceMsg: Message = new Message(getName(MessageEnum.RestAPIResponceMessage));
      runEngine.sendMessage("Unit Test", apiFailedErrorResponceMsg);
      
      expect(dashboardWrapper).toBeTruthy();
      expect(dashboardWrapper).toMatchSnapshot();
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(dashboardWrapper).toBeTruthy();
      expect(dashboardWrapper).toMatchSnapshot();
    });

  });
});
