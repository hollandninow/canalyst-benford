const fs = require('fs');
const initConfig = require('./initConfig');
const QueryMDSCompanyList = require('./queryMDS/queryMDSCompanyList');
// const BenfordAnalysis = require('./benfordAnalysis/benfordAnalysis');
// const BenfordVisualizer = require('./benfordVisualizer/benfordVisualizer');

const main = async () => {
  new initConfig('./config.env');

  const token = process.env.CANALYST_JWT;

  const query = new QueryMDSCompanyList(token);

  const financialsList = await query.getCompanyList({
    format: 'json',
    pageSize: 500,
    sector: 'financial exchanges data',
  });

  console.log(financialsList);

  console.log('Complete.');
};

main();
