const StatementBenford = require('./statementBenford');

class CompanyBenford extends StatementBenford {
  #statementBenfordArray;

  constructor(statementBenfordArray) {
    super({
      ticker: statementBenfordArray[0].getTicker(),
      tickerType: statementBenfordArray[0].getTickerType(),
      financialStatement: 'Multiple',
    });

    this.#statementBenfordArray = statementBenfordArray;
    this.setCSIN(statementBenfordArray[0].getCSIN());
    this.setModelVersion(statementBenfordArray[0].getModelVersion());
  }

  getStatementBenfordArray() {
    return this.#statementBenfordArray;
  }
}

module.exports = CompanyBenford;