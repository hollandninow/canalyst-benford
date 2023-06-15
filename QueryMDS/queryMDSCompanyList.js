const QueryMDS = require('./queryMDS')

class QueryMDSCompanyList extends QueryMDS {
  constructor(token) {
    super(token);
    this.APIQueryURL = 'companies/?format='
}

  async getCompanyList(options) {
    options = options || {};

    try {
      const res = await this.instance.get(this.APIQueryURL + options.format)
      return res.data;
    } catch (err) {
      console.error(`${err.code}: ${err.message}`);
    }
  }
}

module.exports = QueryMDSCompanyList;