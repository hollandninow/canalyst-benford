const StatementBenford = require('./statementBenford');

class SectorBenford extends StatementBenford {
  #companyBenfordArray;
  #sector;
  #sectorCountData;
  #sectorFrequencyData;

  constructor(companyBenfordArray, sector) {
    super({
      ticker: 'Multiple',
      tickerType: 'Multiple',
      financialStatement: 'Multiple',
    });

    this.#sector = sector;
    this.#companyBenfordArray = companyBenfordArray;
    this.setCSIN(companyBenfordArray[0].getCSIN());
    this.setModelVersion(companyBenfordArray[0].setModelVersion());
  }

  getCompanyBenfordArray() {
    return this.#companyBenfordArray;
  }

  getSector() {
    return this.#sector;
  }

  getSectorCountData() {
    return this.#sectorCountData;
  }

  setSectorCountData(data) {
    this.#sectorCountData = data;
  }

  getSectorFrequencyData() {
    return this.#sectorFrequencyData;
  }

  setSectorFrequencyData(data) {
    this.#sectorFrequencyData = data;
  }
}

module.exports = SectorBenford;