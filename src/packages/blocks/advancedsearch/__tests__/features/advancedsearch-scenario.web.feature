Feature: advancedsearch

    Scenario: User navigates to advancedsearch
        Given I am a User loading advancedsearch
        When I navigate to the advancedsearch
        Then I can click AdvancedSearch button
        Then advancedsearch will load with out errors
        Then I can view AdvancedSearch item
        And I can leave the screen with out errors