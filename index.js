'use strict';

require('./src/rates');

const http = require('http');

const host = '0.0.0.0';
const port = process.env.PORT || 3004;

const server = http.createServer(function (req, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('This is a Telegram Bot, type @runesrates in ' +
            'Telegram chat to use it. The source code is at ' +
            'https://github.com/Runebase/RunesExchangeRates-Telegram-Bot');
});

server.listen(port, host, function () {
    console.log(`Server running at http://${host}:${port}/`);
});
