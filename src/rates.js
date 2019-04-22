'use strict';

const config = require('./config.js');
const TelegramBot = require('node-telegram-bot-api');
const _ = require('lodash');
const request = require('request');
const uuidV4 = require('uuid/v4');
const bot = new TelegramBot(config.token, { polling: true });

const wadaxBtc = "https://wadax.io/v2/tickers/RUNESBTC";
const altMarketsBtc = "https://altmarkets.io/api/v2/tickers/runesbtc";
const altMarketsDoge = "https://altmarkets.io/api/v2/tickers/runesdoge";

/////////////////////////////////////////////////////////////////////////////// 
// Functions //////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
const getExchangeRates = function (url) {
    return new Promise(function (resolve, reject) {
        request(url, function (error, response, body) {
            if (error) {
                reject(error);
            }
	    console.log(body);
            resolve(body);
        });
    });
};


/////////////////////////////////////////////////////////////////////////////// 
// COMMANDS ///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
const helpText =
        `Runebase Exchange Rates
usage:
Get Exchange rates: /rates
`;

bot.onText(/\/start.*/, function (msg) {
    bot.sendMessage(msg.chat.id, helpText);
});

bot.onText(/\/help.*/, function (msg) {
    bot.sendMessage(msg.chat.id, helpText);
});

bot.onText(/\/rates.*/, function (msg) {
    // Wadax BTC rates
    getExchangeRates(wadaxBtc).then(function (data) {
	let wadaxrates = JSON.parse(data);
        const content = `Wadax.io RUNES/BTC Exchange Rates
Buy price: ${parseFloat(wadaxrates.buy).toFixed(8)}
Sell price: ${parseFloat(wadaxrates.sell).toFixed(8)}
Last price: ${parseFloat(wadaxrates.last).toFixed(8)}
24h low: ${wadaxrates.low}
24h high: ${wadaxrates.high}
24h change: ${wadaxrates.change} %
24h baseVolume: ${wadaxrates.baseVolume}
`;
	bot.sendMessage(msg.chat.id, content);
    });

    // altmarkets BTC rates
    getExchangeRates(altMarketsBtc).then(function (data) {
	let altBtcRates = JSON.parse(data);
	console.log(altBtcRates);
        const content = `AltMarkets.io RUNES/BTC Exchange Rates
Buy price: ${parseFloat(altBtcRates.ticker.buy).toFixed(8)}
Sell price: ${parseFloat(altBtcRates.ticker.sell).toFixed(8)}
Last price: ${parseFloat(altBtcRates.ticker.last).toFixed(8)}
24h low: ${altBtcRates.ticker.low}
24h high: ${altBtcRates.ticker.high}
24h baseVolume: ${altBtcRates.ticker.vol}
`;
	bot.sendMessage(msg.chat.id, content);
    });
    // altmarkets DOGE rates
    getExchangeRates(altMarketsDoge).then(function (data) {
	let altDogeRates = JSON.parse(data);
	console.log(altDogeRates);
        const content = `AltMarkets.io RUNES/DOGE Exchange Rates
Buy price: ${parseFloat(altDogeRates.ticker.buy).toFixed(8)}
Sell price: ${parseFloat(altDogeRates.ticker.sell).toFixed(8)}
Last price: ${parseFloat(altDogeRates.ticker.last).toFixed(8)}
24h low: ${altDogeRates.ticker.low}
24h high: ${altDogeRates.ticker.high}
24h baseVolume: ${altDogeRates.ticker.vol}
`;
	bot.sendMessage(msg.chat.id, content);
    });
});

module.exports = bot;
