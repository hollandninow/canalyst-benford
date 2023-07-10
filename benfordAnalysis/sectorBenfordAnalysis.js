const BenfordAnalysis = require('./benfordAnalysis');
const SectorBenford = require('./sectorBenford');
const StatementBenford = require('./statementBenford');
const QueryMDSCompanyList = require('../queryMDS/queryMDSCompanyList');
const { calculateLeadingDigitFrequencies } = require('../helpers/leadingDigitFrequency');

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

    const statementBenfordArray = this.#aggregateSectorBenfordData(companyBenfordArray);

    const sectorBenfordObj = new SectorBenford(companyBenfordArray, statementBenfordArray, this.sector);

    return sectorBenfordObj;
  }

  #aggregateSectorBenfordData(companyBenfordArray) {
    const financialStatementStringArray = companyBenfordArray[0].getFinancialStatement();

    const statementBenfordArray = [];

    for(let i = 0; i < financialStatementStringArray.length; i++) {
      const statementBenfordObj = this.#aggregateFinancialStatementDataAcrossSector(companyBenfordArray, financialStatementStringArray[i]);

      statementBenfordArray.push(statementBenfordObj);
    }

    return statementBenfordArray;
  }

  #aggregateFinancialStatementDataAcrossSector(companyBenfordArray, financialStatementString) {
    const statementBenfordObj = new StatementBenford({
      ticker: 'Multiple',
      tickerType: 'Multiple',
      financialStatement: financialStatementString,
    });

    statementBenfordObj.setCSIN('Multiple');
    statementBenfordObj.setModelVersion('Multiple');

    const aggregatedFinancialStatementCountData = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 0,
      total: 0,
    };

    companyBenfordArray.forEach(companyBenford => {
      const statementCountDataObj = companyBenford.getStatementBenford(financialStatementString).getCountData();

      for (const [key, value] of Object.entries(statementCountDataObj)) {
        aggregatedFinancialStatementCountData[key] += value;
      }
    });

    statementBenfordObj.setCountData(aggregatedFinancialStatementCountData);

    statementBenfordObj.setFrequencyData(
      calculateLeadingDigitFrequencies(statementBenfordObj.getCountData(), {rounded: true})
    );

    return statementBenfordObj;
  }
}

module.exports = SectorBenfordAnalysis;