Feature: CfPayoutBankApi

    Scenario: User navigates to CfPayoutBankApi
        Given I am a User loading CfPayoutBankApi
        When I navigate to the CfPayoutBankApi
        Then CfPayoutBankApi will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors