const axios = require('axios');
const queryMDS = require('./queryMDS')

class queryMDSCompanyList extends queryMDS {
  constructor(token) {
    super(token);
    this.APIQueryURL = 'companies/?format=csv'
}

  async getCompanyListCSV() {
    try {
      const res = await this.instance.get(this.APIQueryURL)
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = queryMDSCompanyList;