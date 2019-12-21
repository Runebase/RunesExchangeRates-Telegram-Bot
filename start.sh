#!/bin/bash -l

cd /home/bago/RunesExchangeRates-Telegram-Bot
bash
/usr/bin/screen -X -S rates quit
/usr/bin/screen -dmS rates
/usr/bin/screen -S rates -p 0 -X stuff "RUNES_EXCHANGE_RATES_TELEGRAM_BOT=xxx nodemon index.js $(printf \\r)"
