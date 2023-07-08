const StatementBenford = require('./statementBenford');

class CompanyBenford extends StatementBenford {
  #statementBenfordArray;

  constructor(statementBenfordArray) {
    super({
      ticker: statementBenfordArray[0].getTicker(),
      tickerType: statementBenfordArray[0].getTickerType(),
      financialStatement: (statementBenfordArray => {
        const statementArray = [];

        statementBenfordArray.forEach(stmtBenford => {
        statementArray.push(stmtBenford.getFinancialStatement());
        });

        return statementArray;
      })(statementBenfordArray),
    });

    this.#statementBenfordArray = statementBenfordArray;
    this.setCSIN(statementBenfordArray[0].getCSIN());
    this.setModelVersion(statementBenfordArray[0].getModelVersion());
  }

  getStatementArray() {
    const statementArray = [];

    this.#statementBenfordArray.forEach(stmtBenford => {
      statementArray.push(stmtBenford.getFinancialStatement());
    });

    return statementArray;
  }

  getStatementBenfordArray() {
    return this.#statementBenfordArray;
  }
}

module.exports = CompanyBenford;