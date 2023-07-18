const initConfig = require('./initConfig');
const app = require('./app');

new initConfig('./config.env');

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', err => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  server.close(() => {
    process.exit(1);
  });
});

// Heroku
// process.on(
//   ('SIGTERM',
//   () => {
//     console.log('👋 SIGTERM RECEIVED. Shutting down gracefully.');
//     server.close(() => {
//       console.log('💥 Process Terminated!');
//     });
//   })
// );