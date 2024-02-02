Feature: DifferentRooms

    Scenario: User navigates to DifferentRooms
        Given I am a User loading DifferentRooms
        When I navigate to the DifferentRooms
        Then DifferentRooms will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors