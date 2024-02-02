Feature: Followers

    Scenario: User navigates to Followers
        Given I am a User loading Followers
        When I navigate to the Followers
        Then Followers will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors