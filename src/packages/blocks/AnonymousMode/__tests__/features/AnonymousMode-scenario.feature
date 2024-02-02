Feature: AnonymousMode

    Scenario: User navigates to AnonymousMode
        Given I am a User loading AnonymousMode
        When I navigate to the AnonymousMode
        Then AnonymousMode will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors