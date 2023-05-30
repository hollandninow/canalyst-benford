const axios = require('axios');

class QueryMDS {
  APIRootURL = 'https://mds.canalyst.com/api/';

  constructor(token) {
    this.instance = axios.create({
      baseURL: this.APIRootURL,
      timeout: 3000,
      headers: {
        Authorization: 'Bearer ' + token,
      }
    });
  }
}

module.exports = QueryMDS;