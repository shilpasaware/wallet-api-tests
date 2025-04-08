# Wallet API Test Plan

## 1. Introduction

This test plan outlines the automated testing strategy for the Wallet API service. The API facilitates the management of digital wallets, allowing for operations such as managing funds in multiple currencies, checking balances, and reviewing transaction history.

## 2. Test Scope

### 2.1 APIs Under Test

| Endpoint                                        | Method | Description                                               |
|-------------------------------------------------|--------|-----------------------------------------------------------|
| `/user/login`                                   | POST   | Authentication endpoint that requires X-Service-Id header |
| `/user/info/{userId}`                           | GET    | Retrieves user details including walletId                 |
| `/wallet/{walletId}`                            | GET    | Retrieves wallet information with currency clips          |
| `/wallet/{walletId}/transaction`                | POST   | Creates credit/debit transactions                         |
| `/wallet/{walletId}/transaction/{transactionId}`| GET    | Retrieves transaction details                             |

### 2.2 Test Categories

Tests are organized using Cucumber tags:
- **By Test Type**: `@positive`, `@negative`
- **By Priority**: `@high`, `@medium`, `@low`
- **By Feature**: `@authentication`, `@transactions`
- **By Transaction Type**: `@credit`, `@debit`, `@timeout`

## 3. Implemented Test Cases

### 3.1 Authentication Tests (Priority: High)

1. **Successful Authentication with Valid Credentials**
   - **Description**: Verify that a user can successfully authenticate using valid credentials
   - **Steps**:
     1. Submit valid username and password to login endpoint
     2. Verify response includes token, userId, and expiry
   - **Expected Result**: 200 OK response with valid authentication token

2. **Failed Authentication with Invalid Credentials**
   - **Description**: Verify that authentication fails with invalid credentials
   - **Steps**:
     1. Submit invalid username or password to login endpoint
     2. Verify error response
   - **Expected Result**: Non-200 status code with appropriate error message

3. **Retrieve User Information After Authentication**
   - **Description**: Verify that authenticated users can access their profile information
   - **Steps**:
     1. Authenticate with valid credentials
     2. Request user information using obtained userId
     3. Verify user profile details
   - **Expected Result**: 200 OK with user profile containing email, name, and walletId

### 3.2 Transaction Tests (Priority: High)

4. **Create a Successful Credit Transaction**
   - **Description**: Verify that funds can be added to a wallet
   - **Steps**:
     1. Authenticate and get wallet ID
     2. Create a credit transaction
     3. Verify transaction status
     4. Verify wallet balance increased
   - **Expected Result**: Transaction created with status "finished" or "pending" and balance increased when approved

5. **Create a Successful Debit Transaction**
   - **Description**: Verify that funds can be withdrawn from a wallet
   - **Steps**:
     1. Authenticate and get wallet ID
     2. Ensure sufficient funds exist
     3. Create a debit transaction
     4. Verify transaction status
     5. Verify wallet balance decreased
   - **Expected Result**: Transaction created with status "finished" or "pending" and balance decreased when approved

6. **Failed Debit Transaction Due to Insufficient Funds**
   - **Description**: Verify that debit transactions fail when insufficient funds
   - **Steps**:
     1. Authenticate and get wallet ID
     2. Ensure wallet has insufficient funds
     3. Create a debit transaction
     4. Verify transaction status and outcome
     5. Verify wallet balance remains unchanged
   - **Expected Result**: Transaction created but outcome is "denied" when finished, balance unchanged

7. **Get Transaction Details**
   - **Description**: Verify that transaction details can be retrieved
   - **Steps**:
     1. Authenticate and get wallet ID
     2. Create a transaction
     3. Retrieve transaction details
     4. Verify all transaction fields are present
   - **Expected Result**: Complete transaction information including ID, type, status, timestamps

### 3.3 Transaction Edge Cases (Priority: Medium)

8. **Verify Transaction Auto-reject After Timeout**
   - **Description**: Verify that pending transactions are auto-rejected after timeout
   - **Steps**:
     1. Create a pending transaction
     2. Simulate time passing (30 minutes)
     3. Verify transaction status and outcome
   - **Expected Result**: Transaction status is "finished" and outcome is "denied" after timeout period

## 4. Crucial Unimplemented Test Cases

### 4.1 Authentication Edge Cases (Priority: High)

1. **Token Expiry and Refresh**
   - **Description**: Verify that expired tokens are rejected and refresh tokens work
   - **Steps**:
     1. Authenticate to get tokens
     2. Wait for token to expire
     3. Attempt API call with expired token
     4. Use refresh token to get new access token
   - **Expected Result**: Expired token rejected, refresh token issues new valid token

### 4.2 Advanced Transaction Scenarios (Priority: Medium)

2. **Multiple Currency Management**
   - **Description**: Verify that a wallet can hold and manage multiple currencies
   - **Steps**:
     1. Create transactions in different currencies
     2. Verify each currency is stored in separate currency clips
     3. Verify operations on one currency don't affect others
   - **Expected Result**: Wallet correctly maintains separate balances for each currency

3. **Concurrent Transactions**
   - **Description**: Verify system handles multiple simultaneous transactions
   - **Steps**:
     1. Send multiple transaction requests simultaneously
     2. Verify all transactions are processed correctly
     3. Verify final balance is correct
   - **Expected Result**: All transactions processed without errors or race conditions

### 4.3 Security Tests (Priority: High)

4. **Authorization Boundary Testing**
   - **Description**: Verify users cannot access other users' wallets
   - **Steps**:
     1. Authenticate as User A
     2. Attempt to access User B's wallet
     3. Verify access is denied
   - **Expected Result**: 401/403 error when attempting to access unauthorized resources

5. **Input Validation and Security**
   - **Description**: Verify API rejects malformed or malicious inputs
   - **Steps**:
     1. Send transactions with invalid values (negative amounts, invalid currencies)
     2. Send requests with potential injection attacks
     3. Verify proper error handling
   - **Expected Result**: API rejects invalid inputs with appropriate error messages

## 5. Test Data Strategy

All test data is externalized in JSON files:
- `test.json`: Environment configuration (API URLs, credentials)
- `authentication-test-data.json`: User credentials for testing
- `transaction-test-data.json`: Transaction parameters (amounts, currencies, expected outcomes)

This ensures:
- No hardcoded values in test code
- Easy maintenance and updates
- Support for multiple test environments

## 6. Test Execution Strategy

### 6.1 Execution Approach

Tests will be executed:
- During CI/CD pipeline builds
- Before each deployment to staging/production
- After significant API changes

### 6.2 Priority-Based Execution

1. **High Priority**: Must pass for any deployment
2. **Medium Priority**: Should pass for production deployments
3. **Low Priority**: Edge cases that are desirable but not blocking

## 7. Test Success Criteria

Tests will be considered successful when:
1. All @high priority scenarios pass consistently in the target environment
2. Balance calculations are accurate for all transaction types
3. Error handling works as expected for all negative scenarios
4. Tests complete within the expected execution time (< 5 minutes for full suite)

## LLM Disclosure

This test plan was developed with assistance from Claude 3.7 Sonnet, an AI language model by Anthropic. The structure, scenarios, and approach were co-authored with the AI, with all content being reviewed and validated by the developer.