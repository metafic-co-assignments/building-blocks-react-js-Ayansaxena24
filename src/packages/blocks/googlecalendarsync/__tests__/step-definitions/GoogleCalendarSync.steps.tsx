import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import React from "react";
import GoogleCalendarSync from "../../src/GoogleCalendarSync"
const navigation = require("react-navigation")

const screenProps = {
    navigation: navigation,
    id: "GoogleCalendarSync"
  }

const feature = loadFeature('./__tests__/features/GoogleCalendarSync-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to GoogleCalendarSync', ({ given, when, then }) => {
        let GoogleCalendarSyncBlock:ShallowWrapper;
        let instance:GoogleCalendarSync; 

        given('I am a User loading GoogleCalendarSync', () => {
            GoogleCalendarSyncBlock = shallow(<GoogleCalendarSync {...screenProps}/>);
        });

        when('I navigate to the GoogleCalendarSync', () => {
             instance = GoogleCalendarSyncBlock.instance() as GoogleCalendarSync
        });

        then('GoogleCalendarSync will load with out errors', () => {
            expect(GoogleCalendarSyncBlock).toBeTruthy();
        });

        then('I can enter text with out errors', () => {
           
            let buttonComponent = GoogleCalendarSyncBlock.findWhere((node) => node.prop('testID') === 'btnSignIn');
            buttonComponent.simulate('press'); 

            instance.setState({isSingedIn: true});

            buttonComponent = GoogleCalendarSyncBlock.findWhere((node) => node.prop('testID') === 'btnOpenModal');
            buttonComponent.simulate('press'); 

            let textInputComponent = GoogleCalendarSyncBlock.findWhere((node) => node.prop('testID') === 'txtInputLocation');
            textInputComponent.simulate('changeText', 'Long Beach, CA');

            textInputComponent = GoogleCalendarSyncBlock.findWhere((node) => node.prop('testID') === 'txtInputDescription');
            textInputComponent.simulate('changeText', 'Meeting');

            textInputComponent = GoogleCalendarSyncBlock.findWhere((node) => node.prop('testID') === 'txtInputAttendees');
            textInputComponent.simulate('changeText', '1234 Any City USA');

            instance.setState({openDatePicker: "TRUE"});

        });

        then('I can select the close button with with out errors', () => {

            let buttonComponent = GoogleCalendarSyncBlock.findWhere((node) => node.prop('testID') === 'btnCloseModal');
            buttonComponent.simulate('press'); 

            const getEventsErrroAPI = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
        
            getEventsErrroAPI.addData(
            getName(MessageEnum.RestAPIResponceSuccessMessage),
            {
                error: "Failed",
            }
            );

            getEventsErrroAPI.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                getEventsErrroAPI.messageId
              );

            instance.getEventCallId = getEventsErrroAPI.messageId;
            runEngine.sendMessage("Unit Test", getEventsErrroAPI);

            const getEventsAPI = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
              );
        
              getEventsAPI.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                {
                  data: {},
                }
              );

              getEventsAPI.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                getEventsErrroAPI.messageId
              );

              instance.getEventCallId = getEventsAPI.messageId;
              runEngine.sendMessage("Unit Test", getEventsAPI);


              const addEventsAPI = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
              );
        

              addEventsAPI.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                addEventsAPI.messageId
              );

              addEventsAPI.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                {
                  data: {},
                }
              );
              instance.addEventCallId = addEventsAPI.messageId;
              runEngine.sendMessage("Unit Test", addEventsAPI);

              

        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(GoogleCalendarSyncBlock).toBeTruthy();
        });
    });


});
