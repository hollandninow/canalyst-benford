class EquityModelSeriesSet {
  constructor(equityModelSeriesSetJSON) {
    this.equityModelSeriesSetData = equityModelSeriesSetJSON.results[0];
  }

  getCSIN() {
    return this.equityModelSeriesSetData.csin;
  }

  getCurrentModelVersion() {
    return this.equityModelSeriesSetData.latest_equity_model.model_version.name;
  }
}

module.exports = EquityModelSeriesSet;