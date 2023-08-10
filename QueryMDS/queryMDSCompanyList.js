const QueryMDS = require('./queryMDS')

class QueryMDSCompanyList extends QueryMDS {
  constructor(token) {
    super(token);
    this.APIQueryURL = 'companies/'
}

  /**
   * 
   * @param {*} options format = 'csv' or 'json', pageSize = 0 to 500, sector
   * @returns 
   */
  async getCompanyList(options) {
    options = options || {};

    const {format, pageSize, sector} = options;

    const formattedSector = sector === undefined ? '' : sector.replace(' ', '%20');

    const queryString = `${this.APIQueryURL}?${format ? `format=${format}` : ''}&${pageSize ? `page_size=${pageSize}` : ''}&${sector ? `sector=${formattedSector}` : ''}`;

     try {
      const res = await this.instance.get(queryString);
      return res.data;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = QueryMDSCompanyList;