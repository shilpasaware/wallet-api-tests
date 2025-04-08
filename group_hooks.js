
const { Before, After } = require('@cucumber/cucumber');

// Positive test hooks
Before({ tags: '@positive' }, async function() {
  console.log('🟢 Setting up for POSITIVE test case');
});

After({ tags: '@positive' }, async function() {
  console.log('🟢 POSITIVE test case completed');
});

// Negative test hooks
Before({ tags: '@negative' }, async function() {
  console.log('🔴 Setting up for NEGATIVE test case');
});

After({ tags: '@negative' }, async function() {
  console.log('🔴 NEGATIVE test case completed');
});

// Priority-based hooks
Before({ tags: '@high' }, async function() {
  console.log('⚠️ Running HIGH priority test');
});

Before({ tags: '@medium' }, async function() {
  console.log('ℹ️ Running MEDIUM priority test');
});

Before({ tags: '@low' }, async function() {
  console.log('📝 Running LOW priority test');
});

// Transaction type-specific hooks
Before({ tags: '@credit' }, async function() {
  console.log('💰 Setting up for CREDIT transaction test');
});

Before({ tags: '@debit' }, async function() {
  console.log('💸 Setting up for DEBIT transaction test');
});

// Transaction timeout specific hooks
Before({ tags: '@timeout' }, async function() {
  console.log('⏱️ Setting up for TIMEOUT simulation test');
});
