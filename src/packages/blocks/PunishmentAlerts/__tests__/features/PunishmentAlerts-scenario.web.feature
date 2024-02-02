Feature: PunishmentAlerts

    Scenario: User navigates to PunishmentAlerts
        Given I am a User loading PunishmentAlerts
        When I navigate to the PunishmentAlerts
        Then PunishmentAlerts will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors