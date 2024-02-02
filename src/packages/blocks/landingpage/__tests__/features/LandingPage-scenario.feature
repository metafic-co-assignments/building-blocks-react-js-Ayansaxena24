Feature: LandingPage

    Scenario: User navigates to LandingPage
        Given I am a User loading LandingPage
        When I navigate to the LandingPage
        Then LandingPage will load with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors
