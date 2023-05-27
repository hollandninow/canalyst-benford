const initConfig = require('./initConfig');
const queryMDSCompanyList = require('./queryMDSCompanyList');

const main = async () => {
  new initConfig('./config.env');

  const token = process.env.CANALYST_JWT;

  const query = await new queryMDSCompanyList(token).getCompanyListCSV();

  console.log(query);
};

main();
