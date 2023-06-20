const BenfordAnalysis = require('./benfordAnalysis');
const QueryMDSCompanyList = require('../queryMDS/queryMDSCompanyList');

class SectorBenfordAnalysis {
  constructor(token, sector) {
    this.token = token;
    this.sector = sector;
    this.query = new QueryMDSCompanyList(this.token);
  }

  async performSectorAnalysis(fsStringArray) {
    let sectorListArray;
    try {
      sectorListArray = await this.query.getCompanyList({
        format: 'json',
        pageSize: '500',
        sector: this.sector,
      });
    } catch (err) {
      console.error(`${err.code}: ${err.message}`);
    }

    const sectorCoverageListArray = sectorListArray.results.filter( model => model.is_in_coverage === true);

    const sectorData = [];

    for( let i = 0; i < sectorCoverageListArray.length; i++ ) {
      const bAnalysis = new BenfordAnalysis(this.token, sectorCoverageListArray[i].tickers.Bloomberg, 'Bloomberg');

      const bData = await bAnalysis.performMultipleAnalyses(fsStringArray);

      sectorData.push(bData);
    }

    return sectorData;
  }
}

module.exports = SectorBenfordAnalysis;