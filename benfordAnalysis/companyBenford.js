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

  getStatementBenford(financialStatementStr) {
    const statementBenfordArray = this.#statementBenfordArray.filter( statementBenford => 
      statementBenford.getFinancialStatement() === financialStatementStr
    );

    if (statementBenfordArray.length !== 1)
      throw new Error('Multiple StatementBenford objects for a given financial statement string. There should only be one StatementBenford object per financial statement string.')

    return statementBenfordArray[0];
  }
}

module.exports = CompanyBenford;