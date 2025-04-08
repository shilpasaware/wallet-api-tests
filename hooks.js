const { Before, After, BeforeAll, AfterAll, Status } = require('@cucumber/cucumber');
const helpers = require('./utils/helpers');

let config;

BeforeAll(async function() {
  console.log('📊 Test run starting...');
  console.log(`🔧 Environment: ${process.env.TEST_ENV || 'test'}`);
  
  try {
    config = helpers.getConfig();
    console.log(`🌐 API Base URL: ${config.api.baseUrl}`);
  } catch (error) {
    console.error('Failed to load config, using defaults');
  }
});

AfterAll(async function() {
  console.log('📊 Test run completed');
});

After(async function(scenario) {
  if (scenario.result.status === Status.FAILED) {
    console.log('❌ Scenario failed');
    
    if (this.walletId) {
      console.log(`Last used wallet ID: ${this.walletId}`);
    }
    if (this.transactionId) {
      console.log(`Last used transaction ID: ${this.transactionId}`);
    }
  }
});
