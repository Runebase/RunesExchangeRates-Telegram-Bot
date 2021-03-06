'use strict';

const _ = require('lodash');
const config = require('./config.js');
const TelegramBot = require('node-telegram-bot-api');
const request = require('request');
const bot = new TelegramBot(config.token, { polling: true });
const txbitRates = require('./models/txbitRates');
const altMarketRates = require('./models/altMarketRates');
const fcExchangeRates = require('./models/fcExchangeRates');

const txbitBtc = "https://api.txbit.io/api/public/getmarketsummary?market=RUNES/BTC";
const txbitEth = "https://api.txbit.io/api/public/getmarketsummary?market=RUNES/ETH";
const txbitXlr = "https://api.txbit.io/api/public/getmarketsummary?market=RUNES/XLR";
const altMarketsBtc = "https://altmarkets.io/api/v2/tickers/runesbtc";
const altMarketsDoge = "https://altmarkets.io/api/v2/tickers/runesdoge";
const fcExchangeBtc = "https://fanaticoscriptos.exchange/api/v1/markets/BTC/orders/RUNES/summary";
const fcExchangeDoge = "https://fanaticoscriptos.exchange/api/v1/markets/DOGE/orders/RUNES/summary";
const fcExchangeSpero = "https://fanaticoscriptos.exchange/api/v1/markets/SPERO/orders/RUNES/summary";

///////////////////////////////////////////////////////////////////////////////
// Functions //////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
const getExchangeRates = function (url) {
    return new Promise(function (resolve, reject) {
        request(url, function (error, response, body) {
            if (error) {
                reject(error);
            }
	    //console.log(body);
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

bot.onText(/\/rates.*/, async function (msg) {
    let message = '';

    // fanaticoscriptos BTC rates
    await getExchangeRates(fcExchangeBtc).then(function (data) {
        try {
            const market = "BTC"
            const newData = JSON.parse(data);
            const addMessage = new fcExchangeRates(newData, market).translate();
            message += addMessage.content;
          } catch (err) {
            console.log(err);
            message += `<a href='https://fanaticoscriptos.exchange/#/markets/BTC/RUNES'>Fanaticoscriptos.exchange | BTC/RUNES</a>
<code>Failed to fetch
</code>
`;
            console.log(`ERROR: ${err.message}`);
          }
    });
    // fanaticoscriptos DOGE rates
    await getExchangeRates(fcExchangeDoge).then(function (data) {
        try {
            const market = "DOGE"
            const newData = JSON.parse(data);
            const addMessage = new fcExchangeRates(newData, market).translate();
            message += addMessage.content;
          } catch (err) {
            console.log(err);
            message += `<a href='https://fanaticoscriptos.exchange/#/markets/DOGE/RUNES'>Fanaticoscriptos.exchange | DOGE/RUNES</a>
<code>Failed to fetch
</code>
`;
            console.log(`ERROR: ${err.message}`);
          }
    });

    // fanaticoscriptos SPERO rates
    await getExchangeRates(fcExchangeBtc).then(function (data) {
        try {
            const market = "SPERO"
            const newData = JSON.parse(data);
            const addMessage = new fcExchangeRates(newData, market).translate();
            message += addMessage.content;
          } catch (err) {
            console.log(err);
            message += `<a href='https://fanaticoscriptos.exchange/#/markets/SPERO/RUNES'>Fanaticoscriptos.exchange | SPERO/RUNES</a>
<code>Failed to fetch
</code>
`;
            console.log(`ERROR: ${err.message}`);
          }
    });

    // Txbit BTC rates
    await getExchangeRates(txbitBtc).then(function (data) {
        try {
        	const market = "BTC"
            const addMessage = new txbitRates(data, market).translate();
            message += addMessage.content;
            //bot.sendMessage(msg.chat.id, message.content);
          } catch (err) {
            message += `<a href='https://txbit.io/Trade/RUNES/BTC'>Txbit.io | RUNES/BTC</a>
<code>Failed to fetch
</code>
`;
            console.log(`ERROR: ${err.message}`);
          }
    });
    // Txbit ETH rates
    await getExchangeRates(txbitEth).then(function (data) {
        try {
        	const market = "ETH"
            const addMessage = new txbitRates(data, market).translate();
            message += addMessage.content;
            //bot.sendMessage(msg.chat.id, message.content);
          } catch (err) {
            message += `<a href='https://txbit.io/Trade/RUNES/ETH'>Txbit.io | RUNES/ETH</a>
<code>Failed to fetch
</code>
`;
            console.log(`ERROR: ${err.message}`);
          }
    });
    // Txbit XLR rates
    await getExchangeRates(txbitXlr).then(function (data) {
        try {
        	const market = "XLR"
            const addMessage = new txbitRates(data, market).translate();
            message += addMessage.content;
            //bot.sendMessage(msg.chat.id, message.content);
          } catch (err) {
            message += `<a href='https://txbit.io/Trade/RUNES/XLR'>Txbit.io | RUNES/XLR</a>
<code>Failed to fetch
</code>
`;
            console.log(`ERROR: ${err.message}`);
          }
    });
    // altmarkets BTC rates
    await getExchangeRates(altMarketsBtc).then(function (data) {
        try {
            const market = "BTC"
            const addMessage = new altMarketRates(data, market).translate();
            message += addMessage.content;
            //bot.sendMessage(msg.chat.id, message.content);
          } catch (err) {
            message += `<a href='https://altmarkets.io/trading/runesbtc'>AltMarkets.io | RUNES/BTC</a>
<code>Failed to fetch
</code>
`;
            console.log(`ERROR: ${err.message}`);
          }
    });
    // altmarkets DOGE rates
    await getExchangeRates(altMarketsDoge).then(async function (data) {
        try {
            const market = "DOGE"
            const addMessage = new altMarketRates(data, market).translate();
            message += addMessage.content;
            console.log(JSON.stringify(message));
            //bot.sendMessage(msg.chat.id, message.content);
          } catch (err) {
            message += `<a href='https://altmarkets.io/trading/runesdoge'>AltMarkets.io | RUNES/DOGE</a>
<code>Failed to fetch
</code>
`;
            console.log(`ERROR: ${err.message}`);
          }
    });
    bot.sendMessage(msg.chat.id, message, {parse_mode : "HTML"});
});

module.exports = bot;
