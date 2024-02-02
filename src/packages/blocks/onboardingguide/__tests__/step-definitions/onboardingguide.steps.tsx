import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
// import {runEngine} from '../../../../framework/src/RunEngine'
// import {Message} from "../../../../framework/src/Message"

// import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import React from "react";
import Onboardingguide from "../../src/Onboardingguide"
const navigation = require("react-navigation")  

const screenProps = {
    navigation: navigation,
    id: "Onboardingguide"
  }    

const feature = loadFeature('./__tests__/features/onboardingguide-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}))
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    }); 

    test('User navigates to onboardingguide', ({ given, when, then }) => {
      let OnboardingGuideWrapper:ShallowWrapper;
        let instance:Onboardingguide; 

        given('I am a User loading onboardingguide', () => {
          OnboardingGuideWrapper= shallow(<Onboardingguide {...screenProps}/>)
          expect(OnboardingGuideWrapper).toBeTruthy();
          expect(OnboardingGuideWrapper).toMatchSnapshot();
        });

        when('I navigate to the onboardingguide', () => {
           
             instance = OnboardingGuideWrapper.instance()as Onboardingguide;
           
        });

        then('onboardingguide will load with out errors', () => {
            expect(OnboardingGuideWrapper).toBeTruthy()
            expect(OnboardingGuideWrapper).toMatchSnapshot()

            
        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(OnboardingGuideWrapper).toBeTruthy()
            expect(OnboardingGuideWrapper).toMatchSnapshot()
        });
    });


});
