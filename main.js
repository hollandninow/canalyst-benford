const fs = require('fs');
const initConfig = require('./initConfig');
const BenfordAnalysis = require('./benfordAnalysis/benfordAnalysis');
const BenfordVisualizer = require('./benfordVisualizer/benfordVisualizer');

const main = async () => {
  new initConfig('./config.env');

  const token = process.env.CANALYST_JWT;

  const benfordData = await new BenfordAnalysis(token, 'BRK/A US', 'Bloomberg').performMultipleAnalyses([
    'Income Statement As Reported',
    'Balance Sheet',
    'Cash Flow Statement',
    'Adjusted Numbers As Reported',
  ]);

  const bVisualizer = new BenfordVisualizer();

  const chartCodeArr = bVisualizer.bundleChartCode(benfordData);

  let ticker = benfordData[0].ticker;
  const baseHTML = bVisualizer.createBaseHTML(chartCodeArr, ticker);

  ticker = ticker.replace('/', '-');

  fs.writeFileSync(`./outputHTML/${ticker}-bar-chart.html`, baseHTML);

  console.log('Benford Analysis complete.');
};

main();
