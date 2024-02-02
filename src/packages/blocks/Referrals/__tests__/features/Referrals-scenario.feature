Feature: Referrals

    Scenario: User navigates to Referrals
        Given I am a User loading Referrals
        When I navigate to the Referrals
        Then Referrals will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors