const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const QueryMDSCompanyList = require('../queryMDS/queryMDSCompanyList');
const CompanyList = require('../dataCSV/companyList');

exports.getTickerList = catchAsync(async (req, res, next) => {
  const { token } = req.query;

  const queryMDS = new QueryMDSCompanyList(token);
  let companyList;
  try {
    companyList = await queryMDS.getCompanyList({
      format: 'csv',
    });
  } catch (err) {
    throw err;
  }

  const companyListCSV = new CompanyList(companyList);
  const tickerList = companyListCSV.getAllTickers();

  res.status(200).json({
    status: 'success',
    data: {
      tickers: tickerList
    }
  })
});

exports.getSectorList = catchAsync(async (req, res, next) => {
  // TODO:
});