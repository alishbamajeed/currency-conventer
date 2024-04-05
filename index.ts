#!  /usr/bin/env  node


import inquirer from "inquirer"
import chalk from 'chalk';

interface ExchangeRates {
    [key: string]: number;
}

// let test = inquirer.prom

class CurrencyConverter {
    private exchangeRates: ExchangeRates;

    constructor() {
        // Define exchange rates
        this.exchangeRates = {
            'USD': 500.00,
            'EUR': 0.82,
            'GBP': 0.73,
            'Pak': 109.50,
            // Add more currencies and their exchange rates here
        };
    }

    convert(amount: number, fromCurrency: string, toCurrency: string): number {
        if (!this.exchangeRates[fromCurrency] || !this.exchangeRates[toCurrency]) {
            throw new Error('Invalid currency');
        }

        const rateFrom = this.exchangeRates[fromCurrency];
        const rateTo = this.exchangeRates[toCurrency];

        // Convert amount from 'fromCurrency' to 'toCurrency'
        const convertedAmount = (amount / rateFrom) * rateTo;

        return convertedAmount;
    }

    async promptConversion(): Promise<void> {
        const questions = [
            {
                type: 'input',
                name: 'amount',
                message: 'Enter the amount to convert :'
            },
            {
                type: 'list',
                name: 'fromCurrency',
                message: 'Select the currency to convert from:',
                choices: Object.keys(this.exchangeRates)
            },
            {
                type: 'list',
                name: 'toCurrency',
                message: 'Select the currency to convert to:',
                choices: Object.keys(this.exchangeRates)
            }
        ];

        const answers = await inquirer.prompt(questions);
        const amount = parseFloat(answers.amount);
        const convertedAmount = this.convert(amount, answers.fromCurrency, answers.toCurrency);

        console.log(chalk.green(`${amount} ${answers.fromCurrency}`) + chalk.yellow(' is ') + chalk.blue(`${convertedAmount.toFixed(2)} ${answers.toCurrency}`));
    }
}

// Create an instance of the currency converter and prompt for conversion
const converter = new CurrencyConverter();
converter.promptConversion();
