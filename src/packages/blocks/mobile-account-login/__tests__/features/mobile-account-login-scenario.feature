Feature: Mobile Phone Account Log In

    Scenario: User navigates to Mobile Log In
        Given I am a User attempting to Log In with a Mobile Phone
        When I navigate to the Log In Screen
        Then I can select Log In with Soical Media Account
        And I can select Log In with Email Account
        And I can select a Country Code with out errors
        And I can toggle the Password Show/Hide with out errors
        And I can toggle the Remember Me with out errors
        And I can select the Log In button with out errors
        And I can select the Forgot Password button with out errors
        And I can enter a phone number with out errors
        And I can enter a password with out errors
        And I can leave the screen with out errors

    Scenario: Empty Mobile Phone Number
        Given I am a User attempting to Log In with a Mobile Phone
        When I Log In with an empty Mobile Phone Number
        Then Log In Should Fail

    Scenario: Mobile Phone Number and Empty Password
        Given I am a User attempting to Log In with a Mobile Phone
        When I Log In with a Mobile Phone Number and empty Password
        Then Log In Should Fail

    Scenario: Password and Empty Mobile Phone Number  
        Given I am a User attempting to Log In with a Mobile Phone
        When I Log In with a Password and empty Mobile Phone Number
        Then Log In Should Fail

    Scenario: Mobile Phone Number, Password and have not selected a Country Code
        Given I am a User attempting to Log In with a Mobile Phone
        When I Log In with Mobile Phone Number, Password and do not select a Country Code
        Then Log In Should Fail
        And RestAPI will return an error
    
    Scenario: Mobile Phone Number, Password and have selected a Country Code
        Given I am a Registed User attempting to Log In with a Mobile Phone
        When I Log In with Mobile Phone Number, Password and have a Country Code
        Then Log In Should Succeed
        And RestAPI will return token

    Scenario: Remember Me - Mobile Phone Account Log In 
        Given I am a Registed User who has already Logged In and selected Remember Me
        When I navigate to Mobile Phone Account Log In
        Then The Country Code, Mobile Phone Number and Password will be restored