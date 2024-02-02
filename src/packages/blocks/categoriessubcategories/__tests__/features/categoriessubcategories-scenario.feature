Feature: categoriessubcategories

    Scenario: User navigates to categoriessubcategories
        Given I am a User loading categoriessubcategories
        When I navigate to the categoriessubcategories
        Then categoriessubcategories will load with out errors
        And I can leave the screen with out errors

    Scenario: User can delete any category
        Given I am a User attempting to delete a category
        When I navigate to category screen
        Then delete category should succeed

    Scenario: User can delete any subcategory
        Given I am a User attempting to delete a subcategory
        When I navigate to category screen
        Then delete subcategory should succeed

    Scenario: User can add a category
        Given I am a User attempting to add a category
        When I click on add category 
        Then add category should succeed
        And RestAPI will return successfull response

    Scenario: User adding a empty category 
        Given I am a User attempting to add an empty category
        When I click on add category 
        Then add category should failed

    Scenario: User can add a subcategory
        Given I am a User attempting to add a subcategory
        When I click on add subcategory 
        Then I can expand and select the categories to add the subcategory
        Then add subcategory should succeed
        And RestAPI will return successfull response

    Scenario: User adding a empty subcategory 
        Given I am a User attempting to add an empty subcategory
        When I click on add subcategory 
        Then add subcategory should failed
