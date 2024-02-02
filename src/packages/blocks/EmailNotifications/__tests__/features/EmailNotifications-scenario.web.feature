Feature: EmailNotifications

    Scenario: User navigates to EmailNotifications
        Given I am a User loading EmailNotifications
        When I navigate to the EmailNotifications
        Then EmailNotifications will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors