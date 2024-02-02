Feature: LikeAPost

    Scenario: User navigates to LikeAPost
        Given I am a User loading LikeAPost
        When I navigate to the LikeAPost
        Then LikeAPost will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors