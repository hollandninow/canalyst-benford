const fs = require('fs');
const initConfig = require('./initConfig');
const BenfordAnalysis = require('./benfordAnalysis/benfordAnalysis');
const BenfordVisualizer = require('./benfordVisualizer/benfordVisualizer');

const main = async () => {
  new initConfig('./config.env');

  const companyBenfordObj = await new BenfordAnalysis(process.env.CANALYST_JWT, 'MKTX US', 'Bloomberg').performMultipleAnalyses([
    'Income Statement As Reported',
    'Balance Sheet',
    'Cash Flow Statement',
    'Adjusted Numbers As Reported',
  ]);

  const baseHTML = new BenfordVisualizer().createBaseHTML(companyBenfordObj);
  
  let ticker = companyBenfordObj.getTicker().replace('/', '-');

  fs.writeFileSync(`./outputHTML/${ticker}-bar-chart.html`, baseHTML);

  console.log('Benford Analysis complete.');
};

main();
