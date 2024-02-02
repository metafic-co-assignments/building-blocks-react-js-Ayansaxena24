Feature: RefundManagement

    Scenario: User navigates to RefundManagement
        Given I am a User loading RefundManagement
        When I navigate to the RefundManagement
        Then RefundManagement will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors