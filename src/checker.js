/**
 * Grammar and Typo Checker Module
 * Checks text for common grammar mistakes, typos, and spelling errors
 */

class GrammarChecker {
  constructor() {
    // Common misspellings and corrections
    this.commonTypos = {
      'alot': 'a lot',
      'recieve': 'receive',
      'occured': 'occurred',
      'seperate': 'separate',
      'definately': 'definitely',
      'occassion': 'occasion',
      'untill': 'until',
      'thier': 'their',
      'freind': 'friend',
      'wich': 'which',
      'wierd': 'weird',
      'beleive': 'believe',
      'athiest': 'atheist',
      'aparent': 'apparent',
      'begining': 'beginning',
      'calender': 'calendar',
      'commited': 'committed',
      'concious': 'conscious',
      'goverment': 'government',
      'harrass': 'harass',
      'lisence': 'license',
      'maintainance': 'maintenance',
      'mispell': 'misspell',
      'neccessary': 'necessary',
      'noticable': 'noticeable',
      'occassionally': 'occasionally',
      'publically': 'publicly',
      'reccomend': 'recommend',
      'refered': 'referred',
      'relevent': 'relevant',
      'succesful': 'successful',
      'tommorrow': 'tomorrow',
      'truely': 'truly',
      'upto': 'up to',
      'whereever': 'wherever'
    };

    // Common grammar mistakes
    this.grammarRules = [
      {
        pattern: /\b(your)\s+(heading|going|doing)\b/gi,
        correction: "you're",
        message: "Use 'you're' (you are) instead of 'your' for actions"
      },
      {
        pattern: /\b(their)\s+(is|are|was|were)\b/gi,
        correction: "there",
        message: "Use 'there' instead of 'their' with 'is/are/was/were'"
      },
      {
        pattern: /\b(its)\s+(a|the|been|going)\b/gi,
        correction: "it's",
        message: "Use 'it's' (it is/it has) instead of 'its'"
      },
      {
        pattern: /\bshould\s+of\b/gi,
        correction: "should have",
        message: "Use 'should have' instead of 'should of'"
      },
      {
        pattern: /\bcould\s+of\b/gi,
        correction: "could have",
        message: "Use 'could have' instead of 'could of'"
      },
      {
        pattern: /\bwould\s+of\b/gi,
        correction: "would have",
        message: "Use 'would have' instead of 'would of'"
      },
      {
        pattern: /\b(then)\s+(I|we|he|she|they|you)\b/gi,
        correction: "than",
        message: "Use 'than' for comparisons, not 'then'"
      },
      {
        pattern: /\b(effect)\s+(the|our|your)\b/gi,
        correction: "affect",
        message: "Use 'affect' as a verb (to influence)"
      }
    ];

    // Common punctuation issues
    this.punctuationRules = [
      {
        pattern: /(\w)(,)(\w)/g,
        message: "Add space after comma"
      },
      {
        pattern: /(\w)(\.)(\w)/g,
        message: "Add space after period"
      },
      {
        pattern: /\s+([,.])/g,
        message: "Remove space before punctuation"
      }
    ];
  }

  /**
   * Check text for errors and return detailed results
   * @param {string} text - The text to check
   * @returns {Object} - Results object with errors and suggestions
   */
  check(text) {
    if (!text || typeof text !== 'string') {
      return {
        originalText: text || '',
        errors: [],
        errorCount: 0,
        wordCount: 0
      };
    }

    const errors = [];
    const words = text.split(/\s+/).filter(word => word.length > 0);
    const wordCount = words.length;

    // Check for common typos
    words.forEach((word, index) => {
      const cleanWord = word.toLowerCase().replace(/[^\w]/g, '');
      if (this.commonTypos[cleanWord]) {
        errors.push({
          type: 'typo',
          position: index,
          original: word,
          suggestion: this.commonTypos[cleanWord],
          message: `Possible typo: '${word}' should be '${this.commonTypos[cleanWord]}'`
        });
      }
    });

    // Check for grammar mistakes
    this.grammarRules.forEach(rule => {
      let match;
      const regex = new RegExp(rule.pattern);
      while ((match = regex.exec(text)) !== null) {
        errors.push({
          type: 'grammar',
          position: match.index,
          original: match[0],
          suggestion: match[0].replace(new RegExp(rule.pattern), rule.correction),
          message: rule.message
        });
      }
    });

    // Check punctuation
    this.punctuationRules.forEach(rule => {
      let match;
      const regex = new RegExp(rule.pattern);
      while ((match = regex.exec(text)) !== null) {
        errors.push({
          type: 'punctuation',
          position: match.index,
          original: match[0],
          suggestion: null,
          message: rule.message
        });
      }
    });

    // Sort errors by position
    errors.sort((a, b) => a.position - b.position);

    return {
      originalText: text,
      errors: errors,
      errorCount: errors.length,
      wordCount: wordCount,
      hasErrors: errors.length > 0
    };
  }

  /**
   * Auto-correct text by applying all suggested fixes
   * @param {string} text - The text to correct
   * @returns {string} - Corrected text
   */
  autoCorrect(text) {
    if (!text || typeof text !== 'string') {
      return text || '';
    }

    let correctedText = text;

    // Fix typos
    Object.keys(this.commonTypos).forEach(typo => {
      const correction = this.commonTypos[typo];
      const regex = new RegExp(`\\b${typo}\\b`, 'gi');
      correctedText = correctedText.replace(regex, correction);
    });

    // Fix grammar issues
    this.grammarRules.forEach(rule => {
      correctedText = correctedText.replace(rule.pattern, rule.correction);
    });

    return correctedText;
  }

  /**
   * Get a summary of the check results
   * @param {Object} results - Results from check() method
   * @returns {string} - Human-readable summary
   */
  getSummary(results) {
    if (!results.hasErrors) {
      return `✓ No errors found! Text has ${results.wordCount} words.`;
    }

    const typoCount = results.errors.filter(e => e.type === 'typo').length;
    const grammarCount = results.errors.filter(e => e.type === 'grammar').length;
    const punctuationCount = results.errors.filter(e => e.type === 'punctuation').length;

    let summary = `Found ${results.errorCount} issue(s) in ${results.wordCount} words:\n`;
    if (typoCount > 0) summary += `  - ${typoCount} typo(s)\n`;
    if (grammarCount > 0) summary += `  - ${grammarCount} grammar error(s)\n`;
    if (punctuationCount > 0) summary += `  - ${punctuationCount} punctuation issue(s)\n`;

    return summary;
  }
}

module.exports = GrammarChecker;
