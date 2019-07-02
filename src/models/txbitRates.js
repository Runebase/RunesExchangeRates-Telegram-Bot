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
        console.log (this.data);
        this.content = `Txbit.io ${this.data.result.MarketName} Exchange Rates
Buy price: ${parseFloat(this.data.result.Bid).toFixed(8)}
Sell price: ${parseFloat(this.data.result.Ask).toFixed(8)}
Last price: ${parseFloat(this.data.result.Last).toFixed(8)}
24h low: ${parseFloat(this.data.result.Low).toFixed(8)}
24h high: ${parseFloat(this.data.result.High).toFixed(8)}
24h volume: ${parseFloat(this.data.result.BaseVolume).toFixed(8)}
`;
  }
  translate() {
    return {
      content: this.content,
    };
  }
}

module.exports = wadaxRates;