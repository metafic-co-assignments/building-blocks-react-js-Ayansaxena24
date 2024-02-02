Feature: onboardingguide

    Scenario: User navigates to onboardingguide
        Given I am a User loading onboardingguide
        When I navigate to the onboardingguide
        Then onboardingguide will load with out errors
        And I can leave the screen with out errors