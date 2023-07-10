const QueryMDSCompanyBulkData = require('../queryMDS/queryMDSCompanyBulkData');
const QueryMDSEquityModelSeriesSet = require('../queryMDS/queryMDSEquityModelSeriesSet');
const CompanyBulkData = require('../dataCSV/companyBulkData');
const EquityModelSeriesSet = require('../equityModelSeriesSet/equityModelSeriesSet');
const LeadingDigitCounter = require('../helpers/leadingDigitCounter');
const { calculateLeadingDigitFrequencies } = require('../helpers/leadingDigitFrequency');
const StatementBenford = require('../benfordAnalysis/statementBenford');
const CompanyBenford = require('../benfordAnalysis/companyBenford');

class BenfordAnalysis {
  #equityModelSeriesSet;
  #companyBulkDataCSV;

  constructor(token, ticker, tickerType) {
    this.token = token;
    this.ticker = ticker;
    this.tickerType = tickerType;
  }

  async performMultipleAnalyses(fsStringArray) {
    const statementBenfordArray = [];

    for(let i = 0; i < fsStringArray.length; i++) {
      const financialStatementStr = fsStringArray[i];

      statementBenfordArray[i] = await this.performAnalysis(financialStatementStr);
    }

    const companyBenfordObj = new CompanyBenford(statementBenfordArray);

    return companyBenfordObj;
  }

  async performAnalysis(financialStatementStr) {
    let startTime, endTime;

    const statementBenfordObj = new StatementBenford({
      ticker: this.ticker,
      tickerType: this.tickerType,
      financialStatement: financialStatementStr,
    });

    if (!this.#equityModelSeriesSet) {
      startTime = performance.now();

      this.#equityModelSeriesSet = await new QueryMDSEquityModelSeriesSet(this.token, {
        bloombergTicker: this.ticker, format: 'json'
      }).getEquityModelSeriesSet();
      endTime = performance.now();

      console.log(`Finished fetching equity model series set. Total time: ${Math.round(((endTime - startTime)/1000 + Number.EPSILON) * 100)/100} seconds.`);
    }

    const equityModelSeriesSet = this.#equityModelSeriesSet;

    const model = new EquityModelSeriesSet(equityModelSeriesSet);

    statementBenfordObj.setCSIN(model.getCSIN());
    statementBenfordObj.setModelVersion(model.getCurrentModelVersion());

    startTime = performance.now();
    if (!this.#companyBulkDataCSV) {
      this.#companyBulkDataCSV = await new QueryMDSCompanyBulkData(
        this.token, 
        statementBenfordObj.getCSIN(), 
        statementBenfordObj.getModelVersion()
      ).getCompanyBulkDataCSV();

      endTime = performance.now();
      console.log(`Finished fetching bulk data csv. Total time: ${Math.round(((endTime - startTime)/1000 + Number.EPSILON) * 100)/100} seconds.`);
    } 

    const companyBulkDataCSV = this.#companyBulkDataCSV;

    const financialStatementData = new CompanyBulkData(companyBulkDataCSV).getFinancialStatementData(financialStatementStr);

    statementBenfordObj.setCountData(
      new LeadingDigitCounter().countLeadingDigits(financialStatementData)
    );

    statementBenfordObj.setFrequencyData(
      calculateLeadingDigitFrequencies(statementBenfordObj.getCountData(), {rounded: true})
    );

    return statementBenfordObj;
  }
}

module.exports = BenfordAnalysis;