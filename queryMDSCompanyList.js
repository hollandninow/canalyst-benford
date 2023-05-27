const queryMDS = require('./queryMDS')

class queryMDSCompanyList extends queryMDS {
  constructor(token) {
    super(token);
    this.APIQueryURL = 'companies/?format='
}

  async getCompanyList(fileFormatStr = 'json') {
    try {
      const res = await this.instance.get(this.APIQueryURL + fileFormatStr)
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = queryMDSCompanyList;