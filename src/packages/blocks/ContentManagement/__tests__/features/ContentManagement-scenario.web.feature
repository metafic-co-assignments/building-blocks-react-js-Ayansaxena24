Feature: ContentManagement

    Scenario: User navigates to ContentManagement
        Given I am a User loading ContentManagement
        When I navigate to the ContentManagement
        Then ContentManagement will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors