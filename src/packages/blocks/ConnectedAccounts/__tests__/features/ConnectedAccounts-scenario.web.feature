Feature: ConnectedAccounts

    Scenario: User navigates to ConnectedAccounts
        Given I am a User loading ConnectedAccounts
        When I navigate to the ConnectedAccounts
        Then ConnectedAccounts will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors