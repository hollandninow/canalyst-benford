const QueryMDS = require('../queryMDS/queryMDS');
const initConfig = require('../initConfig');

new initConfig('./config.env');
const token = process.env.CANALYST_JWT;

describe('QueryMDS', () => {

  it('should create query object with defined properties', () => {
    const query = new QueryMDS(token);

    expect(query.APIRootURL).toBe('https://mds.canalyst.com/api/');
    expect(query.instance).toBeDefined();
  });

});