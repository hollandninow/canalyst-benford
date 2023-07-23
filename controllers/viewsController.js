const catchAsync = require('../utils/catchAsync');

exports.getAppView = catchAsync(async (req, res, next) => {
  res.status(200).render('app', {
    title: 'App',
  });
});