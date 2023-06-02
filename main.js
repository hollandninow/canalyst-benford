const fs = require('fs');

const initConfig = require('./initConfig');
const QueryMDSCompanyList = require('./queryMDS/queryMDSCompanyList');
const QueryMDSCompanyBulkData = require('./queryMDS/queryMDSCompanyBulkData');
const QueryMDSEquityModelSeriesSet = require('./queryMDS/queryMDSEquityModelSeriesSet');
const CompanyList = require('./dataCSV/companyList');
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

  const companyBulkData = await new QueryMDSCompanyBulkData(token, csin, modelVersion).getCompanyBulkDataCSV();

  try {
    fs.writeFileSync('./data/bulkData.csv', companyBulkData);
    console.log('file saved');
  } catch (err) {
    console.log(err);
  }
};

main();
