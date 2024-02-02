Feature: DailyTimeLimit

    Scenario: User navigates to DailyTimeLimit
        Given I am a User loading DailyTimeLimit
        When I navigate to the DailyTimeLimit
        Then DailyTimeLimit will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors