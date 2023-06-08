const fs = require('fs');

const initConfig = require('./initConfig');
const BenfordAnalysis = require('./benfordAnalysis/benfordAnalysis');
const BenfordVisualizer = require('./benfordVisualizer/benfordVisualizer');

const main = async () => {
  new initConfig('./config.env');

  const token = process.env.CANALYST_JWT;

  const financialStatements = [
    'Income Statement As Reported',
    'Balance Sheet',
    'Cash Flow Statement',
    'Adjusted Numbers As Reported',
  ];

  const bAnalysis = new BenfordAnalysis(token, 'IDT US', 'Bloomberg');

  const benfordData = [];
  for(let i = 0; i < financialStatements.length; i++) {
    const financialStatementStr = financialStatements[i];

    benfordData[i] = await bAnalysis.performAnalysis(financialStatementStr);
  }

  const bVisualizer = new BenfordVisualizer();

  const chartCodeArr = bVisualizer.bundleChartCode(benfordData);

  const baseHTML = bVisualizer.createBaseHTML(chartCodeArr, benfordData[0].ticker);

  fs.writeFileSync(`./outputHTML/${benfordData[0].ticker}-bar-chart.html`, baseHTML);

  console.log('Benford Analysis complete.');
};

main();
