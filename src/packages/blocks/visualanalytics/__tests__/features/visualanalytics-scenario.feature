Feature: visualanalytics

    Scenario: User navigates to visualanalytics
        Given I am a User loading visualanalytics
        When I navigate to the visualanalytics
        Then visualanalytics will load with out errors
        And I can leave the screen with out errors