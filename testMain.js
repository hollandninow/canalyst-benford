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
  const sectorBAnalysis = new SectorBenfordAnalysis(token, 'financial exchanges data');

  const sectorBenfordObj = await sectorBAnalysis.performSectorAnalysis([
    'Income Statement As Reported',
    'Balance Sheet',
    'Cash Flow Statement',
    'Adjusted Numbers As Reported',
  ]);

  let addCompanyTotals = 0;
  let addSectorTotals = 0;

  sectorBenfordObj.getCompanyBenfordArray().forEach(companyBenford => {
    console.log('CompanyBenford Object:');
    console.log(companyBenford.getTicker());
    console.log(companyBenford.getCSIN());
    console.log(companyBenford.getModelVersion());
    console.log(companyBenford.getFinancialStatement());

    companyBenford.getStatementBenfordArray().forEach(statementBenford => {
      addCompanyTotals += statementBenford.getCountData().total;
    })
  });
  

  console.log('SectorBenford Object:');
  console.log(sectorBenfordObj.getSector());
  console.log(sectorBenfordObj.getFinancialStatement());
  const sectorStatementBenfordArray = sectorBenfordObj.getStatementBenfordArray();

  sectorStatementBenfordArray.forEach( statementBenford => {
      console.log(statementBenford.getFinancialStatement(),':');
      console.log(statementBenford.getCountData());
      console.log(statementBenford.getFrequencyData());
      addSectorTotals += statementBenford.getCountData().total;
    }
  );
  
  console.log(`Check ${addSectorTotals} is equal to ${addCompanyTotals}?`);


  console.log('Complete.');
};

main();
