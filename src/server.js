/**
 * Express Web Server for Grammar Checker
 * 
 * NOTE: This is a demo/local development tool. 
 * For production deployment, consider adding:
 * - Rate limiting (e.g., express-rate-limit package)
 * - Authentication
 * - HTTPS
 * - Input validation/sanitization
 * - CORS configuration
 */

const express = require('express');
const path = require('path');
const GrammarChecker = require('./checker');

const app = express();
const PORT = process.env.PORT || 3000;
const checker = new GrammarChecker();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

// Routes
// NOTE: For production, add rate limiting to prevent abuse
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.post('/api/check', (req, res) => {
  const { text } = req.body;
  
  if (!text) {
    return res.status(400).json({
      error: 'No text provided'
    });
  }

  try {
    const results = checker.check(text);
    const summary = checker.getSummary(results);
    
    res.json({
      success: true,
      results: results,
      summary: summary
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error processing text',
      message: error.message
    });
  }
});

app.post('/api/correct', (req, res) => {
  const { text } = req.body;
  
  if (!text) {
    return res.status(400).json({
      error: 'No text provided'
    });
  }

  try {
    const correctedText = checker.autoCorrect(text);
    const originalResults = checker.check(text);
    const correctedResults = checker.check(correctedText);
    
    res.json({
      success: true,
      originalText: text,
      correctedText: correctedText,
      originalErrors: originalResults.errorCount,
      remainingErrors: correctedResults.errorCount
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error correcting text',
      message: error.message
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Grammar Checker Server running on http://localhost:${PORT}`);
  console.log(`Open your browser and navigate to http://localhost:${PORT}`);
});

module.exports = app;
