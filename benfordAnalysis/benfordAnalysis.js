const QueryMDSCompanyList = require('../queryMDS/queryMDSCompanyList');
const QueryMDSCompanyBulkData = require('../queryMDS/queryMDSCompanyBulkData');
const QueryMDSEquityModelSeriesSet = require('../queryMDS/queryMDSEquityModelSeriesSet');
const CompanyList = require('../dataCSV/companyList');
const CompanyBulkData = require('../dataCSV/companyBulkData');
const EquityModelSeriesSet = require('../equityModelSeriesSet/equityModelSeriesSet');
const LeadingDigitCounter = require('../helpers/leadingDigitCounter');
const { calculateLeadingDigitFrequencies } = require('../helpers/leadingDigitFrequency');

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
    const benfordObj = {
      ticker: this.ticker,
      tickerType: this.tickerType,
      financialStatement: financialStatementStr,
    };
    
    const equityModelSeriesSet = await new QueryMDSEquityModelSeriesSet(this.token, {bloombergTicker: this.ticker, format: 'json'}).getEquityModelSeriesSet();

    const model = new EquityModelSeriesSet(equityModelSeriesSet);

    benfordObj.csin = model.getCSIN();
    benfordObj.modelVersion = model.getCurrentModelVersion();

    const companyBulkDataCSV = await new QueryMDSCompanyBulkData(this.token, benfordObj.csin, benfordObj.modelVersion).getCompanyBulkDataCSV();

    const financialStatementData = new CompanyBulkData(companyBulkDataCSV).getFinancialStatementData(financialStatementStr);
 
    benfordObj.data = new LeadingDigitCounter().countLeadingDigits(financialStatementData);

    benfordObj.frequencyData = calculateLeadingDigitFrequencies(benfordObj.data, {rounded: true});

    return benfordObj;
  }
}

module.exports = BenfordAnalysis;