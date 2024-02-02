import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import React from "react";
import Notifications from "../../src/Notifications"
const navigation = require("react-navigation")

const screenProps = {
    navigation: navigation,
    id: "Notifications"
  }

const feature = loadFeature('./__tests__/features/Notifications-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}))
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to Notifications', ({ given, when, then }) => {
        let notificationsBlock:ShallowWrapper;
        let instance:Notifications; 

        given('I am a User loading Notifications', () => {
            notificationsBlock = shallow(<Notifications {...screenProps}/>)
        });

        when('I navigate to the Notifications', () => {
             instance = notificationsBlock.instance() as Notifications
        });

        then('Notifications will load with out errors', () => {

            const tokenMsg: Message = new Message(
                getName(MessageEnum.SessionResponseMessage)
              )
            tokenMsg.addData(getName(MessageEnum.SessionResponseToken), 'TOKEN')
            runEngine.sendMessage('Unit Test', tokenMsg)

            const msgNotificationsAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
            msgNotificationsAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgNotificationsAPI.messageId);
            msgNotificationsAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), 
                {"data":[{"id":"8","type":"notifications","attributes":{"id":8,"created_by":5,"headings":"Notifications heading","contents":"Notifications contents","app_url":"test/url","is_read":true,"read_at":"2021-12-21T17:56:15.713Z","created_at":"2021-12-21T17:55:42.972Z","updated_at":"2021-12-21T17:56:15.714Z","account":{"id":5,"first_name":"Firstname","last_name":"Lastname","full_phone_number":"13108540001","country_code":1,"phone_number":3108540001,"email":"tester@me.com","activated":true,"device_id":null,"unique_auth_id":null,"password_digest":"$2a$12$ckgZ.kZVE1HkJ29.Q1H6VODyCK8L.LwiiM0RzJ4XqoIVZRWMpCqsW","created_at":"2021-08-26T15:24:41.179Z","updated_at":"2021-08-26T15:24:41.179Z","user_name":null,"role_id":null}}},{"id":"16","type":"notifications","attributes":{"id":16,"created_by":5,"headings":"Notifications heading","contents":"Notifications contents","app_url":"test/url","is_read":false,"read_at":null,"created_at":"2021-12-21T17:56:37.374Z","updated_at":"2021-12-21T17:56:37.374Z","account":{"id":5,"first_name":"Firstname","last_name":"Lastname","full_phone_number":"13108540001","country_code":1,"phone_number":3108540001,"email":"tester@me.com","activated":true,"device_id":null,"unique_auth_id":null,"password_digest":"$2a$12$ckgZ.kZVE1HkJ29.Q1H6VODyCK8L.LwiiM0RzJ4XqoIVZRWMpCqsW","created_at":"2021-08-26T15:24:41.179Z","updated_at":"2021-08-26T15:24:41.179Z","user_name":null,"role_id":null}}}],"meta":{"message":"List of notifications."}}
            );
            instance.getDataCallId = msgNotificationsAPI.messageId
            runEngine.sendMessage("Unit Test", msgNotificationsAPI)

            const msgDeleteNotificationsAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
            msgDeleteNotificationsAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgDeleteNotificationsAPI.messageId);
            msgDeleteNotificationsAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), 
                {"message":"Deleted."}
            );
            instance.deleteCallId = msgDeleteNotificationsAPI.messageId
            runEngine.sendMessage("Unit Test", msgDeleteNotificationsAPI)

            const msgReadNotificationsAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
            msgReadNotificationsAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgReadNotificationsAPI.messageId);
            msgReadNotificationsAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), 
                {"message":"Done."}
            );
            instance.markAsReadCallId = msgReadNotificationsAPI.messageId
            runEngine.sendMessage("Unit Test", msgReadNotificationsAPI)
            
            expect(notificationsBlock).toBeTruthy()
        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(notificationsBlock).toBeTruthy()
        });
    });


});
