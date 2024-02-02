Feature: contactus

    Scenario: User navigates to contactus
        Given I am a User loading contactus
        When I navigate to the contactus
        Then contactus will load with out errors
        And I can leave the screen with out errors

    Scenario: User navigates to addContactus
        Given I am a User loading addContactus
        When I navigate to the addContactus
        Then addContactus will load with out errors
        And I can leave the screen with out errors