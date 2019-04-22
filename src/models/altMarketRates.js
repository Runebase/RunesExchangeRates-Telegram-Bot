/* eslint no-underscore-dangle: 0 */
const _ = require('lodash');

class altMarketRates {
  constructor(data, market) {    
    if (!_.isEmpty(data)) {
      this.data = JSON.parse(data);
      this.market = market;
      this.decode();
    }
  }

  decode() {
this.content = `AltMarkets.io RUNES/${this.market} Exchange Rates
Buy price: ${parseFloat(this.data.ticker.buy).toFixed(8)}
Sell price: ${parseFloat(this.data.ticker.sell).toFixed(8)}
Last price: ${parseFloat(this.data.ticker.last).toFixed(8)}
24h low: ${this.data.ticker.low}
24h high: ${this.data.ticker.high}
24h baseVolume: ${this.data.ticker.vol}
`;
  }
  translate() {
    return {
      content: this.content,
    };
  }
}

module.exports = altMarketRates;