// const { JsonStreamStringify } = require('json-stream-stringify');
const fs = require('fs');
const Papa = require('papaparse')


const initConfig = require('./initConfig');
const queryMDSCompanyList = require('./queryMDS/queryMDSCompanyList');
const queryMDSCompanyBulkData = require('./queryMDS/queryMDSCompanyBulkData');
const queryMDSEquityModelSeriesSet = require('./queryMDS/queryMDSEquityModelSeriesSet');

const main = async () => {
  new initConfig('./config.env');

  const token = process.env.CANALYST_JWT;

  const companyList = await new queryMDSCompanyList(token).getCompanyList('csv');

  // const companyBulkData = await new queryMDSCompanyBulkData(token, '9KL2F10102', 'Q1-2023.21').getCompanyBulkDataCSV();

  const csvData = Papa.parse(companyList, {header:true}).data;

  const companyId = csvData.filter(data => data.Bloomberg === 'CACC US')[0].company_id

  const equityModelSeriesSet = await new queryMDSEquityModelSeriesSet(token, companyId).getEquityModelSeriesSet();

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
