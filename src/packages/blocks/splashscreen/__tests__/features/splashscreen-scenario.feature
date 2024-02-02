Feature: Splashscreen

    Scenario: User navigates to Splashscreen
        Given I am a User loading Splashscreen
        When I navigate to the Splashscreen
        Then Splashscreen will load with out errors
        And I can leave the screen with out errors