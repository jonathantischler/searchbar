const stockList = [
    { ticker: 'AAPL', name: 'Apple Inc.' },
    { ticker: 'GOOGL', name: 'Alphabet Inc.' },
    { ticker: 'MSFT', name: 'Microsoft Corporation' },
    { ticker: 'AMZN', name: 'Amazon.com, Inc.' },
    { ticker: 'TSLA', name: 'Tesla, Inc.' }
];

const commandList = [
    { name: 'New Screen', url: 'https://www.google.com' },
    { name: 'View Existing Screen', url: 'https://www.google.com' },
    { name: 'New Portfolio', url: 'https://www.bing.com' },
    { name: 'View Existing Portfolio', url: 'https://www.bing.com' },
    { name: 'Aggregates', url: 'https://www.bing.com' }
];

function handleInput(event) {
    const input = document.getElementById('tickerInput').value.trim().toUpperCase();
    const suggestionsContainer = document.getElementById('suggestions');
    const commandsContainer = document.getElementById('commands');
    
    suggestionsContainer.innerHTML = ''; // Clear previous suggestions
    commandsContainer.innerHTML = ''; // Clear previous commands

    // Clear the background image when user types
    document.getElementById('tickerInput').style.backgroundImage = 'none';

    if (input.startsWith('/')) {
        const filteredCommands = commandList.filter(command => 
            command.name.toUpperCase().includes(input.substring(1))
        );

        filteredCommands.forEach(command => {
            const li = document.createElement('li');
            li.className = 'command-item';
            li.innerHTML = `<a href="${command.url}" target="_blank">${command.name}</a>`;
            commandsContainer.appendChild(li);
        });
    } else if (input.startsWith('ASK A QUESTION')) {
        // Allow the user to type a question
        if (event.key === 'Enter') {
            const li = document.createElement('li');
            li.className = 'suggestion-item';
            li.innerText = 'AI response goes here';
            suggestionsContainer.appendChild(li);
        }
    } else if (input) {
        const filteredStocks = stockList.filter(stock => 
            stock.ticker.startsWith(input) || stock.name.toUpperCase().includes(input)
        );

        if (filteredStocks.length === 0) {
            const li = document.createElement('li');
            li.className = 'suggestion-item';
            li.innerText = 'Not Found';
            suggestionsContainer.appendChild(li);
        } else {
            filteredStocks.forEach(stock => {
                const li = document.createElement('li');
                li.className = 'suggestion-item';
                li.innerHTML = `
                    <span>${stock.ticker} - ${stock.name}</span>
                    <div class="buttons">
                        <a href="https://finance.yahoo.com/quote/${stock.ticker}" class="button" target="_blank">Operations</a>
                        <a href="https://www.google.com/finance/quote/${stock.ticker}" class="button" target="_blank">Momentum</a>
                        <a href="https://www.marketwatch.com/investing/stock/${stock.ticker}" class="button" target="_blank">Valuation</a>
                        <div class="dropdown">
                            <button class="button">More</button>
                            <div class="dropdown-content">
                                <a href="https://www.bloomberg.com/quote/${stock.ticker}:US" target="_blank">Flex Valuation</a>
                                <a href="https://www.cnbc.com/quotes/${stock.ticker}" target="_blank">Peer Analysis</a>
                                <a href="https://www.reuters.com/markets/companies/${stock.ticker}" target="_blank">Business Resilience</a>
                            </div>
                        </div>
                    </div>
                `;
                suggestionsContainer.appendChild(li);
            });
        }
    }
}

function handleKeydown(event) {
    const tickerInput = document.getElementById('tickerInput');
    if (event.key === ' ') {
        tickerInput.style.backgroundImage = 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'200\' height=\'20\'><text x=\'0\' y=\'15\' fill=\'gray\' font-family=\'Arial\' font-size=\'16\'>Ask a question</text></svg>")';
        tickerInput.style.backgroundRepeat = 'no-repeat';
        tickerInput.style.backgroundPosition = 'center right';
    } else if (event.key === 'Enter') {
        handleInput(event);
    }
}

function handleFocus() {
    const tickerInput = document.getElementById('tickerInput');
    tickerInput.style.backgroundImage = 'none'; // Clear the background image
}

function clearInput() {
    const tickerInput = document.getElementById('tickerInput');
    tickerInput.value = ''; // Clear the input field
    tickerInput.style.backgroundImage = 'none'; // Clear the background image
    document.getElementById('suggestions').innerHTML = ''; // Clear suggestions
    document.getElementById('commands').innerHTML = ''; // Clear commands
}

document.getElementById('tickerInput').addEventListener('keydown', handleKeydown);
document.getElementById('tickerInput').addEventListener('input', handleInput);
document.getElementById('tickerInput').addEventListener('focus', handleFocus);
document.getElementById('clearButton').addEventListener('click', clearInput);
