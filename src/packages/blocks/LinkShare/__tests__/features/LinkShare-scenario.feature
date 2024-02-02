Feature: LinkShare

    Scenario: User navigates to LinkShare
        Given I am a User loading LinkShare
        When I navigate to the LinkShare
        Then LinkShare will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors