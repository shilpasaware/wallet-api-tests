
@authentication
Feature: User Authentication
  As a wallet user
  I want to authenticate with the system
  So that I can access my wallet and perform transactions

  @positive @high
  Scenario: Successful authentication with valid credentials
    Given I load test data for "valid_user"
    When I login with the following credentials:
      | username | password |
      | ${data.username} | ${data.password} |
    Then I should receive a valid authentication token
    And the authentication token should not be expired
    And I should have access to my user ID
    
  @negative @high  
  Scenario: Failed authentication with invalid credentials
    Given I load test data for "invalid_user"
    When I login with the following credentials:
      | username | password |
      | ${data.username} | ${data.password} |
    Then I should receive an authentication error

  @positive @medium
  Scenario: Retrieve user information after authentication
    Given I am logged in with valid credentials
    When I request my user information
    Then I should see my user profile details
    And I should see my wallet ID

  @positive @medium
  Scenario: Authentication token expires after the defined period
    Given I load test data for "valid_user"
    When I login with the following credentials:
      | username | password |
      | ${data.username} | ${data.password} |
    Then I should receive a valid authentication token
    And the token expiry date should be set to 1 hour from now
