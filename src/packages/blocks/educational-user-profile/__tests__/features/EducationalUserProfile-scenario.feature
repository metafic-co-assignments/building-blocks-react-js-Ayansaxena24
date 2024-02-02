Feature: EducationalUserProfile

    Scenario: User navigates to EducationalUserProfile
        Given I am a User loading EducationalUserProfile
        When I navigate to the EducationalUserProfile
        Then EducationalUserProfile will load with out errors
        And I can leave the screen with out errors