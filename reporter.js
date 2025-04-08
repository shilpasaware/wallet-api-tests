/**
 * Cucumber HTML report generator
 */
const reporter = require('cucumber-html-reporter');
const fs = require('fs');
const path = require('path');

// Create reports directory if it doesn't exist
const reportsDir = path.join(__dirname, 'reports');
if (!fs.existsSync(reportsDir)) {
  fs.mkdirSync(reportsDir, { recursive: true });
}

// Report options
const options = {
  theme: 'bootstrap',
  jsonFile: path.join(reportsDir, 'cucumber-report.json'),
  output: path.join(reportsDir, 'cucumber-report.html'),
  reportSuiteAsScenarios: true,
  scenarioTimestamp: true,
  launchReport: true,
  metadata: {
    'App Version': 'Wallet API v1.0',
    'Test Environment': process.env.NODE_ENV || 'dev',
    'Platform': process.platform,
    'Executed': new Date().toISOString()
  }
};

// Generate the report
try {
  reporter.generate(options);
  console.log('HTML report generated successfully!');
} catch (err) {
  console.error('Failed to generate HTML report:', err);
}