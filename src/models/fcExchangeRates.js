/* eslint no-underscore-dangle: 0 */
const _ = require('lodash');

class fcExchangeRates {
  constructor(data, market) {
    if (!_.isEmpty(data)) {
      this.data = data.info;
      this.buyData = _.maxBy(data.buy, 'unitPrice');;
      this.sellData = _.minBy(data.sell, 'unitPrice');;
      this.market = market;
      this.decode();
    }
  }

  decode() {
this.content = `<a href='https://fanaticoscriptos.exchange/#/markets/${this.market}/RUNES'>Fanaticoscriptos.exchange | ${this.market}/RUNES</a>
<code>Buy price: ${parseFloat(this.buyData.unitPrice).toFixed(8)} ${this.market}
Sell price: ${parseFloat(this.sellData.unitPrice).toFixed(8)} ${this.market}
Last price: ${parseFloat(this.data.lastPrice).toFixed(8)} ${this.market}
24h low: ${this.data.low} ${this.market}
24h high: ${this.data.high} ${this.market}
24h volume: ${this.data.amount} ${this.market}
</code>
`;
  }
  translate() {
    return {
      content: this.content,
    };
  }
}

module.exports = fcExchangeRates;