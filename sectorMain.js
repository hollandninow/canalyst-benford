const fs = require('fs');
const initConfig = require('./initConfig');
const SectorBenfordAnalysis = require('./benfordAnalysis/sectorBenfordAnalysis');
const BenfordVisualizer = require('./benfordVisualizer/benfordVisualizer');

const main = async () => {
  new initConfig('./config.env');

  const token = process.env.CANALYST_JWT;

  // Test Sector Analysis
  // const sector = 'specialized finance';
  // const sector = 'trucking';
  // const sector = 'airlines';
  const sector = 'regional banks';

  const sectorFolderName = sector.replaceAll(' ','-');

  const sectorDir = `./outputHTML/sector-analysis/${sectorFolderName}`;
  const sectorCompaniesDir = `${sectorDir}/companies`

  if(!fs.existsSync(sectorDir)) 
    fs.mkdirSync(sectorDir, {recursive: true});

  if(!fs.existsSync(sectorCompaniesDir)) 
    fs.mkdirSync(sectorCompaniesDir, {recursive: true});

  let startTime = performance.now();
  const sectorBAnalysis = new SectorBenfordAnalysis(token, sector);

  const sectorBenfordObj = await sectorBAnalysis.performFastSectorAnalysis([
    'Income Statement As Reported',
    'Balance Sheet',
    'Cash Flow Statement',
    'Adjusted Numbers As Reported',
  ]);
  let endTime = performance.now();
  console.log(`Finished analysis of ${sector}. Total time: ${Math.round(((endTime - startTime)/1000 + Number.EPSILON) * 100)/100} seconds.`);

  const baseHTML = new BenfordVisualizer().createBaseHTML(sectorBenfordObj);

  fs.writeFileSync(`${sectorDir}/${sectorFolderName}-bar-chart.html`, baseHTML);

  const sectorCompanyBenfordArray = sectorBenfordObj.getCompanyBenfordArray();

  sectorCompanyBenfordArray.forEach( companyBenford => {
    const companyBaseHTML = new BenfordVisualizer().createBaseHTML(companyBenford);

    const ticker = companyBenford.getTicker().replace('/', '-');

    fs.writeFileSync(`./outputHTML/sector-analysis/${sectorFolderName}/companies/${ticker}-bar-chart.html`, companyBaseHTML);
  });


  // let addCompanyTotals = 0;
  // let addSectorTotals = 0;

  // sectorBenfordObj.getCompanyBenfordArray().forEach(companyBenford => {
  //   console.log('CompanyBenford Object:');
  //   console.log(companyBenford.getTicker());
  //   console.log(companyBenford.getCSIN());
  //   console.log(companyBenford.getModelVersion());
  //   console.log(companyBenford.getFinancialStatement());

  //   companyBenford.getStatementBenfordArray().forEach(statementBenford => {
  //     addCompanyTotals += statementBenford.getCountData().total;
  //   })
  // });
  

  // console.log('SectorBenford Object:');
  // console.log(sectorBenfordObj.getSector());
  // console.log(sectorBenfordObj.getFinancialStatement());
  // const sectorStatementBenfordArray = sectorBenfordObj.getStatementBenfordArray();

  // sectorStatementBenfordArray.forEach( statementBenford => {
  //     console.log(statementBenford.getFinancialStatement(),':');
  //     console.log(statementBenford.getCountData());
  //     console.log(statementBenford.getFrequencyData());
  //     addSectorTotals += statementBenford.getCountData().total;
  //   }
  // );
  
  // console.log(`Check ${addSectorTotals} is equal to ${addCompanyTotals}?`);

  console.log('Sector Benford Analysis complete.');
};

main();
