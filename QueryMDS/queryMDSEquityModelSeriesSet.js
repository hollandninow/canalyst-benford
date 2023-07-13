const QueryMDS = require('./queryMDS')

class QueryMDSEquityModelSeriesSet extends QueryMDS {
  constructor(token, options) {
    super(token);
    options = options || {};
    const { format, bloombergTicker, companyId } = options;

    const formattedTicker = bloombergTicker ? bloombergTicker.replace(' ', '%20') : undefined;

    if (formattedTicker)
      this.APIQueryURL = `equity-model-series/?company_ticker_bloomberg=${formattedTicker}&format=${format}`

    if (companyId)
      this.APIQueryURL = `equity-model-series/?company_id=${companyId}&format=${format}`
}

  async getEquityModelSeriesSet() {
    try {
      const res = await this.instance.get(this.APIQueryURL)
      return res.data;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = QueryMDSEquityModelSeriesSet;