const initConfig = require('../initConfig');
const QueryMDSCompanyList = require('../queryMDS/queryMDSCompanyList');

new initConfig('./config.env');
const token = process.env.CANALYST_JWT;

describe('QueryMDSCompanyList', () => {

  it('should create an API query URL', () => {
    const query = new QueryMDSCompanyList(token);

    expect(query.APIQueryURL).toBe('companies/?format=');
    expect(query.instance).toBeDefined();
  });

  it('should retrieve a file that is defined', async () => {

    const query = new QueryMDSCompanyList(token);
    const data = await query.getCompanyList('csv');

    expect(data).toBeDefined();
  });

});