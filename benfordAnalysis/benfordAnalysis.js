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

  async performAnalysis(financialStatementStr) {
    const benfordObj = {
      ticker: this.ticker,
      tickerType: this.tickerType,
      financialStatement: financialStatementStr,
    };

    const companyListCSV = await new QueryMDSCompanyList(this.token).getCompanyList('csv');
  
    const companyId = new CompanyList(companyListCSV).getCompanyIdFromTicker(this.ticker, this.tickerType);
    
    const equityModelSeriesSet = await new QueryMDSEquityModelSeriesSet(this.token, companyId).getEquityModelSeriesSet();

    const model = new EquityModelSeriesSet(equityModelSeriesSet);

    benfordObj.csin = model.getCSIN();
    benfordObj.modelVersion = model.getCurrentModelVersion();

    const companyBulkDataCSV = await new QueryMDSCompanyBulkData(this.token, benfordObj.csin, benfordObj.modelVersion).getCompanyBulkDataCSV();

    const companyDataObj = new CompanyBulkData(companyBulkDataCSV)

    const financialStatementData = companyDataObj.getFinancialStatementData(financialStatementStr);

    const digitCounter = new LeadingDigitCounter(); 
    benfordObj.data = digitCounter.countLeadingDigits(financialStatementData);

    benfordObj.frequencyData = calculateLeadingDigitFrequencies(benfordObj.data, {rounded: true});

    return benfordObj;
  }
}

module.exports = BenfordAnalysis;