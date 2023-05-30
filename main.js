const initConfig = require('./initConfig');
const queryMDSCompanyList = require('./QueryMDS/queryMDSCompanyList');
const queryMDSCompanyBulkData = require('./QueryMDS/queryMDSCompanyBulkData')

const main = async () => {
  new initConfig('./config.env');

  const token = process.env.CANALYST_JWT;

  const companyList = await new queryMDSCompanyList(token).getCompanyList();

  const companyBulkData = await new queryMDSCompanyBulkData(token, '9KL2F10102', 'Q1-2023.21').getCompanyBulkDataCSV();
};

main();
