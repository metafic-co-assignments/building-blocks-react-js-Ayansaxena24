Feature: Mobile Phone Account Registration

    Scenario: User navigates to Mobile Phone Number Registration
        Given I am a User attempting to Register with a Mobile Phone Number
        When I navigate to the Registration Screen
        Then I can enter a phone number with out errors
        And I can select a Country Code with out errors
        And I can select the Submit button with out errors
        And I can leave the screen with out errors
        
    Scenario: Empty Mobile Phone Number
        Given I am a User attempting to Register with a Mobile Phone
        When I Register with an empty Mobile Phone Number
        Then Registration Should Fail
        And RestAPI will return an error

    Scenario: Mobile Phone Number and have not selected a Country Code
        Given I am a User attempting to Register with a Mobile Phone
        When I Register with a Mobile Phone Number and empty Country Code
        Then Registration Should Fail
        And RestAPI will return an error

    Scenario: Mobile Phone Number and have selected a Country Code
        Given I am User attempting to Register with a Mobile Phone
        When I Registration with Mobile Phone Number and have a Country Code
        Then Registration Should Succeed
        And RestAPI will return token

    Scenario: Register Mobile Account Additional Details
        Given I am a User attempting to Register after confirming OTP
        When I navigate to the Registration Screen
        Then I can enter a first name with out errors
        And I can enter a last name with out errors
        And I can enter a email with out errors
        And I can enter a password with out errors
        And I can toggle the Password Show/Hide with out errors
        And I can enter a confimation password with out errors
        And I can toggle the Confimation Password Show/Hide with out errors
        And I can select the Submit button with out errors
        And I can leave the screen with out errors

    Scenario: Empty First Name
        Given I am a User attempting to Register with a Mobile Phone
        When I Register with an empty First Name
        Then Registration Should Fail
        And RestAPI will return an error

    Scenario: Invalid Email
        Given I am a User attempting to Register with a Mobile Phone
        When I Register with an Invalid Email
        Then Registration Should Fail
        And RestAPI will return an error

    Scenario: Invalid Password
        Given I am a User attempting to Register with a Mobile Phone
        When I Register with an Invalid Password
        Then Registration Should Fail
        And RestAPI will return an error

    Scenario: Password and RePassword do not match
        Given I am a User attempting to Register with a Mobile Phone
        When I Register with Password and RePassword that do not match
        Then Registration Should Fail
        And RestAPI will return an error

    Scenario: Valid Registration
        Given I am a User attempting to Register with a Mobile Phone
        When I Register with all valid data
        Then Registration Should Succeed
        And RestAPI will return token