const initConfig = require('../initConfig');
const QueryMDSCompanyBulkData = require('../queryMDS/queryMDSCompanyBulkData');

new initConfig('./config.env');
const token = process.env.CANALYST_JWT;
const csin ='6F1SOG0131';
const modelVersion = 'Q1-2023.22';

describe('QueryMDSCompanyBulkData', () => {

  it('should create an API query URL', () => {
    const query = new QueryMDSCompanyBulkData(token, csin, modelVersion);

    expect(query.APIQueryURL).toBe(`equity-model-series/${csin}/equity-models/${modelVersion}/bulk-data/historical-data.csv?format=json`);
    expect(query.instance).toBeDefined();
  });

  it('should retrieve a file that is defined', async () => {
    const query = new QueryMDSCompanyBulkData(token, csin, modelVersion);
    const dataCSV = await query.getCompanyBulkDataCSV();
    
    expect(dataCSV).toBeDefined();
  });

});