Feature: Payments

    Scenario: User navigates to Payments
        Given I am a User loading Payments
        When I navigate to the Payments
        Then Payments will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors