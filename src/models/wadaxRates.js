/* eslint no-underscore-dangle: 0 */
const _ = require('lodash');

class wadaxRates {
  constructor(data) {    
    if (!_.isEmpty(data)) {
      this.data = JSON.parse(data);
      this.decode();
    }
  }

  decode() {
        this.content = `Wadax.io RUNES/BTC Exchange Rates
Buy price: ${parseFloat(this.data.buy).toFixed(8)}
Sell price: ${parseFloat(this.data.sell).toFixed(8)}
Last price: ${parseFloat(this.data.last).toFixed(8)}
24h low: ${this.data.low}
24h high: ${this.data.high}
24h change: ${this.data.change} %
24h baseVolume: ${this.data.baseVolume}
`;
  }
  translate() {
    return {
      content: this.content,
    };
  }
}

module.exports = wadaxRates;