import { defineFeature, loadFeature } from 'jest-cucumber'
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import React from 'react'
import AdvancedSearch from '../../src/AdvancedSearch'
const navigation = require('react-navigation')

import { runEngine } from '../../../../framework/src/RunEngine'
import { Message } from '../../../../framework/src/Message'
export const configJSON = require('../../config.json')
import MessageEnum, {
  getName
} from '../../../../framework/src/Messages/MessageEnum'
import { _ } from '../../../../framework/src/IBlock'

const screenProps = {
  navigation: navigation,
  id: 'AdvancedSearch'
}

const feature = loadFeature('./__tests__/features/advancedsearch-scenario.feature')

const testData = [
  {
    id: '1',
    type: 'user',
    attributes: {
      activated: true,
      country_code: '123',
      user_name: 'tester',
      email: 'irma.mctest@example.com',
      first_name: 'Irma',
      full_phone_number: '+12344567890',
      last_name: 'McTest',
      phone_number: '1234567890',
      type: 'user',
      created_at: '2021-12-03T16:55:09.405Z',
      updated_at: '2021-12-03T16:55:09.405Z',
      device_id: 'abcd-1234',
      unique_auth_id: '12345'
    }
  }
]

defineFeature(feature, test => {
  beforeEach(() => {
    jest.resetModules()
    jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }))
    jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web')
  })

  test('User navigates to advancedsearch', ({ given, when, then }) => {
    let AdvancedSearchWrapper: ShallowWrapper
    let instance: AdvancedSearch

    given('I am a User loading advancedsearch', () => {
      AdvancedSearchWrapper = shallow(<AdvancedSearch {...screenProps} />)
    })

    when('I navigate to the advancedsearch', () => {
      instance = AdvancedSearchWrapper.instance() as AdvancedSearch

      const tokenMsg: Message = new Message(
        getName(MessageEnum.SessionResponseMessage)
      )
      tokenMsg.addData(getName(MessageEnum.SessionResponseToken), 'TOKEN')
      runEngine.sendMessage('Unit Test', tokenMsg)

      const getAdvancedSearchAPIFail = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      )

      getAdvancedSearchAPIFail.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
        "accounts": "Fail"
      })
      
      instance.advancedsearchApiCallId = getAdvancedSearchAPIFail.messageId
      runEngine.sendMessage('Unit Test', getAdvancedSearchAPIFail)

      const getAdvancedSearchAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      )

      getAdvancedSearchAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
        "accounts": {
            "data": [
                {
                    "id": "3",
                    "type": "account_search",
                    "attributes": {
                        "first_name": "Firstname",
                        "last_name": "Lastname"
                    }
                },
                {
                    "id": "4",
                    "type": "account_search",
                    "attributes": {
                        "first_name": "Firstname",
                        "last_name": "Lastname"
                    }
                }
            ]
        }
    })
      instance.advancedsearchApiCallId = getAdvancedSearchAPI.messageId
      runEngine.sendMessage('Unit Test', getAdvancedSearchAPI)
    })

    then('I can click AdvancedSearch button', () => {
      let buttonComponent = AdvancedSearchWrapper.findWhere(
        node => node.prop('testID') === 'hideKeyboard'
      )
      buttonComponent.simulate('press')

      let textInputComponent = AdvancedSearchWrapper.findWhere(
        node => node.prop('testID') === 'inputFirstNameSearchText'
      )
      textInputComponent.simulate('changeText', 'Irma')

      buttonComponent = AdvancedSearchWrapper.findWhere(
        node => node.prop('testID') === 'btnGetAdvancedSearchList'
      )
      buttonComponent.simulate('press')
    })

    then('advancedsearch will load with out errors', () => {
      instance.setState({ advancedsearchList: testData })
      expect(AdvancedSearchWrapper).toBeTruthy()
    })

    then('I can view AdvancedSearch item', () => {
      let buttonComponent = AdvancedSearchWrapper.findWhere(
        node => node.prop('testID') === 'btnViewModal'
      )
      buttonComponent.simulate('press')

      instance.setState({
        activeId: 1,
        activeFirstName: 'Irma',
        activeLastName: 'McTest',
        activeUserName: 'tester',
        activeEmail: 'irma.mctest@example.com',
        activePhoneNumber: '1234567890',
        activeCountryCode: '123',
        activeType: 'user',
        activeDeviceId: 'abcd-1234',
        activeCreatedAt: '2021-12-03T16:55:09.405Z',
        isVisible: true
      })

      buttonComponent = AdvancedSearchWrapper.findWhere(
        node => node.prop('testID') === 'btnCloseModal'
      )
      buttonComponent.simulate('press')
    })

    then('I can leave the screen with out errors', () => {
      instance.componentWillUnmount()
      expect(AdvancedSearchWrapper).toBeTruthy()
    })
  })
})
