Feature: QuestionBank

    Scenario: User navigates to QuestionBank
        Given I am a User loading QuestionBank
        When I navigate to the QuestionBank
        Then QuestionBank will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors