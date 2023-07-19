const catchAsync = require('../utils/catchAsync');
const BenfordAnalysis = require('../benfordAnalysis/benfordAnalysis');
const SectorBenfordAnalysis = require('../benfordAnalysis/sectorBenfordAnalysis');
const BenfordVisualizer = require('../benfordVisualizer/benfordVisualizer');
const AppError = require('../utils/appError');
const LimiterLibraryRateLimiter = require('../helpers/limiterLibraryRateLimiter');
const extractToken = require('../utils/extractToken');

// fsString must be of the form "fs1,fs2,fs3" so it can easily be converted into an array
const analyzeCompany = async (token, ticker, tickerType, fsString) => {
  if (!token) 
    throw new AppError('Token not provided', 400);

  if (!ticker)
    throw new AppError('Ticker not provided.', 400);

  if (!tickerType)
    throw new AppError('Ticker type not provided.', 400);

  if (!fsString)
    throw new AppError('Financial statement string not provided.', 400);

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
  console.log(req.query);
  const { ticker, tickerType, fsString } = req.query;

  const token = extractToken(req);
  if (!token) {
    throw new AppError('Canalyst API token invalid or does not exist.', 401);
  }

  let companyBenfordObj;
  try {
    companyBenfordObj = await analyzeCompany(token, ticker, tickerType, fsString);
  } catch (err) {
    throw err;
  }

  const HTMLMarkup = new BenfordVisualizer().createBaseHTML(companyBenfordObj, true);

  res.status(200).json({
    status: 'success',
    data: {
      HTMLMarkup
    }
  });
});