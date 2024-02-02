import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'

import React from "react";
import Splashscreen from "../../src/Splashscreen"
const navigation = require("react-navigation")

const screenProps = {
    navigation: navigation,
    id: "Splashscreen"
  }

const feature = loadFeature('./__tests__/features/splashscreen-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}))
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to Splashscreen', ({ given, when, then }) => {
        let splashscreen:ShallowWrapper;
        let instance:Splashscreen; 

        given('I am a User loading Splashscreen', () => {
            splashscreen = shallow(<Splashscreen {...screenProps}/>)
            splashscreen.setState({timeout: 0})
        });

        when('I navigate to the Splashscreen', () => {
             instance = splashscreen.instance() as Splashscreen
        });

        then('Splashscreen will load with out errors', () => {
            expect(Splashscreen).toBeTruthy()
        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(Splashscreen).toBeTruthy()
        });
    });
    
});
