# Fix My Typo

A professional proofreading micro-service for finding and fixing typos in blog posts, emails, and product descriptions for $1-5 per document.

## 📦 What's Included

This repository contains everything you need to start a proofreading service on Fiverr:

### 1. Fiverr Gig Template (`fiverr-gig-template.md`)
Complete Fiverr gig listing with:
- Professional gig title and description
- 3 pricing tiers (Basic $5, Standard $10, Premium $25)
- FAQ section
- Tags and category suggestions
- Gig requirements

### 2. Sample Fixes (`sample-fixes.md`)
Real-world examples demonstrating service quality:
- 4 detailed before/after samples
- Blog posts, emails, product descriptions, and social media
- Lists all corrections made with explanations
- Shows turnaround times

### 3. Client Outreach Scripts (`client-outreach-scripts.md`)
8 proven email templates for:
- Cold outreach
- Follow-ups
- Proposals
- Thank you messages
- Upselling
- Handling objections
- Social media outreach

### 4. Node.js Grammar Checker Tool
A functional web-based grammar checker with:
- Real-time typo detection
- Grammar error identification
- Auto-correction feature
- Beautiful, responsive UI
- REST API for integrations

## 🚀 Quick Start

### Prerequisites
- Node.js 14 or higher
- npm (comes with Node.js)

### Installation

1. Clone this repository:
```bash
git clone https://github.com/jonastrance/fix-my-typo.git
cd fix-my-typo
```

2. Install dependencies:
```bash
npm install
```

### Usage

#### Web Interface
Start the web server:
```bash
npm start
```

Then open your browser to `http://localhost:3000`

#### Command Line Interface
Run the CLI tool:
```bash
npm run check
```

#### Run Tests
```bash
npm test
```

## 🎯 Features

### Grammar Checker Capabilities
- ✅ Detects 35+ common typos (alot, beleive, recieve, etc.)
- ✅ Identifies grammar mistakes (your/you're, their/there, should of, etc.)
- ✅ Catches punctuation issues
- ✅ Auto-correction functionality
- ✅ Word count statistics
- ✅ Detailed error reporting with suggestions

### Web UI Features
- 🎨 Modern, responsive design
- 📊 Real-time error analysis
- 🔄 Auto-correct mode
- 📋 Copy to clipboard
- 📱 Mobile-friendly
- ⚡ Fast client-side processing

## 📚 API Usage

### Check Text Endpoint
```javascript
POST /api/check
Content-Type: application/json

{
  "text": "Your text to check here"
}
```

Response:
```javascript
{
  "success": true,
  "results": {
    "originalText": "...",
    "errors": [...],
    "errorCount": 3,
    "wordCount": 25,
    "hasErrors": true
  },
  "summary": "Found 3 issue(s)..."
}
```

### Auto-Correct Endpoint
```javascript
POST /api/correct
Content-Type: application/json

{
  "text": "Your text to correct here"
}
```

Response:
```javascript
{
  "success": true,
  "originalText": "...",
  "correctedText": "...",
  "originalErrors": 3,
  "remainingErrors": 0
}
```

## 🛠️ Project Structure

```
fix-my-typo/
├── src/
│   ├── checker.js       # Core grammar checking logic
│   ├── server.js        # Express web server
│   └── cli.js           # Command-line interface
├── public/
│   ├── index.html       # Web UI
│   ├── styles.css       # Styling
│   └── app.js           # Frontend JavaScript
├── test/
│   └── test-checker.js  # Test suite
├── fiverr-gig-template.md
├── sample-fixes.md
├── client-outreach-scripts.md
├── package.json
└── README.md
```

## 🎓 Using the Fiverr Templates

1. **Review the Gig Template**: Open `fiverr-gig-template.md` and customize it with your own experience and credentials

2. **Customize Pricing**: Adjust the pricing packages based on your target market

3. **Use Sample Fixes**: Share examples from `sample-fixes.md` in your gig images or portfolio

4. **Start Outreach**: Use scripts from `client-outreach-scripts.md` to contact potential clients

5. **Offer Free Samples**: Use the grammar checker tool to provide quick free samples to prospects

## 💡 Tips for Success

1. **Start with the Basic Package**: Get your first reviews with the $5 package
2. **Respond Quickly**: Fast response times lead to more orders
3. **Deliver Early**: Always deliver before the deadline
4. **Ask for Reviews**: Happy clients usually leave great reviews if asked
5. **Use the Tool**: Leverage the grammar checker for quick initial passes
6. **Upsell Services**: Offer additional services like formatting or rewriting

## 🧪 Testing

The project includes comprehensive tests covering:
- Typo detection
- Grammar error identification
- Auto-correction
- Edge cases (empty text, special characters)
- Error classification

All 15 tests pass successfully.

## 📝 License

MIT License - feel free to use this for your own proofreading business!

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Add more common typos to the checker
- Improve grammar rules
- Enhance the UI
- Add more outreach scripts
- Improve documentation

## 📧 Support

For questions or issues, please open an issue on GitHub.

---

**Ready to start your proofreading business?** Use these templates and tools to launch your Fiverr gig today! 🚀
