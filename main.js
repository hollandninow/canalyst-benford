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
  ];

  const bAnalysis = new BenfordAnalysis(token, 'GOOGL US', 'Bloomberg');

  const benfordData = [];
  for(let i = 0; i < financialStatements.length; i++) {
    const financialStatementStr = financialStatements[i];

    benfordData[i] = await bAnalysis.performAnalysis(financialStatementStr);
  }

  console.log(benfordData);

  const bVisualizer = new BenfordVisualizer();

  const chartCodeArr = [];

  benfordData.forEach((dataObj, i) => {
    chartCodeArr.push(bVisualizer.createChartCode(dataObj, i));
  });

  const baseHTML = bVisualizer.createBaseHTML(chartCodeArr, benfordData[0].ticker);

  fs.writeFileSync(`./outputHTML/charts-${benfordData[0].ticker}.html`, baseHTML);
};

main();
