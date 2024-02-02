Feature: ConversationHistory2

    Scenario: User navigates to ConversationHistory2
        Given I am a User loading ConversationHistory2
        When I navigate to the ConversationHistory2
        Then ConversationHistory2 will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors