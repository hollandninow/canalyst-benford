class StatementBenford {
  #ticker;
  #tickerType;
  #companyName;
  #financialStatement;
  #csin;
  #modelVersion;
  #countData;
  #frequencyData;
  #errorBarData;

  constructor(options) {
    if(!options.ticker)
      throw new Error('ticker is undefined.');

    if(!options.tickerType)
      throw new Error('tickerType is undefined.');

    if(!options.financialStatement)
      throw new Error('financialStatement is undefined.');

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

  getCompanyName() {
    return this.#companyName;
  }

  setCompanyName(companyName) {
    this.#companyName = companyName;
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

  setCountData(countDataObj) {
    this.#countData = countDataObj;
  }

  getFrequencyData() {
    return this.#frequencyData;
  }

  setFrequencyData(frequencyDataObj) {
    this.#frequencyData = frequencyDataObj;
  }

  getErrorBarData() {
    return this.#errorBarData;
  }

  setErrorBarData(errorBarArray) {
    this.#errorBarData = errorBarArray;
  }
}

module.exports = StatementBenford;