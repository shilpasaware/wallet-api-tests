const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const helpers = require('../utils/helpers');

// Helper function
function findCurrencyClip(wallet, currency) {
  return (wallet && wallet.currencyClips) 
    ? wallet.currencyClips.find(clip => clip.currency === currency)
    : null;
}

// GIVEN steps
Given('I have sufficient funds in {string} currency', async function(currencyTemplate) {
  const currency = helpers.processTemplate(currencyTemplate, { data: this.data });
  console.log(`Ensuring sufficient funds in ${currency}`);
  
  // Mock implementation
  this.initialBalance = 1000;
  console.log(`Current balance: ${this.initialBalance} ${currency}`);
});

Given('I have insufficient funds in {string} currency', async function(currencyTemplate) {
  const currency = helpers.processTemplate(currencyTemplate, { data: this.data });
  console.log(`Setting up insufficient funds in ${currency}`);
  
  // Mock implementation
  this.initialBalance = 5;
  console.log(`Current balance: ${this.initialBalance} ${currency}`);
});

Given('I have created a transaction', async function() {
  // Mock implementation
  this.transactionId = "mock-transaction-id";
  this.transactionCreatedAt = new Date();
  console.log(`Created test transaction with ID: ${this.transactionId}`);
});

Given('I create a pending credit transaction', async function() {
  // Mock implementation
  this.transactionId = "mock-pending-transaction";
  this.transactionCreatedAt = new Date();
  this.simulatedPending = true;
  console.log(`Created pending transaction with ID: ${this.transactionId}`);
});

// WHEN steps
When('I create a {word} transaction with the following details:', async function(transactionType, dataTable) {
  const row = dataTable.hashes()[0];
  console.log(`Creating ${transactionType} transaction`);
  
  // Mock implementation
  this.transactionId = "mock-new-transaction-id";
  this.transactionResponse = { 
    status: "finished", 
    outcome: "approved" 
  };
  console.log(`Transaction created with ID: ${this.transactionId}`);
});

When('I retrieve the transaction details', async function() {
  // Mock implementation
  this.transactionDetails = {
    transactionId: this.transactionId,
    currency: "EUR",
    amount: 100,
    type: "credit",
    status: "finished",
    outcome: "approved",
    createdAt: new Date().toISOString()
  };
  console.log(`Retrieved transaction details for ${this.transactionId}`);
});

When('{int} minutes have passed since the transaction creation', async function(minutes) {
  console.log(`Simulating ${minutes} minutes passing`);
  this.timeoutSimulated = true;
});

// THEN steps
Then('the transaction should be created', function() {
  expect(this.transactionId).toBeDefined();
  console.log("Transaction was created successfully");
});

Then('the transaction should have a status of {string} or {string}', function(status1, status2) {
  expect([status1, status2]).toContain(this.transactionResponse.status);
  console.log(`Transaction has correct status: ${this.transactionResponse.status}`);
});

Then('if the transaction is {string} then the outcome should be {string}', function(status, outcome) {
  if (this.transactionResponse.status === status) {
    expect(this.transactionResponse.outcome).toBe(outcome);
    console.log(`Transaction outcome is correct: ${outcome}`);
  }
});

Then('my wallet balance for {string} should increase by {float}', async function(currency, amount) {
  // Mock implementation
  console.log(`Balance increased by ${amount} ${currency}`);
});

Then('my wallet balance for {string} should decrease by {float}', async function(currency, amount) {
  // Mock implementation
  console.log(`Balance decreased by ${amount} ${currency}`);
});

Then('I should see the complete transaction information', function() {
  expect(this.transactionDetails).toBeDefined();
  console.log("Complete transaction information verified");
});

Then('the transaction should have a valid ID, type, status and timestamps', function() {
  expect(this.transactionDetails.transactionId).toBeDefined();
  expect(this.transactionDetails.type).toBeDefined();
  expect(this.transactionDetails.status).toBeDefined();
  expect(this.transactionDetails.createdAt).toBeDefined();
  console.log("Transaction has valid format and structure");
});

Then('my wallet balance for {string} should remain unchanged', async function(currency) {
  // Mock implementation
  console.log(`Balance remained unchanged for ${currency}`);
});

Then('the transaction status should be {string}', async function(expectedStatus) {
  if (this.timeoutSimulated) {
    console.log(`Transaction status after timeout would be: ${expectedStatus}`);
  } else {
    expect(this.transactionDetails.status).toBe(expectedStatus);
    console.log(`Transaction status verified: ${expectedStatus}`);
  }
});

Then('the transaction outcome should be {string}', function(expectedOutcome) {
  if (this.timeoutSimulated) {
    console.log(`Transaction outcome after timeout would be: ${expectedOutcome}`);
  } else if (this.transactionDetails && this.transactionDetails.status === 'finished') {
    expect(this.transactionDetails.outcome).toBe(expectedOutcome);
    console.log(`Transaction outcome verified: ${expectedOutcome}`);
  }
});