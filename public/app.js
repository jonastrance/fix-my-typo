/**
 * Frontend JavaScript for Grammar Checker UI
 */

document.addEventListener('DOMContentLoaded', () => {
    const inputText = document.getElementById('inputText');
    const checkBtn = document.getElementById('checkBtn');
    const correctBtn = document.getElementById('correctBtn');
    const clearBtn = document.getElementById('clearBtn');
    const copyBtn = document.getElementById('copyBtn');
    const resultsSection = document.getElementById('resultsSection');
    const summary = document.getElementById('summary');
    const errorList = document.getElementById('errorList');
    const correctedTextSection = document.getElementById('correctedText');
    const loading = document.getElementById('loading');

    // Check for errors
    checkBtn.addEventListener('click', async () => {
        const text = inputText.value.trim();
        
        if (!text) {
            alert('Please enter some text to check.');
            return;
        }

        showLoading();
        hideResults();

        try {
            const response = await fetch('/api/check', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text })
            });

            const data = await response.json();

            if (data.success) {
                displayCheckResults(data);
            } else {
                alert('Error: ' + (data.error || 'Unknown error'));
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to check text. Please try again.');
        } finally {
            hideLoading();
        }
    });

    // Auto-correct text
    correctBtn.addEventListener('click', async () => {
        const text = inputText.value.trim();
        
        if (!text) {
            alert('Please enter some text to correct.');
            return;
        }

        showLoading();
        hideResults();

        try {
            const response = await fetch('/api/correct', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text })
            });

            const data = await response.json();

            if (data.success) {
                displayCorrectionResults(data);
            } else {
                alert('Error: ' + (data.error || 'Unknown error'));
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to correct text. Please try again.');
        } finally {
            hideLoading();
        }
    });

    // Clear text
    clearBtn.addEventListener('click', () => {
        inputText.value = '';
        hideResults();
        inputText.focus();
    });

    // Copy corrected text
    copyBtn.addEventListener('click', () => {
        const textDisplay = correctedTextSection.querySelector('.text-display');
        const text = textDisplay.textContent;
        
        navigator.clipboard.writeText(text).then(() => {
            const originalText = copyBtn.textContent;
            copyBtn.textContent = '✓ Copied!';
            setTimeout(() => {
                copyBtn.textContent = originalText;
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy:', err);
            alert('Failed to copy to clipboard');
        });
    });

    function displayCheckResults(data) {
        const { results, summary: summaryText } = data;
        
        // Display summary
        summary.textContent = summaryText;
        
        // Display errors
        errorList.innerHTML = '';
        
        if (results.errors.length > 0) {
            results.errors.forEach((error, index) => {
                const errorItem = document.createElement('div');
                errorItem.className = `error-item ${error.type}`;
                
                const errorHeader = document.createElement('div');
                errorHeader.className = 'error-header';
                
                const errorType = document.createElement('span');
                errorType.className = 'error-type';
                errorType.textContent = error.type;
                
                const errorNumber = document.createElement('span');
                errorNumber.textContent = `#${index + 1}`;
                
                errorHeader.appendChild(errorType);
                errorHeader.appendChild(errorNumber);
                
                const errorContent = document.createElement('div');
                errorContent.className = 'error-content';
                
                const originalSpan = document.createElement('div');
                originalSpan.innerHTML = `Original: <span class="error-original">${escapeHtml(error.original)}</span>`;
                
                errorContent.appendChild(originalSpan);
                
                if (error.suggestion) {
                    const suggestionSpan = document.createElement('div');
                    suggestionSpan.innerHTML = `Suggestion: <span class="error-suggestion">${escapeHtml(error.suggestion)}</span>`;
                    errorContent.appendChild(suggestionSpan);
                }
                
                const messageSpan = document.createElement('div');
                messageSpan.className = 'error-message';
                messageSpan.textContent = error.message;
                errorContent.appendChild(messageSpan);
                
                errorItem.appendChild(errorHeader);
                errorItem.appendChild(errorContent);
                errorList.appendChild(errorItem);
            });
        } else {
            errorList.innerHTML = '<p style="color: #48bb78; font-weight: 600;">🎉 Great! No errors found in your text.</p>';
        }
        
        correctedTextSection.classList.add('hidden');
        showResults();
    }

    function displayCorrectionResults(data) {
        const { originalText, correctedText, originalErrors, remainingErrors } = data;
        
        // Display summary
        const summaryText = `Auto-correction complete!\n` +
                          `Original: ${originalErrors} error(s)\n` +
                          `After correction: ${remainingErrors} error(s)\n` +
                          `Fixed: ${originalErrors - remainingErrors} error(s)`;
        summary.textContent = summaryText;
        
        // Clear error list
        errorList.innerHTML = '';
        
        // Show corrected text
        const textDisplay = correctedTextSection.querySelector('.text-display');
        textDisplay.textContent = correctedText;
        correctedTextSection.classList.remove('hidden');
        
        showResults();
    }

    function showLoading() {
        loading.classList.remove('hidden');
    }

    function hideLoading() {
        loading.classList.add('hidden');
    }

    function showResults() {
        resultsSection.classList.remove('hidden');
    }

    function hideResults() {
        resultsSection.classList.add('hidden');
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Sample text for testing
    const sampleTexts = [
        "I beleive that alot of people dont realize how important it is to check there writing. Its a simple thing but it makes a big difference.",
        "We should of checked the report before sending it. Their were alot of typos and the client was not happy with recieving such a document.",
        "Your definately going to love this new product. Its more better then the old version and the price is very competetive."
    ];

    // Add sample button (hidden feature, can be uncommented)
    // const sampleBtn = document.createElement('button');
    // sampleBtn.textContent = 'Load Sample';
    // sampleBtn.className = 'btn btn-small';
    // sampleBtn.addEventListener('click', () => {
    //     const randomSample = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
    //     inputText.value = randomSample;
    // });
    // document.querySelector('.button-group').appendChild(sampleBtn);
});
