const StatementBenford = require('./statementBenford');

class CompanyBenford extends StatementBenford {
  #ticker;
  #tickerType;
  #financialStatements;
  #csin;
  #modelVersion;

  constructor(options) {
    super(options);
  }
}