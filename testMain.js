const fs = require('fs');
const initConfig = require('./initConfig');
const QueryMDSCompanyList = require('./queryMDS/queryMDSCompanyList');
const SectorBenfordAnalysis = require('./benfordAnalysis/sectorBenfordAnalysis');
const StatementBenford = require('./benfordAnalysis/statementBenford');
// const BenfordAnalysis = require('./benfordAnalysis/benfordAnalysis');
// const BenfordVisualizer = require('./benfordVisualizer/benfordVisualizer');

const main = async () => {
  new initConfig('./config.env');

  const token = process.env.CANALYST_JWT;

  // Test Sector Analysis
  const sectorBAnalysis = new SectorBenfordAnalysis(token, 'reinsurance');

  const sectorBenfordObj = await sectorBAnalysis.performSectorAnalysis([
    'Income Statement As Reported',
    'Balance Sheet',
    'Cash Flow Statement',
    'Adjusted Numbers As Reported',
  ]);

  sectorBenfordObj.getCompanyBenfordArray().forEach(companyBenford => {
    console.log('CompanyBenford Object:');
    console.log(companyBenford.getTicker());
    console.log(companyBenford.getCSIN());
    console.log(companyBenford.getModelVersion());
    console.log(companyBenford.getFinancialStatement());
  });

  console.log('SectorBenford Object:');
  console.log(sectorBenfordObj.getSector());
  console.log(sectorBenfordObj.getFinancialStatement());
  console.log(sectorBenfordObj.getSectorCountData());
  console.log(sectorBenfordObj.getSectorFrequencyData());

  console.log('Complete.');
};

main();
