# Wallet API Test Automation Framework

A comprehensive BDD-style API testing framework for the Wallet API service, built with Playwright and Cucumber.js.

## Overview

This framework provides automated testing for a digital wallet API that manages funds in multiple currencies. It uses:
- **Playwright** for API interactions
- **Cucumber.js** for behavior-driven development
- **Node.js** as the runtime environment

## Directory Structure

```
wallet-api-tests/
├── config/                                 # Configuration files
│   └── test.json                           # Environment configuration
├── features/                               # Cucumber feature files
│   ├── authentication.feature              # Authentication scenarios
│   └── wallet_transactions.feature         # Transaction scenarios
├── step_definitions/                       # Step implementations
│   ├── authentication_steps.js             # Auth steps
│   └── wallet_transactions_steps.js        # Transaction steps
├── test-data/                              # Test data files
│   ├── authentication-test-data.json       # Auth test data
│   └── transaction-test-data.json          # Transaction test data
├── utils/                                  # Utility functions
│   ├── api_helper.js                       # API utilities (removed/optional)
│   └── helpers.js                          # Common functions
├── reports/                                # Generated test reports
├── cucumber.js                             # Cucumber configuration
├── group_hooks.js                          # Tag-specific hooks
├── hooks.js                                # General hooks
├── package.json                            # Project dependencies
└── world.js                                # Cucumber world context
```

## Setup Instructions

### Prerequisites

- Node.js v16+ (tested with v23.10.0)
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd wallet-api-tests
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create the necessary directories if they don't exist:
   ```bash
   mkdir -p config test-data reports
   ```

### Dependencies

This framework relies on the following key dependencies:
- `@cucumber/cucumber` (^10.0.1): For BDD-style test definitions
- `@playwright/test` (^1.40.0): For API testing capabilities

## Test Execution

### Running All Tests

```bash
npm test
```

### Running Tests by Tag

```bash
# Run positive tests
npm test -- --tags @positive

# Run negative tests
npm test -- --tags @negative

# Run high priority tests
npm test -- --tags @high

# Run authentication tests
npm test -- --tags @authentication

# Run transaction tests
npm test -- --tags @transactions
```

### Running Tests with a Specific Environment

```bash
TEST_ENV=staging npm test
```

### Generating Reports

Generate an HTML report:

```bash
npx cucumber-js --format html:reports/cucumber-report.html
```

Run tests and open the report in one command:

```bash
npx cucumber-js --format html:reports/cucumber-report.html && open reports/cucumber-report.html
```

## API Endpoints Tested

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/user/login` | POST | Authentication endpoint |
| `/user/info/{userId}` | GET | Retrieves user details and wallet ID |
| `/wallet/{walletId}` | GET | Retrieves wallet information |
| `/wallet/{walletId}/transaction` | POST | Creates credit/debit transactions |
| `/wallet/{walletId}/transaction/{transactionId}` | GET | Retrieves transaction details |

## Test Organization

Tests are categorized using tags for better organization and execution:

- **By Test Type**: `@positive`, `@negative`
- **By Priority**: `@high`, `@medium`, `@low`
- **By Feature**: `@authentication`, `@transactions`
- **By Transaction Type**: `@credit`, `@debit`, `@timeout`

## Key Features

1. **BDD Approach**: Human-readable test scenarios using Gherkin syntax
2. **No Hardcoded Values**: All test data stored in external JSON files
3. **Dynamic Data Handling**: Support for variable substitution in feature files
4. **Tag-Based Organization**: Flexible test execution based on test type, priority, or feature
5. **Cross-Environment Support**: Configurable for different testing environments
6. **Comprehensive Reporting**: Built-in Cucumber HTML reports

## Additional Notes

- The framework uses a simulated approach for some API interactions to demonstrate the structure without requiring the actual API to be available.
- When implementing for a real API, the placeholders in step definitions should be replaced with actual API calls.
- Tests are designed to be robust, with appropriate error handling to prevent test failures due to environmental issues.

## Troubleshooting

- **Module Loading Issues**: If encountering module loading errors, ensure your Node.js version is compatible and the `"type": "commonjs"` is set in package.json.
- **Missing Step Definitions**: Ensure all steps in feature files have corresponding implementations in step definition files.
- **API Connection Errors**: Verify the API base URL in the configuration files matches your testing environment.

## LLM Disclosure

This framework was developed with assistance from Claude 3.7 Sonnet, an AI language model by Anthropic. The code structure, implementation patterns, and documentation were co-authored with the AI, with all code being thoroughly reviewed and tested by the developer.