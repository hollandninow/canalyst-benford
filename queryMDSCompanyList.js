const axios = require('axios');
const queryMDS = require('./queryMDS')

class queryMDSCompanyList extends queryMDS {
  constructor() {
    super();

    this.APIQueryURL = `${this.APIRootURL}companies/?format=csv`

    const instance = axios.create({
      baseURL: this.APIQueryURL,
      timeout: 1000,
      headers: {
        Authorization: 'Bearer ' + token,
      }
    })
  }

  async getCompanyListCSV() {
    try {
      const res = await axios({
        method: 'GET',
        url: this.APIQueryURL,
        data
      })
    } catch (err) {

    }
  }
}