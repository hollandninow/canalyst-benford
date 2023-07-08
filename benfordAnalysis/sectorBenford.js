const StatementBenford = require('./statementBenford');

class SectorBenford extends StatementBenford {
  #companyBenfordArray;
  #sector;
  #statementBenfordArray;

  constructor(companyBenfordArray, statementBenfordArray, sector) {
    super({
      ticker: 'Multiple',
      tickerType: 'Multiple',
      financialStatement: companyBenfordArray[0].getStatementArray(),
    });

    this.#sector = sector;
    this.#companyBenfordArray = companyBenfordArray;
    this.#statementBenfordArray = statementBenfordArray;
    this.setCSIN(companyBenfordArray[0].getCSIN());
    this.setModelVersion(companyBenfordArray[0].setModelVersion());
  }

  getCompanyBenfordArray() {
    return this.#companyBenfordArray;
  }

  getSector() {
    return this.#sector;
  }

  getStatementBenfordArray() {
    return this.#statementBenfordArray;
  }
}

module.exports = SectorBenford;