'use strict';

const config = require('./config.js');
const TelegramBot = require('node-telegram-bot-api');
const _ = require('lodash');
const request = require('request');
const uuidV4 = require('uuid/v4');
const bot = new TelegramBot(config.token, { polling: true });


const getExchangeRates = function () {
    const url = `https://`;

    return new Promise(function (resolve, reject) {
        request(url, function (error, response, body) {
            if (error) {
                reject(error);
            }
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
    getExchangeRates().then(function (data) {
        data = _.get(JSON.parse(data), 'result', {});
        let key = _.keys(data);
        if (key.length !== 1) {
            bot.answerInlineQuery(inlineId, []);
            return;
        }
        key = key[0];
        data = data[key];


        const content = `Data here`;
	bot.sendMessage(msg.chat.id, content);
    });
});

module.exports = bot;
