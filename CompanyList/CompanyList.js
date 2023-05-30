const Papa = require('papaparse');

class CompanyList {
  constructor(companyListCSV) {
    this.companyListData = Papa.parse(companyListCSV, {header:true}).data;
  }

  /**
   * Returns company ID from stock ticker
   * @param {string} ticker stock ticker
   * @param {string} tickerType must be CapIQ, FactSet, Thomson, Canalyst, or Bloomberg
   * @returns {string} first 6 digits of CSIN corresponding to the ticker fed as parameter
   */
  getCompanyIdFromTicker(ticker, tickerType) {
    return this.companyListData.filter(data=> data[tickerType] === ticker)[0].company_id;
  }
}

module.exports = CompanyList;