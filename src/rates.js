'use strict';

const config = require('./config.js');
const TelegramBot = require('node-telegram-bot-api');
const _ = require('lodash');
const request = require('request');
const uuidV4 = require('uuid/v4');
const bot = new TelegramBot(config.token, { polling: true });


const getWadaxExchangeRates = function () {
    const url = `https://wadax.io/v2/tickers/RUNESBTC`;

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
        'This bot is intended to be used in inline mode, just type ' +
        '@RunesExchangeRates in any chat.';

bot.onText(/\/start.*/, function (msg) {
    bot.sendMessage(msg.chat.id, helpText);
});

bot.onText(/\/help.*/, function (msg) {
    bot.sendMessage(msg.chat.id, helpText);
});

bot.onText(/\/rates.*/, function (msg) {
    bot.sendMessage(msg.chat.id, helpText);
    getWadaxExchangeRates().then(function (data) {
	const wadaxrates = JSON.parse(data);
        const content = `Wadax.io RUNES Exchange Rates
Buy price: ${wadaxrates.buy}
Sell price: ${wadaxrates.sell}
Last price: ${wadaxrates.last}
24h low: ${wadaxrates.low}
24h high: ${wadaxrates.high}
24h change: ${wadaxrates.change}
24h baseVolume: ${wadaxrates.baseVolume}
`;
	bot.sendMessage(msg.chat.id, content);
    });
});

module.exports = bot;
