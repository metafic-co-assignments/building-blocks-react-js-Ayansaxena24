Feature: Notifications

    Scenario: User navigates to Notifications
        Given I am a User loading Notifications
        When I navigate to the Notifications
        Then Notifications will load with out errors
        And I can leave the screen with out errors