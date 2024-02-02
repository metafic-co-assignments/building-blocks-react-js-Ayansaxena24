Feature: customform

    Scenario: User navigates to customform
        Given I am a User loading customform
        When I navigate to the customform
        Then customform will load with out errors
        And I can enter firm name with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors