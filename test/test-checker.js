/**
 * Test suite for Grammar Checker
 */

const GrammarChecker = require('../src/checker');

const checker = new GrammarChecker();

console.log('=================================');
console.log('  Grammar Checker Test Suite');
console.log('=================================\n');

let testsPassed = 0;
let testsFailed = 0;

function runTest(name, testFn) {
  try {
    testFn();
    console.log(`✓ ${name}`);
    testsPassed++;
  } catch (error) {
    console.log(`✗ ${name}`);
    console.log(`  Error: ${error.message}`);
    testsFailed++;
  }
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message || 'Assertion failed');
  }
}

// Test 1: Basic typo detection
runTest('Should detect common typos', () => {
  const result = checker.check('I beleive this is alot of fun');
  assert(result.errorCount >= 2, 'Should find at least 2 errors');
  assert(result.hasErrors, 'Should have errors');
});

// Test 2: Grammar error detection
runTest('Should detect grammar errors', () => {
  const result = checker.check('I should of done that');
  assert(result.errorCount > 0, 'Should find grammar error');
  const hasGrammarError = result.errors.some(e => e.type === 'grammar');
  assert(hasGrammarError, 'Should detect grammar error type');
});

// Test 3: Auto-correction
runTest('Should auto-correct typos', () => {
  const original = 'I recieve alot of emails';
  const corrected = checker.autoCorrect(original);
  assert(corrected.includes('receive'), 'Should correct "recieve" to "receive"');
  assert(corrected.includes('a lot'), 'Should correct "alot" to "a lot"');
});

// Test 4: Word count
runTest('Should count words correctly', () => {
  const result = checker.check('This is a test');
  assert(result.wordCount === 4, `Expected 4 words, got ${result.wordCount}`);
});

// Test 5: Empty text handling
runTest('Should handle empty text', () => {
  const result = checker.check('');
  assert(result.errorCount === 0, 'Should have no errors for empty text');
  assert(result.wordCount === 0, 'Should have 0 words for empty text');
});

// Test 6: Clean text detection
runTest('Should detect clean text with no errors', () => {
  const result = checker.check('This is a perfectly written sentence.');
  assert(!result.hasErrors || result.errorCount === 0, 'Should have no errors');
});

// Test 7: Multiple typos in one text
runTest('Should detect multiple typos', () => {
  const text = 'I beleive that recieve is hard to spell and seperate too';
  const result = checker.check(text);
  assert(result.errorCount >= 3, `Expected at least 3 errors, got ${result.errorCount}`);
});

// Test 8: Summary generation
runTest('Should generate proper summary', () => {
  const result = checker.check('I beleive this');
  const summary = checker.getSummary(result);
  assert(typeof summary === 'string', 'Summary should be a string');
  assert(summary.length > 0, 'Summary should not be empty');
});

// Test 9: Your/you're detection
runTest('Should detect your/you\'re errors', () => {
  const result = checker.check('Your going to love this');
  const hasError = result.errors.some(e => 
    e.original.toLowerCase().includes('your') && 
    e.suggestion && e.suggestion.toLowerCase().includes("you're")
  );
  assert(hasError, 'Should detect your/you\'re error');
});

// Test 10: Their/there detection
runTest('Should detect their/there errors', () => {
  const result = checker.check('Their are many options');
  const hasError = result.errors.some(e => 
    e.original.toLowerCase().includes('their') && 
    e.suggestion && e.suggestion.toLowerCase().includes('there')
  );
  assert(hasError, 'Should detect their/there error');
});

// Test 11: Case insensitivity
runTest('Should detect typos regardless of case', () => {
  const result = checker.check('ALOT of RECIEVE');
  assert(result.errorCount >= 2, 'Should find errors regardless of case');
});

// Test 12: Preserve original formatting
runTest('Should preserve text structure in auto-correct', () => {
  const original = 'Line one.\nLine two.';
  const corrected = checker.autoCorrect(original);
  assert(corrected.includes('\n'), 'Should preserve line breaks');
});

// Test 13: Error type classification
runTest('Should classify error types correctly', () => {
  const result = checker.check('I beleive you should of done that');
  const typos = result.errors.filter(e => e.type === 'typo');
  const grammar = result.errors.filter(e => e.type === 'grammar');
  assert(typos.length > 0, 'Should have typo errors');
  assert(grammar.length > 0, 'Should have grammar errors');
});

// Test 14: Null/undefined handling
runTest('Should handle null/undefined input', () => {
  const result1 = checker.check(null);
  const result2 = checker.check(undefined);
  assert(result1.errorCount === 0, 'Should handle null input');
  assert(result2.errorCount === 0, 'Should handle undefined input');
});

// Test 15: Special characters
runTest('Should handle text with special characters', () => {
  const result = checker.check('Hello! This is a test? Yes, it is.');
  assert(result.wordCount > 0, 'Should count words with punctuation');
});

// Print results
console.log('\n=================================');
console.log(`Tests Passed: ${testsPassed}`);
console.log(`Tests Failed: ${testsFailed}`);
console.log(`Total Tests: ${testsPassed + testsFailed}`);
console.log('=================================\n');

if (testsFailed === 0) {
  console.log('🎉 All tests passed!\n');
  process.exit(0);
} else {
  console.log('❌ Some tests failed.\n');
  process.exit(1);
}
