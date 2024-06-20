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

function handleInput() {
    const input = document.getElementById('tickerInput').value.trim().toUpperCase();
    const suggestionsContainer = document.getElementById('suggestions');
    const commandsContainer = document.getElementById('commands');
    
    suggestionsContainer.innerHTML = ''; // Clear previous suggestions
    commandsContainer.innerHTML = ''; // Clear previous commands

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
    } else if (input) {
        const filteredStocks = stockList.filter(stock => 
            stock.ticker.startsWith(input) || stock.name.toUpperCase().includes(input)
        );

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
                        <button class="button">Other</button>
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

function clearInput() {
    document.getElementById('tickerInput').value = ''; // Clear the input field
    document.getElementById('suggestions').innerHTML = ''; // Clear suggestions
    document.getElementById('commands').innerHTML = ''; // Clear commands
}
