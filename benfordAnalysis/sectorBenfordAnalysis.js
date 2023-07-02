const BenfordAnalysis = require('./benfordAnalysis');
const SectorBenford = require('./sectorBenford');
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

    const companyBenfordArray = [];

    for( let i = 0; i < sectorCoverageListArray.length; i++ ) {
      const bAnalysis = new BenfordAnalysis(this.token, sectorCoverageListArray[i].tickers.Bloomberg, 'Bloomberg');

      const companyBenfordObj = await bAnalysis.performMultipleAnalyses(fsStringArray);

      companyBenfordArray.push(companyBenfordObj);
    }

    const sectorBenfordObj = new SectorBenford(companyBenfordArray, this.sector);

    return sectorBenfordObj;
  }

  aggregateSectorBenfordData(companyBenfordArray) {
    const statementArray = companyBenfordArray[0].getFinancialStatement();

    for( let i = 0; i < companyBenfordArray; i++) {

    }
    
  }
}

module.exports = SectorBenfordAnalysis;