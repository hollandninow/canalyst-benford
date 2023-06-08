const initConfig = require('../initConfig');

describe('initConfig', () => {

  it('should enable access to .config file', () => {
    new initConfig('./config.env');

    expect(process.env.CANALYST_JWT).toBeDefined();
  });

});