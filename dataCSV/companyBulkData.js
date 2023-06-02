const DataCSV = require('./dataCSV');

class CompanyBulkData extends DataCSV {
  constructor(companyBulkDataCSV) {
    super(companyBulkDataCSV);
  }

  getBulkData() {
    return this.data;
  }

  /**
   * 
   * @param {string} financialStatementStr 'Balance Sheet', 'Income Statement' or 'Cash Flow Statement'
   * @returns {array} array of integers
   */
  getFinancialStatementData( financialStatementStr ) {
    const financialStatementArr = [];
    
    this.data.forEach(data => {
      if( data.category === financialStatementStr ) {
        if (data.value !== '' && data.value !== '0') {
          financialStatementArr.push(+data.value);
        }
      }
    });

    return financialStatementArr;
  }
}

module.exports = CompanyBulkData;