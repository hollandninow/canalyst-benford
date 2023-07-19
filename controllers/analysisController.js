const catchAsync = require('../utils/catchAsync');
const BenfordAnalysis = require('../benfordAnalysis/benfordAnalysis');
const SectorBenfordAnalysis = require('../benfordAnalysis/sectorBenfordAnalysis');
const AppError = require('../utils/appError');
const LimiterLibraryRateLimiter = require('../helpers/limiterLibraryRateLimiter');

// fsString must be of the form "fs1,fs2,fs3" so it can easily be converted into an array
const analyzeCompany = async (token, ticker, tickerType, fsString) => {
  if (!(token && ticker && tickerType && fsString))
    throw new AppError('Incorrect analysis parameters', 400)

  const fsStringArray = fsString.split(',');

  const rateLimiter = new LimiterLibraryRateLimiter({
    maxRequests: process.env.CANALYST_MAX_REQUESTS,
    maxRequestWindowMS: process.env.CANALYST_MAX_REQUEST_WINDOW_MS,
  });

  let companyBenfordObj;
  try {
    companyBenfordObj = await new BenfordAnalysis(token, ticker, tickerType, rateLimiter).performMultipleAnalyses(fsStringArray);
  } catch (err) {
    throw err;
  }
  
  return companyBenfordObj;
}

exports.getCompanyAnalysis = catchAsync(async (req, res, next) => {
  const { token, ticker, tickerType, fsString } = req.body;

  let companyBenfordObj;
  try {
    companyBenfordObj = await analyzeCompany(token, ticker, tickerType, fsString);
  } catch (err) {
    throw err;
  }

  res.status(200).json({
    status: 'success',
    data: {
      // TODO: change returned data to HTML markup
      companyBenfordObj
    }
  });
});