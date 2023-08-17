const CompanyBulkData = require('../dataCSV/companyBulkData');
const QueryMDSCompanyBulkData = require('../queryMDS/queryMDSCompanyBulkData');
const initConfig = require('../initConfig');

new initConfig('./config.env');
const token = process.env.CANALYST_JWT;
const csin ='6F1SOG0131';
const modelVersion = 'Q1-2023.22';

describe('CompanyBulkData', () => {
  let companyBulkDataCSV;

  it('should be defined and this.data is of type array', async () => {
    const query = new QueryMDSCompanyBulkData(token, csin, modelVersion);
    try {
      const dataCSV = await query.getCompanyBulkDataCSV();
      companyBulkDataCSV = new CompanyBulkData(dataCSV);
    } catch (err) {
      throw err;
    }
    
    expect(companyBulkDataCSV.data).toBeDefined();
    expect(Array.isArray(companyBulkDataCSV.data)).toBe(true);
    expect(companyBulkDataCSV.data.length).toBeGreaterThan(0);
  });
  
  it('should return data, which is of type array and defined', () => {
    const data = companyBulkDataCSV.getBulkData();

    expect(data).toBeDefined();
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);
  });

  it('should return income statement statement data in an array', () => {
    const data = companyBulkDataCSV.getFinancialStatementData('Income Statement As Reported');

    expect(data).toBeDefined();
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);
  });
});