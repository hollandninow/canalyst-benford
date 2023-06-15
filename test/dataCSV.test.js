const DataCSV = require('../dataCSV/dataCSV');
const QueryMDSCompanyList = require('../queryMDS/queryMDSCompanyList');
const initConfig = require('../initConfig');

new initConfig('./config.env');
const token = process.env.CANALYST_JWT;

describe('DataCSV', () => {

  it('data should be defined and of type array', async () => {
    const csv = await new QueryMDSCompanyList(token).getCompanyList('csv');

    const csvObj = new DataCSV(csv);

    expect(csvObj.data).toBeDefined();
    expect(Array.isArray(csvObj.data)).toBe(true);
  });

});