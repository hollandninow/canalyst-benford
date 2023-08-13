const DataCSV = require('./dataCSV');

class CompanyList extends DataCSV {
  constructor(companyListCSV) {
    super(companyListCSV);
  }

  /**
   * Returns company ID from stock ticker
   * @param {string} ticker stock ticker
   * @param {string} tickerType must be CapIQ, FactSet, Thomson, Canalyst, or Bloomberg
   * @returns {string} first 6 digits of CSIN corresponding to the ticker fed as parameter
   */
  getCompanyIdFromTicker(ticker, tickerType) {
    return this.data.filter(data => data[tickerType] === ticker)[0].company_id;
  }

  getAllTickers() {
    const tickers = this.data.map(company => {
      const coveredTicker = company.is_in_coverage === 'true' ? company.Bloomberg : null;

      return coveredTicker;
    });

    const cleanTickers = tickers.filter( ticker => ticker != null);

    return cleanTickers;
  }
}

module.exports = CompanyList;