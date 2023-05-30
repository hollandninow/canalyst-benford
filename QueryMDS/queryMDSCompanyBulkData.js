const queryMDS = require('./queryMDS')

class queryMDSCompanyBulkData extends queryMDS {
  constructor(token, csin, modelVersion) {
    super(token);
    this.APIQueryURL = `equity-model-series/${csin}/equity-models/${modelVersion}/bulk-data/historical-data.csv?format=json`
  }

  async getCompanyBulkDataCSV() {
    try {
      const res = await this.instance.get(this.APIQueryURL)
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = queryMDSCompanyBulkData;