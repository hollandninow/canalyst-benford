const queryMDS = require('./queryMDS')

class queryMDSEquityModelSeriesSet extends queryMDS {
  constructor(token, companyId) {
    super(token);
    this.APIQueryURL = `equity-model-series/?company_id=${companyId}&format=`
}

  async getEquityModelSeriesSet(fileFormatStr = 'json') {
    try {
      const res = await this.instance.get(this.APIQueryURL + fileFormatStr)
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = queryMDSEquityModelSeriesSet;