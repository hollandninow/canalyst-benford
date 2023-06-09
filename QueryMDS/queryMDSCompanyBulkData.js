const QueryMDS = require('./queryMDS')

class QueryMDSCompanyBulkData extends QueryMDS {
  constructor(token, csin, modelVersion) {
    super(token);
    this.APIQueryURL = `equity-model-series/${csin}/equity-models/${modelVersion}/bulk-data/historical-data.csv?format=json`
  }

  async getCompanyBulkDataCSV() {
    try {
      const res = await this.instance.get(this.APIQueryURL)
      return res.data;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = QueryMDSCompanyBulkData;