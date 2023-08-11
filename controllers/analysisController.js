const catchAsync = require('../utils/catchAsync');
const BenfordAnalysis = require('../benfordAnalysis/benfordAnalysis');
const SectorBenfordAnalysis = require('../benfordAnalysis/sectorBenfordAnalysis');
const BenfordVisualizer = require('../benfordVisualizer/benfordVisualizer');
const AppError = require('../utils/appError');
const LimiterLibraryRateLimiter = require('../helpers/limiterLibraryRateLimiter');

// fsString must be of the form "fs1,fs2,fs3" so it can easily be converted into an array
const analyzeCompany = async (token, ticker, tickerType, fsString) => {
  if (!token) 
    throw new AppError('API token not provided', 400);

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
  const { ticker, tickerType, fsString, token } = req.query;

  let companyBenfordObj;
  try {
    companyBenfordObj = await analyzeCompany(token, ticker, tickerType, fsString);
  } catch (err) {
    throw err;
  }

  const HTMLMarkup = new BenfordVisualizer().createBaseHTML(companyBenfordObj);

  res.status(200).json({
    status: 'success',
    data: {
      HTMLMarkup
    }
  });
});

const analyzeSector = async (token, sector, fsString) => {
  if (!token) 
    throw new AppError('API token not provided', 400);

  if (!sector)
    throw new AppError('Sector not provided.', 400);

  if (!fsString)
    throw new AppError('Financial statement string not provided.', 400);

  const fsStringArray = fsString.split(',');

  let sectorBenfordObj;
  try {
    sectorBenfordObj = await new SectorBenfordAnalysis(token, sector).performFastSectorAnalysis(fsStringArray);
  } catch (err) {
    throw err;
  }
  
  return sectorBenfordObj;
}

exports.getSectorAnalysis = catchAsync(async (req, res, next) => {
  const { token, sector, fsString } = req.query;

  let sectorBenfordObj;
  try {
    sectorBenfordObj = await analyzeSector(token, sector, fsString);
  } catch (err) {
    throw err;
  }

  const sectorHTMLMarkup = new BenfordVisualizer().createBaseHTML(sectorBenfordObj);

  const sectorCompanyBenfordArray = sectorBenfordObj.getCompanyBenfordArray();

  const HTMLMarkupArray = sectorCompanyBenfordArray.map( companyBenford => 
    new BenfordVisualizer().createBaseHTML(companyBenford)  
  );
  
  HTMLMarkupArray.unshift(sectorHTMLMarkup);

  res.status(200).json({
    status: 'success',
    data: {
      HTMLMarkupArray
    }
  });
});