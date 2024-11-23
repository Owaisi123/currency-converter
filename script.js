const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');
const amountInput = document.getElementById('amount');
const convertButton = document.getElementById('convert');
const resultDiv = document.getElementById('result');

const apiKey = 'YOUR_API_KEY'; 
const apiUrl = 'https://api.exchangerate-api.com/v4/latest/'; 


async function loadCurrencies() {
    const response = await fetch(apiUrl + 'USD'); 
    const data = await response.json();
    const currencies = Object.keys(data.rates);

    currencies.forEach(currency => {
        const option1 = new Option(currency, currency);
        const option2 = new Option(currency, currency);
        fromCurrency.add(option1);
        toCurrency.add(option2);
    });
}

convertButton.addEventListener('click', async () => {
    const amount = amountInput.value;
    const from = fromCurrency.value;
    const to = toCurrency.value;

    if (!amount || amount <= 0) {
        alert('Please enter a valid amount.');
        return;
    }

    try {
        const response = await fetch(apiUrl + from);
        const data = await response.json();
        const rate = data.rates[to];
        const convertedAmount = (amount * rate).toFixed(2);
        resultDiv.innerHTML = `${amount} ${from} = ${convertedAmount} ${to}`;
    } catch (error) {
        console.error(error);
        resultDiv.innerHTML = '<p>Error fetching conversion rate.</p>';
    }
});

loadCurrencies();
