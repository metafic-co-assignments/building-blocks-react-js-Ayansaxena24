Feature: ProductTutorial

    Scenario: User navigates to ProductTutorial
        Given I am a User loading ProductTutorial
        When I navigate to the ProductTutorial
        Then ProductTutorial will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors