const fs = require('fs');
const initConfig = require('./initConfig');
const QueryMDSCompanyList = require('./queryMDS/queryMDSCompanyList');
const SectorBenfordAnalysis = require('./benfordAnalysis/sectorBenfordAnalysis');
// const BenfordAnalysis = require('./benfordAnalysis/benfordAnalysis');
// const BenfordVisualizer = require('./benfordVisualizer/benfordVisualizer');

const main = async () => {
  new initConfig('./config.env');

  const token = process.env.CANALYST_JWT;

  const query = new QueryMDSCompanyList(token);

  // const sectorList = await query.getCompanyList({
  //   format: 'json',
  //   pageSize: 500,
  //   sector: 'regional banks',
  // });

  // const sectorListArray = sectorList.results;
  // const sectorListArrayCoverage = sectorListArray.filter( model => model.is_in_coverage === true);

  // console.log(sectorListArrayCoverage);
  // console.log(sectorListArrayCoverage.length);

  const sectorBAnalysis = new SectorBenfordAnalysis(token, 'reinsurance');

  const data = await sectorBAnalysis.performSectorAnalysis([
    'Income Statement As Reported',
    'Balance Sheet',
    'Cash Flow Statement',
    'Adjusted Numbers As Reported',
  ]);

  console.log(data);

  console.log('Complete.');
};

main();
