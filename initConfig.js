const dotenv = require('dotenv');

class initConfig {
  constructor(path) {
    dotenv.config({ path });
  }
}

module.exports = initConfig;