Feature: DeepLinking

    Scenario: User navigates to DeepLinking
        Given I am a User loading DeepLinking
        When I navigate to the DeepLinking
        Then DeepLinking will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors