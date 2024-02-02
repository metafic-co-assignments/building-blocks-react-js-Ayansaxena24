import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import React from "react";
import MobileAccountLoginBlock from "../../src/MobileAccountLoginBlock"

const navigation = require("react-navigation")

const screenProps = {
    navigation: navigation,
    id: "MobileAccountLoginBlock"
  }

const feature = loadFeature('./__tests__/features/mobile-account-login-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}))
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to Mobile Log In', ({ given, when, then }) => {
        let mobileAccountLogInWrapper:ShallowWrapper;
        let instance:MobileAccountLoginBlock; 

        given('I am a User attempting to Log In with a Mobile Phone', () => {
            mobileAccountLogInWrapper = shallow(<MobileAccountLoginBlock {...screenProps}/>)
            expect(mobileAccountLogInWrapper).toBeTruthy()
            expect(mobileAccountLogInWrapper).toMatchSnapshot()     
        });

        when('I navigate to the Log In Screen', () => {
             instance = mobileAccountLogInWrapper.instance() as MobileAccountLoginBlock
        });
        
        then('I can select Log In with Soical Media Account', () => {
            let btnSocialLogin= mobileAccountLogInWrapper.findWhere((node) => node.prop('testID') === 'btnSocialLogin');
            btnSocialLogin.simulate('press')
            instance.goToSocialLogin()
            expect(mobileAccountLogInWrapper).toBeTruthy()
            expect(mobileAccountLogInWrapper).toMatchSnapshot()
        });

        then('I can select Log In with Email Account', () => {
            let btnEmailLogin= mobileAccountLogInWrapper.findWhere((node) => node.prop('testID') === 'btnEmailLogin');
            btnEmailLogin.simulate('press')
            instance.goToEmailLogin()
            expect(mobileAccountLogInWrapper).toBeTruthy()
            expect(mobileAccountLogInWrapper).toMatchSnapshot()
        });

        then('I can select a Country Code with out errors', () => {
           
            let msg = new Message(getName(MessageEnum.CountryCodeMessage))
            msg.addData
                (getName(MessageEnum.CountyCodeDataMessage)
                , "266"
            )
            runEngine.sendMessage("Unit Test", msg)
            expect(mobileAccountLogInWrapper.debug()).toContain("266")

            msg = new Message(getName(MessageEnum.CountryCodeMessage))
            msg.addData
                (getName(MessageEnum.CountyCodeDataMessage)
                , "ABC +3833"
            )
            runEngine.sendMessage("Unit Test", msg)

            msg = new Message(getName(MessageEnum.CountryCodeMessage))
            runEngine.sendMessage("Unit Test", msg)

            expect(mobileAccountLogInWrapper.debug()).not.toContain("266")
            expect(mobileAccountLogInWrapper.debug()).not.toContain("ABC")
            expect(mobileAccountLogInWrapper.debug()).toContain("3833")
            expect(mobileAccountLogInWrapper).toMatchSnapshot()
        });

        then('I can toggle the Password Show/Hide with out errors', () => {
            let buttonComponent = mobileAccountLogInWrapper.findWhere((node) => node.prop('testID') === 'btnPasswordShowHide');
            buttonComponent.simulate('press')
            expect(mobileAccountLogInWrapper).toMatchSnapshot()
        });

        then('I can toggle the Remember Me with out errors', () => {
            
            let buttonComponent = mobileAccountLogInWrapper.findWhere((node) => node.prop('testID') === 'btnRememberMe');
            buttonComponent.simulate('press')
            expect(mobileAccountLogInWrapper).toMatchSnapshot()

            let coutryCodeSelector= mobileAccountLogInWrapper.findWhere((node) => node.prop('testID') === 'CustomCheckBox');
            coutryCodeSelector.simulate('changeValue', true);
            expect(mobileAccountLogInWrapper).toMatchSnapshot()

        });

        then('I can select the Log In button with out errors', () => {
            let buttonComponent = mobileAccountLogInWrapper.findWhere((node) => node.prop('testID') === 'btnMobileLogIn');
            buttonComponent.simulate('press')
            expect(mobileAccountLogInWrapper).toMatchSnapshot()
        });

        then('I can select the Forgot Password button with out errors', () => {
            let buttonComponent = mobileAccountLogInWrapper.findWhere((node) => node.prop('testID') === 'btnForgotPassword');
            buttonComponent.simulate('press')
            expect(mobileAccountLogInWrapper).toMatchSnapshot()
        });


        then('I can enter a phone number with out errors', () => {
            let textInputComponent = mobileAccountLogInWrapper.findWhere((node) => node.prop('testID') === 'txtInputPhoneNumber');
            textInputComponent.simulate('changeText', '3105551111');

            let buttonComponent = mobileAccountLogInWrapper.findWhere((node) => node.prop('testID') === 'Background');
            buttonComponent.simulate('press')

            expect(mobileAccountLogInWrapper).toMatchSnapshot()
        });

        then('I can enter a password with out errors', () => {
            let textInputComponent = mobileAccountLogInWrapper.findWhere((node) => node.prop('testID') === 'txtInputPassword');
            textInputComponent.simulate('changeText', 'passWord1!');
            expect(mobileAccountLogInWrapper).toMatchSnapshot()
        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(mobileAccountLogInWrapper).toBeTruthy()
            expect(mobileAccountLogInWrapper).toMatchSnapshot()
        });
    });

    test('Empty Mobile Phone Number', ({ given, when, then }) => {
        let mobileAccountLogInWrapper:ShallowWrapper;
        let instance:MobileAccountLoginBlock; 

        given('I am a User attempting to Log In with a Mobile Phone', () => {
            mobileAccountLogInWrapper = shallow(<MobileAccountLoginBlock {...screenProps}/>)
            expect(mobileAccountLogInWrapper).toBeTruthy()
            expect(mobileAccountLogInWrapper).toMatchSnapshot()
        });

        when('I Log In with an empty Mobile Phone Number', () => {
             instance = mobileAccountLogInWrapper.instance() as MobileAccountLoginBlock
             instance.setState({countryCodeSelected: "1", mobileNo: "", password: ""})
        });

        then('Log In Should Fail', () => {
         expect(instance.doMobileLogIn()).toBe(false);
        });
    });

    test('Mobile Phone Number and Empty Password', ({ given, when, then }) => {
        let mobileAccountLogInWrapper:ShallowWrapper;
        let instance:MobileAccountLoginBlock; 

        given('I am a User attempting to Log In with a Mobile Phone', () => {
            mobileAccountLogInWrapper = shallow(<MobileAccountLoginBlock {...screenProps}/>)
            expect(mobileAccountLogInWrapper).toBeTruthy()
            expect(mobileAccountLogInWrapper).toMatchSnapshot()
        });

        when('I Log In with a Mobile Phone Number and empty Password', () => {
             instance = mobileAccountLogInWrapper.instance() as MobileAccountLoginBlock
             instance.setState({countryCodeSelected: "1", mobileNo: "3105551212", password: ""})
        });

        then('Log In Should Fail', () => {
         expect(instance.doMobileLogIn()).toBe(false);
        });
    });

    test('Password and Empty Mobile Phone Number', ({ given, when, then }) => {
        let mobileAccountLogInWrapper:ShallowWrapper;
        let instance:MobileAccountLoginBlock; 

        given('I am a User attempting to Log In with a Mobile Phone', () => {
            mobileAccountLogInWrapper = shallow(<MobileAccountLoginBlock {...screenProps}/>)
            expect(mobileAccountLogInWrapper).toBeTruthy()
            expect(mobileAccountLogInWrapper).toMatchSnapshot()
        });

        when('I Log In with a Password and empty Mobile Phone Number', () => {
             instance = mobileAccountLogInWrapper.instance() as MobileAccountLoginBlock
             instance.setState({countryCodeSelected: "1", mobileNo: "", password: "password"})
        });

        then('Log In Should Fail', () => {
         expect(instance.doMobileLogIn()).toBe(false);
        });
    });

    test('Mobile Phone Number, Password and have not selected a Country Code', ({ given, when, then }) => {
        let mobileAccountLogInWrapper:ShallowWrapper;
        let instance:MobileAccountLoginBlock; 

        given('I am a User attempting to Log In with a Mobile Phone', () => {
            mobileAccountLogInWrapper = shallow(<MobileAccountLoginBlock {...screenProps}/>)
            expect(mobileAccountLogInWrapper).toBeTruthy()
            expect(mobileAccountLogInWrapper).toMatchSnapshot()
        });

        when('I Log In with Mobile Phone Number, Password and do not select a Country Code', () => {
             instance = mobileAccountLogInWrapper.instance() as MobileAccountLoginBlock
             instance.setState({countryCodeSelected: "", mobileNo: "3105551212", password: "password"})
        });

        then('Log In Should Fail', () => {
         expect(instance.doMobileLogIn()).toBe(false);
        });

        then('RestAPI will return an error', () => {
          
            const msgLogInErrorRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
            msgLogInErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgLogInErrorRestAPI);
            msgLogInErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), 
            {
                "errors": [
                    {
                        "failed_login": "Login Failed"
                    }
                ]
            });

            instance.apiPhoneLoginCallId = msgLogInErrorRestAPI
            runEngine.sendMessage("Unit Test", msgLogInErrorRestAPI)

        });
    });

    test('Mobile Phone Number, Password and have selected a Country Code', ({ given, when, then }) => {
       
        let mobileAccountLogInWrapper:ShallowWrapper;
        let instance:MobileAccountLoginBlock; 

        given('I am a Registed User attempting to Log In with a Mobile Phone', () => {
            mobileAccountLogInWrapper = shallow(<MobileAccountLoginBlock {...screenProps}/>)
            expect(mobileAccountLogInWrapper).toBeTruthy()
            expect(mobileAccountLogInWrapper).toMatchSnapshot()
        });

        when('I Log In with Mobile Phone Number, Password and have a Country Code', () => {
             instance = mobileAccountLogInWrapper.instance() as MobileAccountLoginBlock
             instance.setState({countryCodeSelected: "266", mobileNo: "3105551212", password: "password"})
        });

        then('Log In Should Succeed', () => {
            let empty:any
            instance.saveLoggedInUserData(empty)
            expect(instance.doMobileLogIn()).toBe(true);
        });

        then('RestAPI will return token', () => {
            const magLogInSucessRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
            magLogInSucessRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), magLogInSucessRestAPI);
            magLogInSucessRestAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
                "meta": {
                    "token": "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MTAsInR5cGUiOiJTbXNBY2NvdW50IiwiZXhwIjoxNTc2Njk1ODk4fQ.kB2_Z10LNwDmbo6B39esgM0vG9qTAG4U9uLxPBYrCX5PCro0LxQHI9acwVDnfDPsqpWYvQmoejC2EO8MFoEz7Q"
                }
            });
            instance.apiPhoneLoginCallId = magLogInSucessRestAPI
            runEngine.sendMessage("Unit Test", magLogInSucessRestAPI)
        });
    });

    test('Remember Me - Mobile Phone Account Log In', ({ given, when, then }) => {
        let mobileAccountLogInWrapper:ShallowWrapper;
        let instance:MobileAccountLoginBlock; 

        given('I am a Registed User who has already Logged In and selected Remember Me', () => {
            mobileAccountLogInWrapper = shallow(<MobileAccountLoginBlock {...screenProps}/>)
            expect(mobileAccountLogInWrapper).toBeTruthy()
            expect(mobileAccountLogInWrapper).toMatchSnapshot()
        });

        when('I navigate to Mobile Phone Account Log In', () => {
            
            instance = mobileAccountLogInWrapper.instance() as MobileAccountLoginBlock

            const msgRestoreCreds = new Message(getName(MessageEnum.ReciveUserCredentials))
            msgRestoreCreds.addData( getName(MessageEnum.LoginPassword), "passWord1!")
            msgRestoreCreds.addData( getName(MessageEnum.LoginCountryCode), "266")
            msgRestoreCreds.addData( getName(MessageEnum.LoginUserName), "3105551212")
            runEngine.sendMessage("Unit Test", msgRestoreCreds)

            const msgBadRestoreCreds = new Message(getName(MessageEnum.ReciveUserCredentials))
            msgBadRestoreCreds.addData( getName(MessageEnum.LoginPassword), "passWord1!")
            msgBadRestoreCreds.addData( getName(MessageEnum.LoginUserName), "3105551212")
            runEngine.sendMessage("Unit Test", msgBadRestoreCreds)
        });

        then('The Country Code, Mobile Phone Number and Password will be restored', () => {
            expect(instance.doMobileLogIn()).toBe(true);
            expect(mobileAccountLogInWrapper).toBeTruthy()
            expect(mobileAccountLogInWrapper).toMatchSnapshot()     
        });
    });
    

});
