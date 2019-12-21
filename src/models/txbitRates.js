/* eslint no-underscore-dangle: 0 */
const _ = require('lodash');

class txbitRates {
  constructor(data, market) {
    if (!_.isEmpty(data)) {
      this.data = JSON.parse(data);
      this.market = market;
      this.decode();
    }
  }

  decode() {
        this.content = `<a href='https://txbit.io/Trade/${this.data.result.MarketName}'>Txbit.io | ${this.data.result.MarketName}</a>
<code>Buy price: ${parseFloat(this.data.result.Bid).toFixed(8)} ${this.market}
Sell price: ${parseFloat(this.data.result.Ask).toFixed(8)} ${this.market}
Last price: ${parseFloat(this.data.result.Last).toFixed(8)} ${this.market}
24h low: ${parseFloat(this.data.result.Low).toFixed(8)} ${this.market}
24h high: ${parseFloat(this.data.result.High).toFixed(8)} ${this.market}
24h volume: ${parseFloat(this.data.result.BaseVolume).toFixed(8)} ${this.market}
</code>
`;
  }
  translate() {
    return {
      content: this.content,
    };
  }
}

module.exports = txbitRates;