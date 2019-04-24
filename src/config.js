console.log(process.env.RUNES_EXCHANGE_RATES_TELEGRAM_BOT_TOKEN);

const config = {
    token: process.env.RUNES_EXCHANGE_RATES_TELEGRAM_BOT_TOKEN,
    maxResults: 30 // 50 is the maximum allowed by Telegram
};

module.exports = config;
