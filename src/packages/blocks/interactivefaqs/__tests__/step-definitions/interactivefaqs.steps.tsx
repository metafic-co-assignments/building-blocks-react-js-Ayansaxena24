import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"
export const configJSON = require("../../config.json");
import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import React from "react";
import Interactivefaqs from "../../src/Interactivefaqs"
import AddInteractivefaqs from "../../src/AddInteractivefaqs"
const navigation = require("react-navigation")

const screenProps = {
    navigation: navigation,
    id: "Interactivefaqs"
  }

const feature = loadFeature('./__tests__/features/interactivefaqs-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}))
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to interactivefaqs', ({ given, when, then }) => {
        let interactiveFaqsWrapper:ShallowWrapper;
        let instance:Interactivefaqs; 

        given('I am a User loading interactivefaqs', () => {
            interactiveFaqsWrapper = shallow(<Interactivefaqs {...screenProps}/>)
            expect(interactiveFaqsWrapper).toBeTruthy();    

            instance = interactiveFaqsWrapper.instance()as Interactivefaqs;

            const getFaqAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
            getFaqAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), getFaqAPI.messageId);
            getFaqAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), 
            {
                "data": {
                    "faqs": [
                        {
                            "id": 10,
                            "title": "FAQ 4",
                            "content": "<html><head>This is a head</head><body>Hello. I am a body</body></html>",
                            "created_at": "2020-10-13T09:37:02.001Z",
                            "updated_at": "2020-10-13T09:37:02.001Z"
                        }
                    ]
                }
            });
            instance.faqApiCallId = getFaqAPI.messageId
            runEngine.sendMessage("Unit Test", getFaqAPI)

        });

        when('I navigate to the interactivefaqs', () => {
             instance = interactiveFaqsWrapper.instance() as Interactivefaqs

        });

        then('interactivefaqs will load with out errors', () => {
            expect(interactiveFaqsWrapper).toBeTruthy();
        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(interactiveFaqsWrapper).toBeTruthy();
        });
    });

    test('User can view any faq', ({ given, when, then }) => {
        let interactiveFaqsWrapper:ShallowWrapper;
        let instance:Interactivefaqs; 
        
        
        
        given('I am a User attempting to view a faq', () => {
            interactiveFaqsWrapper = shallow(<Interactivefaqs {...screenProps}/>)
            expect(interactiveFaqsWrapper).toBeTruthy();
        });

        when('I view a faq', () => {
             instance = interactiveFaqsWrapper.instance() as Interactivefaqs
             instance.setState({
                activeId:1,
                activeTitle:"test",
                activeContent:"test",
                activeCreatedAt:"2020-10-13T09:37:02.001Z",
                activeUpdatedAt:"2020-10-13T09:37:02.001Z",
                isVisible:!instance.state.isVisible})
        });

        then('I can view faq will load with out errors', () => {
        
            expect(instance.state.isVisible).toBe(true);
        });

    });

    test('User can delete any faq', ({ given, when, then }) => {
        let interactiveFaqsWrapper:ShallowWrapper;
        let instance:Interactivefaqs; 
        
        given('I am a User attempting to delete a faq', () => {
            interactiveFaqsWrapper = shallow(<Interactivefaqs {...screenProps}/>)
            expect(interactiveFaqsWrapper).toBeTruthy();
        });

        when('I delete a faq', () => {
             instance = interactiveFaqsWrapper.instance() as Interactivefaqs
             instance.deleteFaqApiCall(configJSON.faqApiEndPoint+`/1`)
        });

        then('I can delete faq will load with out errors', () => {
        
            expect(instance.deleteFaqApiCall(configJSON.faqApiEndPoint+`/1`)).toBe(true);
        });
        then('Rest Api will return success response', () => {
            const deleteSucessRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
            deleteSucessRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), deleteSucessRestAPI.messageId);
            deleteSucessRestAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {});
            instance.deleteFaqApiCallId = deleteSucessRestAPI.messageId
            runEngine.sendMessage("Unit Test", deleteSucessRestAPI)

        });

    });

    test('Empty title', ({ given, when, then }) => {
        let AddInteractiveFaqsWrapper:ShallowWrapper;
        let instance:AddInteractivefaqs; 

        given('I am a user attempting to add a faq', () => {
            AddInteractiveFaqsWrapper= shallow(<AddInteractivefaqs {...screenProps}/>)
            instance = AddInteractiveFaqsWrapper.instance()as AddInteractivefaqs;
            expect(AddInteractiveFaqsWrapper).toBeTruthy();
        });

        when('I am adding a faq with empty title', () => {
            instance = AddInteractiveFaqsWrapper.instance() as AddInteractivefaqs
            instance.setState({title: ""})
        });

        then('add faq should fail', async() => {
            expect(await instance.addFaqCall()).toBe(false);
        });

    });

    test('Empty content', ({ given, when, then }) => {
        let AddInteractiveFaqsWrapper:ShallowWrapper;
        let instance:AddInteractivefaqs; 

        given('I am a user attempting to add a faq', () => {
            AddInteractiveFaqsWrapper= shallow(<AddInteractivefaqs {...screenProps}/>)
            instance = AddInteractiveFaqsWrapper.instance()as AddInteractivefaqs;
            expect(AddInteractiveFaqsWrapper).toBeTruthy();
        });

        when('I am adding a faq with empty content', () => {
            instance = AddInteractiveFaqsWrapper.instance() as AddInteractivefaqs
            instance.setState({title: "FAQ title",content:""})
        });

        then('add faq should fail', async() => {
            expect(await instance.addFaqCall()).toBe(false);
        });

    });

    test('title and content', ({ given, when, then }) => {
        let AddInteractiveFaqsWrapper:ShallowWrapper;
        let instance:AddInteractivefaqs; 

        given('I am a user attempting to add a faq', () => {
            AddInteractiveFaqsWrapper= shallow(<AddInteractivefaqs {...screenProps}/>)
            instance = AddInteractiveFaqsWrapper.instance()as AddInteractivefaqs;
            expect(AddInteractiveFaqsWrapper).toBeTruthy();
        });

        when('I am adding a faq with title and content', () => {
            instance = AddInteractiveFaqsWrapper.instance() as AddInteractivefaqs
            instance.setState({title: "FAQ title",content:"<html><head>This is a head</head><body>Hello. I am a body</body></html>"})
        });

        then('add faq should succeed', () => {
            expect(instance.addFaqCall()).toBe(true);
        });
        then('Rest Api will return success response',()=>{
            const addFaqSucessRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
            addFaqSucessRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), addFaqSucessRestAPI.messageId);
            addFaqSucessRestAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
                "data": {
                    "faqs": [
                        {
                            "id": 26,
                            "title": "FAQ title",
                            "content": "<html><head>This is a head</head><body>Hello. I am a body</body></html>",
                            "created_at": "2020-10-15T10:56:49.547Z",
                            "updated_at": "2020-10-15T10:56:49.547Z"
                        }
                    ]
                },
            })

            instance.addFaqApiCallId = addFaqSucessRestAPI.messageId
            runEngine.sendMessage("Unit Test", addFaqSucessRestAPI)

        })

    });

});
