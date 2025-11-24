#!/usr/bin/env node

/**
 * Command Line Interface for Grammar Checker
 */

const GrammarChecker = require('./checker');
const readline = require('readline');

const checker = new GrammarChecker();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('=================================');
console.log('  Fix My Typo - Grammar Checker');
console.log('=================================\n');

function displayMenu() {
  console.log('\nOptions:');
  console.log('1. Check text for errors');
  console.log('2. Auto-correct text');
  console.log('3. Exit\n');
}

const EMPTY_LINE_THRESHOLD = 2;

function promptForText(callback) {
  console.log('\nEnter your text (press Enter twice when done):');
  let text = '';
  let emptyLineCount = 0;
  
  const textReader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  textReader.on('line', (line) => {
    if (line === '') {
      emptyLineCount++;
      if (emptyLineCount >= EMPTY_LINE_THRESHOLD) {
        textReader.close();
        callback(text.trim());
      } else {
        text += '\n';
      }
    } else {
      emptyLineCount = 0;
      text += line + '\n';
    }
  });
}

function checkText() {
  promptForText((text) => {
    if (!text) {
      console.log('\nNo text provided.');
      showMainMenu();
      return;
    }

    console.log('\nAnalyzing text...\n');
    const results = checker.check(text);
    
    console.log('--- RESULTS ---');
    console.log(checker.getSummary(results));
    
    if (results.hasErrors) {
      console.log('\nDetailed Errors:');
      results.errors.forEach((error, index) => {
        console.log(`\n${index + 1}. [${error.type.toUpperCase()}]`);
        console.log(`   Original: "${error.original}"`);
        if (error.suggestion) {
          console.log(`   Suggestion: "${error.suggestion}"`);
        }
        console.log(`   Message: ${error.message}`);
      });
    }
    
    showMainMenu();
  });
}

function autoCorrectText() {
  promptForText((text) => {
    if (!text) {
      console.log('\nNo text provided.');
      showMainMenu();
      return;
    }

    console.log('\nCorrecting text...\n');
    const correctedText = checker.autoCorrect(text);
    
    console.log('--- ORIGINAL ---');
    console.log(text);
    console.log('\n--- CORRECTED ---');
    console.log(correctedText);
    
    showMainMenu();
  });
}

function showMainMenu() {
  displayMenu();
  rl.question('Choose an option (1-3): ', (answer) => {
    switch (answer.trim()) {
      case '1':
        checkText();
        break;
      case '2':
        autoCorrectText();
        break;
      case '3':
        console.log('\nThank you for using Fix My Typo!\n');
        rl.close();
        process.exit(0);
        break;
      default:
        console.log('\nInvalid option. Please try again.');
        showMainMenu();
    }
  });
}

// Start the application
showMainMenu();
