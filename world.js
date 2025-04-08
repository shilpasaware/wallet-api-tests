const { setWorldConstructor, Before, After } = require('@cucumber/cucumber');
const { request } = require('@playwright/test');

/**
 * Custom world class for Cucumber.js
 * Provides context for steps during test execution
 */
class CustomWorld {
  constructor({ attach, parameters }) {
    this.attach = attach; // Cucumber's attach function for screenshots/data
    this.parameters = parameters; // Any parameters passed to the world
    
    // Properties that will be set during test execution
    this.authToken = null;
    this.userId = null;
    this.walletId = null;
    this.wallet = null;
    this.transactionId = null;
    this.transactionResponse = null;
    this.transactionDetails = null;
    this.initialWallet = null;
    this.initialBalance = 0;
  }
  
  /**
   * Initialize the world with Playwright's request fixture
   */
  async init() {
    // Create a new request context for API calls
    this.request = await request.newContext({
      // Global options for all requests if needed
      extraHTTPHeaders: {
        'Accept': 'application/json'
      }
    });
  }
  
  /**
   * Update API context with auth token when it becomes available
   * @param {string} token - Authentication token
   */
  setAuthToken(token) {
    this.authToken = token;
    // Just store the token for later use in requests
  }
  
  /**
   * Clean up Playwright resources
   */
  async dispose() {
    if (this.request) {
      await this.request.dispose();
    }
  }
}

// Set the custom world constructor
setWorldConstructor(CustomWorld);

// Before hook - runs before each scenario
Before(async function() {
  // Initialize the world
  await this.init();
  
  // Log the start of the scenario
  console.log('\n🚀 Starting scenario');
});

// After hook - runs after each scenario
After(async function() {
  // Log the end of the scenario
  console.log('✅ Scenario completed\n');
  
  // Clean up resources
  await this.dispose();
});