const fs = require('fs');
const initConfig = require('./initConfig');
const BenfordAnalysis = require('./benfordAnalysis/benfordAnalysis');
const BenfordVisualizer = require('./benfordVisualizer/benfordVisualizer');
const LimiterLibraryRateLimiter = require('./helpers/limiterLibraryRateLimiter');

const main = async () => {
  new initConfig('./config.env');

  const rateLimiter = new LimiterLibraryRateLimiter({
    maxRequests: process.env.CANALYST_MAX_REQUESTS,
    maxRequestWindowMS: process.env.CANALYST_MAX_REQUEST_WINDOW_MS,
  });

  const companyBenfordObj = await new BenfordAnalysis(process.env.CANALYST_JWT, 'RNR US', 'Bloomberg', rateLimiter).performMultipleAnalyses([
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
