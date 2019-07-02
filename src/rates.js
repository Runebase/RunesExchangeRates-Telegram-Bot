'use strict';

const config = require('./config.js');
const TelegramBot = require('node-telegram-bot-api');
const request = require('request');
const bot = new TelegramBot(config.token, { polling: true });
const txbitRates = require('./models/txbitRates');
const altMarketRates = require('./models/altMarketRates');

const txbitBtc = "https://api.txbit.io/api/public/getmarketsummary?market=RUNES/BTC";
const txbitEth = "https://api.txbit.io/api/public/getmarketsummary?market=RUNES/ETH";
const txbitXlr = "https://api.txbit.io/api/public/getmarketsummary?market=RUNES/XLR";
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
    // Txbit BTC rates
    getExchangeRates(txbitBtc).then(function (data) {
        try {
            const message = new txbitRates(data).translate();
            bot.sendMessage(msg.chat.id, message.content);            
          } catch (err) {
            console.log(`ERROR: ${err.message}`);
          }	
    });
    // Txbit ETH rates
    getExchangeRates(txbitEth).then(function (data) {
        try {
            const message = new txbitRates(data).translate();
            bot.sendMessage(msg.chat.id, message.content);            
          } catch (err) {
            console.log(`ERROR: ${err.message}`);
          }	
    });
    // Txbit XLR rates
    getExchangeRates(txbitXlr).then(function (data) {
        try {
            const message = new txbitRates(data).translate();
            bot.sendMessage(msg.chat.id, message.content);            
          } catch (err) {
            console.log(`ERROR: ${err.message}`);
          }	
    });
    // altmarkets BTC rates
    getExchangeRates(altMarketsBtc).then(function (data) {
        try {
            const market = "BTC"
            const message = new altMarketRates(data, market).translate();
            bot.sendMessage(msg.chat.id, message.content);            
          } catch (err) {
            console.log(`ERROR: ${err.message}`);
          } 
    });
    // altmarkets DOGE rates
    getExchangeRates(altMarketsDoge).then(function (data) {
        try {
            const market = "DOGE"
            const message = new altMarketRates(data, market).translate();
            bot.sendMessage(msg.chat.id, message.content);            
          } catch (err) {
            console.log(`ERROR: ${err.message}`);
          } 
    });
});

module.exports = bot;
