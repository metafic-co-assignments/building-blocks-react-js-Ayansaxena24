Feature: pushnotifications

    Scenario: User navigates to pushnotifications
        Given I am a User loading pushnotifications
        When I navigate to the pushnotifications
        Then pushnotifications will load with out errors
        And pushnotifications will render with mock data
        And pushnotifications will render with empty data
        And pushnotifications will load notifications from the server
        And I can click the notificatio item
        And pushnotifications failed to load data from the server
        And I can leave the screen with out errors