const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');
const compression = require('compression');

const viewsRouter = require('./routers/viewsRouter');
const analysisRouter = require('./routers/analysisRouter');
const listRouter = require('./routers/listRouter');

const app = express();

app.enable('trust proxy');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//GLOBAL MIDDLEWARES
app.use(cors());
app.options('*', cors());

// app.use(
//   helmet({
//     contentSecurityPolicy: {
//       directives: {
//         defaultSrc: ["'self'", 'data:', 'blob:', 'https:', 'ws:'],
//         baseUri: ["'self'"],
//         fontSrc: ["'self'", 'https:', 'data:'],
//         scriptSrc: ["'self'", 'https:', 'http:', 'blob:', 'https://cdn.plot.ly/plotly-2.20.0.min.js'],
//         frameSrc: ["'self'", 'https:', "'unsafe-inline'"],
//         workerSrc: ["'self'", 'data:', 'blob:'],
//       },
//       childSrc: ["'self'", 'blob:'],
//       imgSrc: ["'self'", 'data:', 'blob:'],
//       formAction: ["'self'"],
//       connectSrc: ["'self'", "'unsafe-inline'", 'data:', 'blob:'],
//       upgradeInsecureRequests: [],
//     },
//   })
// );

app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP. Please try again in an hour.',
});
app.use('/api', limiter);

// Body parser and cookie parser
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Data sanitization against XSS
app.use(xss());

app.use(compression());

// Timestamps on requests
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/', viewsRouter);
app.use('/api/v1/analysis', analysisRouter);
app.use('/api/v1/list', listRouter);

module.exports = app;