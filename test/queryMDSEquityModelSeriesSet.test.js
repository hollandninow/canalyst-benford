const initConfig = require('../initConfig');
const QueryMDSEquityModelSeriesSet = require('../queryMDS/queryMDSEquityModelSeriesSet');

new initConfig('./config.env');
const token = process.env.CANALYST_JWT;
const testOptions = {companyId: 'JRV2YW', format: 'json'}

describe('QueryMDSEquityModelSeriesSet', () => {

  it('should create an API query URL', () => {
    const query = new QueryMDSEquityModelSeriesSet(token, testOptions);

    expect(query.APIQueryURL).toBe(`equity-model-series/?company_id=${testOptions.companyId}&format=${testOptions.format}`);
    expect(query.instance).toBeDefined();
  });

  it('should retrieve a file that is defined', async () => {
    const query = new QueryMDSEquityModelSeriesSet(token, testOptions);
    const dataJSON = await query.getEquityModelSeriesSet();

    expect(dataJSON).toBeDefined();
  });

});