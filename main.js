const initConfig = require('./initConfig');
const BenfordAnalysis = require('./benfordAnalysis/benfordAnalysis');

const main = async () => {
  new initConfig('./config.env');

  const token = process.env.CANALYST_JWT;

  const financialStatements = [
    'Income Statement As Reported',
    'Balance Sheet',
    'Cash Flow Statement',
  ];

  const bAnalysis = new BenfordAnalysis(token, 'AAPL US', 'Bloomberg');

  const benfordData = [];
  for(let i = 0; i < financialStatements.length; i++) {
    const financialStatementStr = financialStatements[i];

    benfordData[i] = await bAnalysis.performAnalysis(financialStatementStr);
  }

  console.log(benfordData);
};

main();
