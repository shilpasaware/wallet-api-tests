
@wallet @transactions
Feature: Wallet Transactions
  As a wallet user
  I want to make transactions in my wallet
  So that I can manage my digital funds

  Background:
    Given I am logged in with valid credentials
    And I have a valid wallet ID

  @positive @high @credit
  Scenario: Create a successful credit transaction
    Given I load test data for "credit_transaction"
    When I create a credit transaction with the following details:
      | currency | amount | type   |
      | ${data.currency} | ${data.amount} | ${data.type} |
    Then the transaction should be created
    And the transaction should have a status of "${data.expectedStatus}" or "${data.alternateStatus}"
    And if the transaction is "finished" then the outcome should be "approved"
    And my wallet balance for "${data.currency}" should increase by ${data.amount}

  @positive @high @debit
  Scenario: Create a successful debit transaction
    Given I load test data for "debit_transaction"
    And I have sufficient funds in "${data.currency}" currency
    When I create a debit transaction with the following details:
      | currency | amount | type  |
      | ${data.currency} | ${data.amount} | ${data.type} |
    Then the transaction should be created
    And the transaction should have a status of "${data.expectedStatus}" or "${data.alternateStatus}"
    And if the transaction is "finished" then the outcome should be "approved"
    And my wallet balance for "${data.currency}" should decrease by ${data.amount}

  @positive @medium
  Scenario: Get transaction details
    Given I load test data for "transaction_details"
    And I have created a transaction
    When I retrieve the transaction details
    Then I should see the complete transaction information
    And the transaction should have a valid ID, type, status and timestamps

  @negative @high @debit
  Scenario: Failed debit transaction due to insufficient funds
    Given I load test data for "insufficient_funds_transaction"
    And I have insufficient funds in "${data.currency}" currency
    When I create a debit transaction with the following details:
      | currency | amount | type  |
      | ${data.currency} | ${data.amount} | ${data.type} |
    Then the transaction should be created
    And the transaction should have a status of "${data.expectedStatus}" or "${data.alternateStatus}"
    And if the transaction is "finished" then the outcome should be "denied"
    And my wallet balance for "${data.currency}" should remain unchanged

  @negative @medium @timeout
  Scenario: Verify transaction auto-reject after timeout
    Given I load test data for "timeout_transaction"
    And I create a pending credit transaction
    When ${data.timeoutPeriod} minutes have passed since the transaction creation
    Then the transaction status should be "${data.expectedStatus}"
    And the transaction outcome should be "${data.expectedOutcome}"
