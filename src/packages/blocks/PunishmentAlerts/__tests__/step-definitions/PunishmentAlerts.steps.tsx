import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import React from "react";
import PunishmentAlerts from "../../src/PunishmentAlerts"
const navigation = require("react-navigation")

const screenProps = {
    navigation: navigation,
    id: "PunishmentAlerts"
  }

const feature = loadFeature('./__tests__/features/PunishmentAlerts-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to PunishmentAlerts', ({ given, when, then }) => {
        let exampleBlockA:ShallowWrapper;
        let instance:PunishmentAlerts; 

        given('I am a User loading PunishmentAlerts', () => {
            exampleBlockA = shallow(<PunishmentAlerts {...screenProps}/>);
        });

        when('I navigate to the PunishmentAlerts', () => {
             instance = exampleBlockA.instance() as PunishmentAlerts
        });

        then('PunishmentAlerts will load with out errors', () => {
            expect(exampleBlockA).toBeTruthy();
        });

        then('I can enter text with out errors', () => {
            let textInputComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'txtInput');
            textInputComponent.simulate('changeText', 'hello@aol.com');
        });

        then('I can select the button with with out errors', () => {
            let buttonComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'btnExample');
            buttonComponent.simulate('press');
            expect(instance.state.txtSavedValue).toEqual("hello@aol.com");
        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(exampleBlockA).toBeTruthy();
        });
    });


});
