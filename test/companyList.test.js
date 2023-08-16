const CompanyList = require('../dataCSV/companyList');
const QueryMDSCompanyList = require('../queryMDS/queryMDSCompanyList');
const initConfig = require('../initConfig');

new initConfig('./config.env');
const token = process.env.CANALYST_JWT;

describe('CompanyList', () => {
  let companyList;

  it('should be defined and of type array', async () => {
    const csv = await new QueryMDSCompanyList(token).getCompanyList({format: 'csv'});

    companyList = new CompanyList(csv);

    expect(companyList.data).toBeDefined();
    expect(Array.isArray(companyList.data)).toBe(true);
  });

  it('should return an array of all tickers', () => {
    const tickers = companyList.getAllTickers();

    expect(tickers).toBeDefined();
    expect(Array.isArray(companyList.data)).toBe(true);
    expect(tickers.length).not.toBeLessThan(0);
  });

  it('should return the correct company ID', () => {
    const aaplID = 'Y8S4N8';
    const aapl1 = companyList.getCompanyIdFromTicker('NASDAQ:AAPL', 'CapIQ');
    const aapl2 = companyList.getCompanyIdFromTicker('AAPL-US', 'FactSet');
    const aapl3 = companyList.getCompanyIdFromTicker('AAPL.OQ', 'Thomson');
    const aapl4 = companyList.getCompanyIdFromTicker('AAPL_US', 'Canalyst');
    const aapl5 = companyList.getCompanyIdFromTicker('AAPL US', 'Bloomberg');

    expect(aapl1).toBe(aaplID);
    expect(aapl2).toBe(aaplID);
    expect(aapl3).toBe(aaplID);
    expect(aapl4).toBe(aaplID);
    expect(aapl5).toBe(aaplID);
  });
});