Feature: InvoiceBilling

    Scenario: User navigates to InvoiceBilling
        Given I am a User loading InvoiceBilling
        When I navigate to the InvoiceBilling
        Then InvoiceBilling will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors