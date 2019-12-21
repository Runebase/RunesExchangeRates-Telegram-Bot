#!/bin/bash -l

cd /home/bago/RunesExchangeRates-Telegram-Bot
bash
/usr/bin/screen -X -S rates quit
/usr/bin/screen -dmS rates
/usr/bin/screen -S rates -p 0 -X stuff "RUNES_EXCHANGE_RATES_TELEGRAM_BOT=781000602:AAHQaAn84-HM4tGIcOhO4fo1n7rL6nD4kfE nodemon index.js $(printf \\r)"
