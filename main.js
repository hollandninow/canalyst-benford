const fs = require('fs');

const initConfig = require('./initConfig');
const QueryMDSCompanyList = require('./queryMDS/queryMDSCompanyList');
const QueryMDSCompanyBulkData = require('./queryMDS/queryMDSCompanyBulkData');
const QueryMDSEquityModelSeriesSet = require('./queryMDS/queryMDSEquityModelSeriesSet');
const CompanyList = require('./dataCSV/companyList');
const CompanyBulkData = require('./dataCSV/companyBulkData');
const EquityModelSeriesSet = require('./equityModelSeriesSet/equityModelSeriesSet');

const main = async () => {
  new initConfig('./config.env');

  const token = process.env.CANALYST_JWT;

  const companyListCSV = await new QueryMDSCompanyList(token).getCompanyList('csv');
  
  const companyId = new CompanyList(companyListCSV).getCompanyIdFromTicker('V US', 'Bloomberg');
  
  const equityModelSeriesSet = await new QueryMDSEquityModelSeriesSet(token, companyId).getEquityModelSeriesSet();

  const model = new EquityModelSeriesSet(equityModelSeriesSet);

  const csin = model.getCSIN();
  const modelVersion = model.getCurrentModelVersion();

  const companyBulkDataCSV = await new QueryMDSCompanyBulkData(token, csin, modelVersion).getCompanyBulkDataCSV();

  const companyDataObj = new CompanyBulkData(companyBulkDataCSV)

  const companyData = companyDataObj.getBulkData();

  const companyIncomeStatementData = companyDataObj.getFinancialStatementData('Income Statement As Reported');
  const companyBalanceSheetData = companyDataObj.getFinancialStatementData('Balance Sheet');
  const companyCashFlowStatementData = companyDataObj.getFinancialStatementData('Cash Flow Statement');

  console.log(companyIncomeStatementData);
  console.log(companyBalanceSheetData);
  console.log(companyCashFlowStatementData);
};

main();
