const initConfig = require('./initConfig');
const QueryMDSCompanyList = require('./queryMDS/queryMDSCompanyList');
const QueryMDSCompanyBulkData = require('./queryMDS/queryMDSCompanyBulkData');
const QueryMDSEquityModelSeriesSet = require('./queryMDS/queryMDSEquityModelSeriesSet');
const CompanyList = require('./dataCSV/companyList');
const CompanyBulkData = require('./dataCSV/companyBulkData');
const EquityModelSeriesSet = require('./equityModelSeriesSet/equityModelSeriesSet');
const LeadingDigitCounter = require('./helpers/leadingDigitCounter');
const { calculateLeadingDigitFrequencies } = require('./helpers/leadingDigitFrequency');

const main = async () => {
  new initConfig('./config.env');

  const token = process.env.CANALYST_JWT;

  const companyListCSV = await new QueryMDSCompanyList(token).getCompanyList('csv');
  
  const companyId = new CompanyList(companyListCSV).getCompanyIdFromTicker('TBRD CN', 'Bloomberg');
  
  const equityModelSeriesSet = await new QueryMDSEquityModelSeriesSet(token, companyId).getEquityModelSeriesSet();

  const model = new EquityModelSeriesSet(equityModelSeriesSet);

  const csin = model.getCSIN();
  const modelVersion = model.getCurrentModelVersion();

  const companyBulkDataCSV = await new QueryMDSCompanyBulkData(token, csin, modelVersion).getCompanyBulkDataCSV();

  const companyDataObj = new CompanyBulkData(companyBulkDataCSV)

  const companyIncomeStatementData = companyDataObj.getFinancialStatementData('Income Statement As Reported');
  const companyBalanceSheetData = companyDataObj.getFinancialStatementData('Balance Sheet');
  const companyCashFlowStatementData = companyDataObj.getFinancialStatementData('Cash Flow Statement');

  const digitCounter = new LeadingDigitCounter(); 
  const incomeStatementDigits = digitCounter.countLeadingDigits(companyIncomeStatementData);
  const balanceSheetDigits = digitCounter.countLeadingDigits(companyBalanceSheetData);
  const cashFlowStatementDigits = digitCounter.countLeadingDigits(companyCashFlowStatementData);

  console.log('IS:', incomeStatementDigits, calculateLeadingDigitFrequencies(incomeStatementDigits));
  console.log('BS:', balanceSheetDigits, calculateLeadingDigitFrequencies(balanceSheetDigits));
  console.log('CFS:', cashFlowStatementDigits, calculateLeadingDigitFrequencies(cashFlowStatementDigits));
};

main();
