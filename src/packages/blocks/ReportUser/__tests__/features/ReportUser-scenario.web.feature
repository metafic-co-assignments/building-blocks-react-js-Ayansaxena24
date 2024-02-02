Feature: ReportUser

    Scenario: User navigates to ReportUser
        Given I am a User loading ReportUser
        When I navigate to the ReportUser
        Then ReportUser will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors