Feature: interactivefaqs

    Scenario: User navigates to interactivefaqs
        Given I am a User loading interactivefaqs
        When I navigate to the interactivefaqs
        Then interactivefaqs will load with out errors
        And I can leave the screen with out errors

    Scenario: User can view any faq
        Given I am a User attempting to view a faq
        When I view a faq
        Then I can view faq will load with out errors

    Scenario: User can delete any faq
        Given I am a User attempting to delete a faq
        When I delete a faq
        Then I can delete faq will load with out errors
        And Rest Api will return success response
    
    Scenario: Empty title
        Given I am a user attempting to add a faq
        When I am adding a faq with empty title
        Then add faq should fail
    
    Scenario: Empty content
        Given I am a user attempting to add a faq
        When I am adding a faq with empty content
        Then add faq should fail

    Scenario: title and content
        Given I am a user attempting to add a faq
        When I am adding a faq with title and content
        Then add faq should succeed
        And Rest Api will return success response