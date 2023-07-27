const QueryMDSCompanyBulkData = require('../queryMDS/queryMDSCompanyBulkData');
const QueryMDSEquityModelSeriesSet = require('../queryMDS/queryMDSEquityModelSeriesSet');
const CompanyBulkData = require('../dataCSV/companyBulkData');
const EquityModelSeriesSet = require('../equityModelSeriesSet/equityModelSeriesSet');
const LeadingDigitCounter = require('../helpers/leadingDigitCounter');
const { calculateLeadingDigitFrequencies } = require('../helpers/leadingDigitFrequency');
const StatementBenford = require('../benfordAnalysis/statementBenford');
const CompanyBenford = require('../benfordAnalysis/companyBenford');
const { fetchAndRetryIfNecessary } = require('../helpers/fetchAndRetryIfNecessary');

class BenfordAnalysis {
  #equityModelSeriesSet;
  #companyBulkDataCSV;

  constructor(token, ticker, tickerType, rateLimiter) {
    this.token = token;
    this.ticker = ticker;
    this.tickerType = tickerType;
    this.rateLimiter = rateLimiter;
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
      console.log(`Fetching equity model series set of ${this.ticker}.`);

      try {
        const res = await fetchAndRetryIfNecessary( () => this.rateLimiter.acquireToken( () => new QueryMDSEquityModelSeriesSet(this.token, {
            bloombergTicker: this.ticker, 
            format: 'json'
          }).getEquityModelSeriesSet())
        );
        this.#equityModelSeriesSet = new EquityModelSeriesSet(res);
      } catch (err) {
        throw err;
      }

      endTime = performance.now();
      console.log(`Finished fetching equity model series set of ${this.ticker}. Total time: ${Math.round(((endTime - startTime)/1000 + Number.EPSILON) * 100)/100} seconds.`);
    }

    statementBenfordObj.setCompanyName(this.#equityModelSeriesSet.getCompanyName());
    statementBenfordObj.setCSIN(this.#equityModelSeriesSet.getCSIN());
    statementBenfordObj.setModelVersion(this.#equityModelSeriesSet.getCurrentModelVersion());

    if (!this.#companyBulkDataCSV) {
      startTime = performance.now();
      console.log(`Fetching bulk data csv of ${this.ticker}.`);

      try {
        this.#companyBulkDataCSV = await fetchAndRetryIfNecessary( () => this.rateLimiter.acquireToken(
            () => new QueryMDSCompanyBulkData(
              this.token, 
              statementBenfordObj.getCSIN(), 
              statementBenfordObj.getModelVersion()
            ).getCompanyBulkDataCSV()
          )
        );
      } catch (err) {
        throw err;
      }

      endTime = performance.now();
      console.log(`Finished fetching bulk data csv of ${this.ticker}. Total time: ${Math.round(((endTime - startTime)/1000 + Number.EPSILON) * 100)/100} seconds.`);
    } 

    const financialStatementData = new CompanyBulkData(this.#companyBulkDataCSV).getFinancialStatementData(financialStatementStr);

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