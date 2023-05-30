// const { JsonStreamStringify } = require('json-stream-stringify');
const fs = require('fs');
const Papa = require('papaparse')


const initConfig = require('./initConfig');
const QueryMDSCompanyList = require('./QueryMDS/QueryMDSCompanyList');
const QueryMDSCompanyBulkData = require('./QueryMDS/QueryMDSCompanyBulkData');
const QueryMDSEquityModelSeriesSet = require('./QueryMDS/QueryMDSEquityModelSeriesSet');
const CompanyList = require('./CompanyList/CompanyList');

const main = async () => {
  new initConfig('./config.env');

  const token = process.env.CANALYST_JWT;

  const companyList = await new QueryMDSCompanyList(token).getCompanyList('csv');

  // const companyBulkData = await new QueryMDSCompanyBulkData(token, '9KL2F10102', 'Q1-2023.21').getCompanyBulkDataCSV();

  const companyId = new CompanyList(companyList).getCompanyIdFromTicker('MA US', 'Bloomberg');

  const equityModelSeriesSet = await new QueryMDSEquityModelSeriesSet(token, companyId).getEquityModelSeriesSet();

  const csin = equityModelSeriesSet.results[0].csin;
  const modelVersion = equityModelSeriesSet.results[0].latest_equity_model.model_version.name;

  console.log(csin, modelVersion);

  // TODO: refactor the above

  // const csvString = JSON.stringify(parseCsv.data)

  // try {
  //   fs.writeFileSync('./data/companyList.json', csvString);
  // } catch (err) {
  //   console.log(err);
  // }
};

main();
