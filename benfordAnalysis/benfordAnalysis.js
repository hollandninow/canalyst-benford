const QueryMDSCompanyBulkData = require('../queryMDS/queryMDSCompanyBulkData');
const QueryMDSEquityModelSeriesSet = require('../queryMDS/queryMDSEquityModelSeriesSet');
const CompanyBulkData = require('../dataCSV/companyBulkData');
const EquityModelSeriesSet = require('../equityModelSeriesSet/equityModelSeriesSet');
const LeadingDigitCounter = require('../helpers/leadingDigitCounter');
const { calculateLeadingDigitFrequencies } = require('../helpers/leadingDigitFrequency');
const StatementBenford = require('../benfordAnalysis/statementBenford');

class BenfordAnalysis {
  constructor(token, ticker, tickerType) {
    this.token = token;
    this.ticker = ticker;
    this.tickerType = tickerType;
  }

  async performMultipleAnalyses(fsStringArray) {
    const benfordData = [];

    for(let i = 0; i < fsStringArray.length; i++) {
      const financialStatementStr = fsStringArray[i];

      benfordData[i] = await this.performAnalysis(financialStatementStr);
    }

    return benfordData;
  }

  async performAnalysis(financialStatementStr) {
    const statementBenfordObj = new StatementBenford({
      ticker: this.ticker,
      tickerType: this.tickerType,
      financialStatement: financialStatementStr,
    });

    // const benfordObj = {
    //   ticker: this.ticker,
    //   tickerType: this.tickerType,
    //   financialStatement: financialStatementStr,
    // };
    
    const equityModelSeriesSet = await new QueryMDSEquityModelSeriesSet(this.token, {
      bloombergTicker: this.ticker, format: 'json'
    }).getEquityModelSeriesSet();

    const model = new EquityModelSeriesSet(equityModelSeriesSet);

    statementBenfordObj.setCSIN(model.getCSIN());
    statementBenfordObj.setModelVersion(model.getCurrentModelVersion());

    const companyBulkDataCSV = await new QueryMDSCompanyBulkData(
        this.token, 
        statementBenfordObj.getCSIN(), 
        statementBenfordObj.getModelVersion()
      ).getCompanyBulkDataCSV();

    const financialStatementData = new CompanyBulkData(companyBulkDataCSV).getFinancialStatementData(financialStatementStr);
 
    // benfordObj.data = new LeadingDigitCounter().countLeadingDigits(financialStatementData);

    statementBenfordObj.setCountData(
      new LeadingDigitCounter().countLeadingDigits(financialStatementData)
    );

    // benfordObj.frequencyData = calculateLeadingDigitFrequencies(benfordObj.data, {rounded: true});

    statementBenfordObj.setFrequencyData(
      calculateLeadingDigitFrequencies(statementBenfordObj.getCountData(), {rounded: true})
    );

    return statementBenfordObj;
  }
}

module.exports = BenfordAnalysis;