class StatementBenford {
  #ticker;
  #tickerType;
  #financialStatement;
  #csin;
  #modelVersion;
  #countData;
  #frequencyData;

  constructor(options) {
    this.#ticker = options.ticker;
    this.#tickerType = options.tickerType;
    this.#financialStatement = options.financialStatement;
  }

  getTicker() {
    return this.#ticker;
  }

  getTickerType() {
    return this.#tickerType;
  }

  getFinancialStatement() {
    return this.#financialStatement;
  }

  getCSIN() {
    return this.#csin;
  }

  setCSIN(csin) {
    this.#csin = csin;
  }

  getModelVersion() {
    return this.#modelVersion;
  }

  setModelVersion(modelVersion) {
    this.#modelVersion = modelVersion;
  }

  getCountData() {
    return this.#countData;
  }

  setCountData(countDataArray) {
    // console.log('countDataArray', countDataArray);
    this.#countData = countDataArray;
    // console.log('countDataArray', this.#countData);
  }

  getFrequencyData() {
    return this.#frequencyData;
  }

  setFrequencyData(frequencyDataArray) {
    // console.log('frequencyDataArray', frequencyDataArray);
    this.#frequencyData = frequencyDataArray;
    // console.log('frequencyDataArray', this.#frequencyData);
  }
}

module.exports = StatementBenford;